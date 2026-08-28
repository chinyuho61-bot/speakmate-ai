import { useEffect, useRef, useState } from "react";
import { useLocation } from "wouter";
import { ArrowLeft, Mic, Send, Coffee, Heart, Plane, Briefcase } from "lucide-react";
import { freeTalkTopics } from "@shared/freeTalk";
import type { FreeTalkIcon, FreeTalkMessage, FreeTalkTopicId } from "@shared/types";
import { api } from "@/lib/api";
import { isSpeechRecognitionSupported, startListening } from "@/lib/speech";
import { useI18n } from "@/lib/i18n";
import { getCurrentTutorName } from "@/lib/tutors";

const iconMap: Record<FreeTalkIcon, typeof Coffee> = { coffee: Coffee, heart: Heart, plane: Plane, briefcase: Briefcase };

export function FreeTalkPage() {
  const [, navigate] = useLocation();
  const { t } = useI18n();
  const tutorName = getCurrentTutorName();
  const [topicId, setTopicId] = useState<FreeTalkTopicId | null>(null);
  const [messages, setMessages] = useState<FreeTalkMessage[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [listening, setListening] = useState(false);
  const stopListeningRef = useRef<(() => void) | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    return () => stopListeningRef.current?.();
  }, []);

  function pickTopic(id: FreeTalkTopicId) {
    const topic = freeTalkTopics.find((t) => t.id === id)!;
    setTopicId(id);
    setMessages([{ role: "assistant", content: topic.openingEn }]);
  }

  function toggleMic() {
    if (listening) {
      stopListeningRef.current?.();
      setListening(false);
      return;
    }
    const stop = startListening(
      (text) => setInput(text),
      () => {
        setListening(false);
        stopListeningRef.current = null;
      },
      "en-US"
    );
    if (stop) {
      stopListeningRef.current = stop;
      setListening(true);
    }
  }

  async function send() {
    if (!input.trim() || !topicId || sending) return;
    stopListeningRef.current?.();
    setListening(false);
    const nextHistory: FreeTalkMessage[] = [...messages, { role: "user", content: input.trim() }];
    setMessages(nextHistory);
    setInput("");
    setSending(true);
    try {
      const res = await api.freeTalkReply({ topicId, history: nextHistory });
      setMessages((prev) => [...prev, { role: "assistant", content: res.reply }]);
    } finally {
      setSending(false);
    }
  }

  if (!topicId) {
    return (
      <div className="app-shell">
        <div className="ltop">
          <span className="bk" onClick={() => navigate("/")}>
            <ArrowLeft size={17} />
          </span>
          <div className="t">
            <b>{t("freeTalk.title")}</b>
            <em>{t("freeTalk.pickTopic")}</em>
          </div>
        </div>
        <div className="ft-topics">
          <div className="empty">
            <b>{t("freeTalk.demoTitle")}</b>
            <p>{t("freeTalk.demoBody", { tutor: tutorName })}</p>
          </div>
          <div className="topic-grid">
            {freeTalkTopics.map((topic) => {
              const Icon = iconMap[topic.icon];
              return (
                <div key={topic.id} className="topic-card" onClick={() => pickTopic(topic.id)}>
                  <span className="ic">
                    <Icon size={22} />
                  </span>
                  <b>{t(`topic.${topic.id}.title`)}</b>
                  <p>{t(`topic.${topic.id}.description`)}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  const topic = freeTalkTopics.find((tp) => tp.id === topicId)!;

  return (
    <div className="app-shell">
      <div className="lesson">
        <div className="ltop">
          <span className="bk" onClick={() => setTopicId(null)}>
            <ArrowLeft size={17} />
          </span>
          <div className="t">
            <b>{t(`topic.${topic.id}.title`)}</b>
            <em>{t("freeTalk.demoSubtitle")}</em>
          </div>
        </div>
        <div className="talk" ref={scrollRef}>
          {messages.map((m, i) =>
            m.role === "assistant" ? (
              <div className="msg" key={i}>
                <div className="who">
                  <b>{tutorName}</b>
                </div>
                <div className="sub" style={{ fontSize: 16, marginTop: 0 }}>
                  {m.content}
                </div>
              </div>
            ) : (
              <div className="me" key={i}>
                {m.content}
              </div>
            )
          )}
          {sending && (
            <div className="msg">
              <div className="who">
                <b>{tutorName}</b>
              </div>
              <div className="sub" style={{ marginTop: 0 }}>
                {t("freeTalk.thinking")}
              </div>
            </div>
          )}
        </div>
        <div className="ctrl">
          <div className="answer">
            <textarea
              className="field"
              style={{ minHeight: 52 }}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t("freeTalk.inputPlaceholder")}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send();
                }
              }}
            />
            <div className="row">
              {isSpeechRecognitionSupported() && (
                <>
                  <span
                    className={`mic ${listening ? "listening" : ""}`}
                    onClick={toggleMic}
                    title={listening ? t("lesson.micStopTitle") : t("lesson.micIdle")}
                  >
                    <Mic size={26} />
                  </span>
                  <span style={{ fontSize: 12.5, color: "var(--sm-mute)", fontWeight: 600 }}>
                    {listening ? t("lesson.micListening") : t("lesson.micIdle")}
                  </span>
                </>
              )}
              <button className="btn btn-primary" onClick={send} disabled={sending || !input.trim()}>
                <Send size={18} />
                {t("freeTalk.send")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
