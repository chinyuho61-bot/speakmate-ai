import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Lock, Flame, Video, LifeBuoy, Users } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { useI18n, locales } from "@/lib/i18n";
import { api } from "@/lib/api";
import { scenarios, getScenario } from "@shared/scenarios";
import type { ProgressSummary, Scenario } from "@shared/types";
import { scenarioIconMap } from "@/lib/icons";
import { BottomDock } from "@/components/BottomDock";
import { RileyVideo } from "@/components/RileyVideo";
import { TutorSheet } from "@/components/TutorSheet";
import { getStoredTutorId, setStoredTutorId, tutors, type TutorId } from "@/lib/tutors";

// Circle-bubble roadmap layout — a 2-column zigzag grid connected by a
// flowing line, matching the reference product's home screen. Coordinates
// use a 0–100 (percent) x-axis and literal-pixel y-axis; the SVG maps 1:1
// onto the container via preserveAspectRatio="none" so it lines up with the
// absolutely-positioned circle nodes regardless of the container's actual
// rendered width.
const GRID_COLS = 2;
const COL_X_PCT = [27, 73];
const ROW_HEIGHT = 168;
const TOP_PAD = 50;
const CIRCLE_R = 38;
const NODE_BLOCK_HEIGHT = 118;

function gridNodeTop(index: number): number {
  const row = Math.floor(index / GRID_COLS);
  return TOP_PAD + row * ROW_HEIGHT;
}

function gridNodeCenter(index: number): { x: number; y: number } {
  const col = index % GRID_COLS;
  return { x: COL_X_PCT[col], y: gridNodeTop(index) + CIRCLE_R };
}

function gridHeight(count: number): number {
  const rows = Math.ceil(count / GRID_COLS);
  return TOP_PAD + Math.max(0, rows - 1) * ROW_HEIGHT + NODE_BLOCK_HEIGHT + 16;
}

// Flag emoji render as literal "GB" text on stock Windows fonts (no color
// flag glyphs), so we draw a tiny inline SVG instead — looks the same
// everywhere.
function UkFlagIcon() {
  return (
    <svg width="18" height="12" viewBox="0 0 30 20" style={{ flex: "none", borderRadius: 2 }}>
      <clipPath id="uk-flag-clip">
        <rect width="30" height="20" rx="2" />
      </clipPath>
      <g clipPath="url(#uk-flag-clip)">
        <rect width="30" height="20" fill="#00247d" />
        <path d="M0 0 L30 20 M30 0 L0 20" stroke="#fff" strokeWidth="4" />
        <path d="M0 0 L30 20 M30 0 L0 20" stroke="#cf142b" strokeWidth="2" />
        <path d="M15 0 V20 M0 10 H30" stroke="#fff" strokeWidth="6" />
        <path d="M15 0 V20 M0 10 H30" stroke="#cf142b" strokeWidth="3.2" />
      </g>
    </svg>
  );
}

// Groups scenarios into consecutive same-level runs, preserving order, so
// the roadmap can render a divider ("初級" / "中級") between bands — each
// band gets its own independent grid (own local 0-based index), matching
// the reference app's "complete a level, unlock the next" layout.
function groupByLevel(list: Scenario[]): { level: Scenario["level"]; items: Scenario[] }[] {
  const bands: { level: Scenario["level"]; items: Scenario[] }[] = [];
  for (const s of list) {
    const last = bands[bands.length - 1];
    if (last && last.level === s.level) last.items.push(s);
    else bands.push({ level: s.level, items: [s] });
  }
  return bands;
}

const LEVEL_LABEL_KEY: Record<Scenario["level"], "home.levelBeginner" | "home.levelIntermediate" | "home.levelAdvanced" | "home.levelProficient"> = {
  beginner: "home.levelBeginner",
  intermediate: "home.levelIntermediate",
  advanced: "home.levelAdvanced",
  proficient: "home.levelProficient",
};

