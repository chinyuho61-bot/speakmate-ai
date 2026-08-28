import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { ArrowLeft } from "lucide-react";
import { api } from "@/lib/api";
import type { ProgressSummary } from "@shared/types";
import { getScenario } from "@shared/scenarios";
import { BottomDock } from "@/components/BottomDock";
import { useI18n, locales } from "@/lib/i18n";

export function ProgressPage() {
  const [, navigate] = useLocation();
  const [progress, setProgress] = useState<ProgressSummary | null>(null);
  const { t, locale, setLocale } = useI18n();

  useEffect(() => {
    api.getProgress().then(setProgress);
  }, []);

  if (!progress) {
    return (
      <div className="app-shell">
        <div className="loading-screen">{t("common.loading")}</div>
      </div>
    );
  }

  return (
    <div className="app-shell progress-page">
      <div className="ltop" style={{ padding: "16px 22px 4px" }}>
        <span className="bk" onClick={() => navigate("/")}>
          <ArrowLeft size={17} />
        </span>
        <div className="t">
          <b>{t("progress.title")}</b>
        </div>
      </div>

      <div className="body">
        <div className="stats">
          <div>
            <div className="v">{progress.completedChapters}</div>
            <div className="k">{t("home.statsCompleted")}</div>
          </div>
          <div>
            <div className="v">
              {progress.streakDays} {t("home.dayUnit")}
            </div>
            <div className="k">{t("home.statsStreakDays")}</div>
          </div>
          <div>
            <div className="v">{progress.savedSentenceCount}</div>
            <div className="k">{t("home.statsSaved")}</div>
          </div>
        </div>

        <div className="lbl" style={{ marginTop: 22 }}>
          {t("progress.myRoute")}
        </div>
        <div className="roadlist">
          {progress.scenarios.map((s) => {
            const scenario = getScenario(s.scenarioId)!;
            const cls = s.state === "locked" ? "lock" : s.state === "complete" ? "ok" : s.state === "current" ? "cur" : "";
            return (
              <div key={s.scenarioId} className={`rn ${cls}`}>
                <div>
                  <b>{scenario.titleZh}</b>
                  <span className="st">
                    {t("progress.chapterCount", { done: s.completedChapters, total: s.totalChapters })}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="lbl" style={{ marginTop: 22 }}>
          {t("progress.savedSentencesHeading", { count: progress.savedSentences.length })}
        </div>
        {progress.savedSentences.length === 0 ? (
          <div className="empty" style={{ marginTop: 10 }}>
            <b>{t("progress.savedEmptyTitle")}</b>
            <p>{t("progress.savedEmptyBody")}</p>
          </div>
        ) : (
          progress.savedSentences.map((s) => (
            <div className="sentence-card" key={s.id}>
              <div className="en">{s.en}</div>
              <div className="zh">{s.zh}</div>
            </div>
          ))
        )}

        <div className="lbl" style={{ marginTop: 22 }}>
          {t("progress.languageSetting")}
        </div>
        <div className="lang-switch inline">
          {locales.map((l) => (
            <button
              key={l.id}
              className={locale === l.id ? "on" : ""}
              onClick={() => setLocale(l.id)}
              type="button"
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>
      <BottomDock />
    </div>
  );
}