function buildRoadPath(count: number): string {
  if (count === 0) return "";
  const points = Array.from({ length: count }, (_, i) => gridNodeCenter(i));
  return points.slice(1).reduce((d, p, i) => {
    const prev = points[i];
    const dy = (p.y - prev.y) / 2;
    return `${d} C${prev.x} ${prev.y + dy} ${p.x} ${p.y - dy} ${p.x} ${p.y}`;
  }, `M${points[0].x} ${points[0].y}`);
}

export function HomePage() {
  const { user, logout } = useAuth();
  const { t, locale, setLocale } = useI18n();
  const [, navigate] = useLocation();
  const [progress, setProgress] = useState<ProgressSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [tutorSheetOpen, setTutorSheetOpen] = useState(false);
  const [tutorId, setTutorId] = useState<TutorId>(() => getStoredTutorId());
  // Locked scenarios are still clickable — instead of a dead end, this
  // offers a choice: follow the recommended path, or jump straight to the
  // locked lesson anyway (e.g. a beginner-level learner curious about 精通
  // content). Neither the lesson page nor the completion API checks lock
  // state, so overriding here is safe — the roadmap lock is a suggestion,
  // not an enforced gate.
  const [overridePrompt, setOverridePrompt] = useState<{ scenarioId: string; chapterId: string } | null>(
    null
  );

  useEffect(() => {
    let cancelled = false;
    api
      .getProgress()
      .then((p) => !cancelled && setProgress(p))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading || !progress) {
    return (
      <div className="app-shell">
        <div className="loading-screen">{t("common.loading")}</div>
      </div>
    );
  }

  const currentSummary = progress.scenarios.find((s) => s.state === "current");
  const currentScenario = currentSummary ? getScenario(currentSummary.scenarioId) : undefined;
  const currentChapter = currentScenario?.chapters.find(
    (c) => c.id === currentSummary?.currentChapterId
  );
  const isBrandNew = progress.completedChapters === 0;
  const tutorName = tutors.find((t) => t.id === tutorId)?.name ?? "Riley";

  const greeting = isBrandNew
    ? t("home.greetingNewUser", { tutor: tutorName })
    : progress.streakDays > 0
      ? t("home.greetingStreak", { days: progress.streakDays })
      : t("home.greetingSaved", { count: progress.savedSentenceCount });

  return (
    <div className="app-shell">
      <div className="home">
        <div className="hero-photo">
          <RileyVideo variantSeed={progress.completedChapters} />
          {/* Always "EN" — this shows the language being taught (English),
              not the interface display language, so it doesn't translate. */}
          <span className="hero-pill lang">
            <UkFlagIcon /> EN
          </span>
          <span className="hero-pill streak">
            <Flame size={15} />
            {progress.streakDays}
          </span>
          <button
            className="hero-tutor-trigger"
            onClick={() => setTutorSheetOpen(true)}
            aria-label={t("tutor.title")}
          >
            <Users size={18} />
          </button>
          <button className="hero-cta" onClick={() => navigate("/free-talk")}>
            <Video size={18} />
            {t("home.freeTalk")}
          </button>
        </div>

        <div className="hero">
          <h1>{t("home.morning", { name: user?.name ?? "" })}</h1>
          <p>
            <span className="dot" />
            {greeting}
          </p>
        </div>

        <div className="body">
          {currentScenario && currentChapter && currentSummary ? (
            <div className="next">
              <div className="k">
                {currentSummary.completedChapters === 0 ? t("home.firstWin") : t("home.continueRoute")}
              </div>
              <h2>
                {currentScenario.titleZh}：{currentChapter.title}
              </h2>
              <p>
                {t("home.chapterProgress", {
                  current: currentSummary.completedChapters + 1,
                  total: currentSummary.totalChapters,
                  tutor: tutorName,
                })}
              </p>
              <div className="bar">
                <span
                  style={{
                    width: `${Math.round(
                      (currentSummary.completedChapters / currentSummary.totalChapters) * 100
                    )}%`,
                  }}
                />
              </div>
              <button
                className="btn btn-block"
                onClick={() => navigate(`/lesson/${currentScenario.id}/${currentChapter.id}`)}
              >
                {currentSummary.completedChapters === 0
                  ? t("home.startFirstChapter")
                  : t("home.continueChapter", { title: currentChapter.title })}
              </button>
            </div>
          ) : (
            <div className="next">
              <div className="k">{t("home.allDoneKicker")}</div>
              <h2>{t("home.allDoneHeading")}</h2>
              <p>{t("home.allDoneBody")}</p>
            </div>
          )}

          {!isBrandNew && (
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
          )}

          {isBrandNew && (
            <div className="empty">
              <b>{t("home.emptyTitle")}</b>
              <p>{t("home.emptyBody")}</p>
            </div>
          )}

          {groupByLevel(scenarios).map((band) => (
            <div key={band.level} className="level-band">
              <div className="level-divider">
                <span>{t(LEVEL_LABEL_KEY[band.level])}</span>
              </div>
              <div className="roadgrid" style={{ height: gridHeight(band.items.length) }}>
                <svg
                  viewBox={`0 0 100 ${gridHeight(band.items.length)}`}
                  preserveAspectRatio="none"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d={buildRoadPath(band.items.length)}
                    stroke="#D8E7F5"
                    strokeWidth={4}
                    strokeLinecap="round"
                  />
                </svg>
                {band.items.map((scenario, i) => {
                  const s = progress.scenarios.find((x) => x.scenarioId === scenario.id)!;
                  const Icon = scenarioIconMap[scenario.icon];
                  const statusText =
                    s.state === "locked"
                      ? t("home.locked")
                      : s.state === "complete"
                        ? `${s.completedChapters} / ${s.totalChapters}`
                        : s.completedChapters === 0
                          ? t("home.available", { count: s.totalChapters })
                          : t("home.inProgress", { done: s.completedChapters, total: s.totalChapters });
                  const cls = s.state === "locked" ? "lock" : s.state === "complete" ? "ok" : s.state === "current" ? "cur" : "";
                  const targetChapterId =
                    s.currentChapterId ?? scenario.chapters[scenario.chapters.length - 1].id;
                  const center = gridNodeCenter(i);

                  return (
                    <div
                      key={scenario.id}
                      className={`node ${cls}`}
                      role="button"
                      style={{
                        top: gridNodeTop(i),
                        left: `${center.x}%`,
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        s.state === "locked"
                          ? setOverridePrompt({ scenarioId: scenario.id, chapterId: scenario.chapters[0].id })
                          : navigate(`/lesson/${scenario.id}/${targetChapterId}`)
                      }
                    >
                      <span className="bubble">
                        <Icon size={26} />
                        {s.state === "locked" && (
                          <span className="lockbadge">
                            <Lock size={13} />
                          </span>
                        )}
                      </span>
                      <div>
                        <b>{scenario.titleZh}</b>
                        <span className="st">{statusText}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          <div className="quick">
            <button disabled title={t("home.comingSoon")}>
              <LifeBuoy size={20} />
              {t("home.sos")}
            </button>
            <button onClick={logout}>{t("home.logout")}</button>
          </div>

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
      </div>
      <BottomDock />
      <TutorSheet
        open={tutorSheetOpen}
        onClose={() => setTutorSheetOpen(false)}
        selectedId={tutorId}
        onSelect={(id) => {
          setTutorId(id);
          setStoredTutorId(id);
          setTutorSheetOpen(false);
        }}
      />
      {overridePrompt && (
        <div className="modal-overlay" onClick={() => setOverridePrompt(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-emoji">🚀</div>
            <h2>{t("home.overrideTitle")}</h2>
            <p>{t("home.overrideBody")}</p>
            <button
              className="btn btn-primary btn-block"
              onClick={() => {
                setOverridePrompt(null);
                if (currentScenario && currentChapter) {
                  navigate(`/lesson/${currentScenario.id}/${currentChapter.id}`);
                }
              }}
            >
              {t("home.overrideFollowPath")}
            </button>
            <button
              className="modal-link"
              onClick={() => {
                const target = overridePrompt;
                setOverridePrompt(null);
                navigate(`/lesson/${target.scenarioId}/${target.chapterId}`);
              }}
            >
              {t("home.overrideJumpAnyway")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
