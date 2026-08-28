import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/lib/auth";
import { ApiError } from "@/lib/api";
import { useI18n } from "@/lib/i18n";
import { getCurrentTutorName } from "@/lib/tutors";
import { levelOptions, nativeLanguageOptions } from "@shared/onboarding";
import type { LearnerLevel, NativeLanguageId } from "@shared/types";

export function OnboardingPage() {
  const { user, updateProfile } = useAuth();
  const { t, terr } = useI18n();
  const [, navigate] = useLocation();
  const [nativeLanguage, setNativeLanguage] = useState<NativeLanguageId | null>(null);
  const [level, setLevel] = useState<LearnerLevel | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Already onboarded (e.g. manual visit to this URL) — nothing to do here.
  useEffect(() => {
    if (user?.nativeLanguage && user?.level) {
      navigate("/");
    }
  }, [user, navigate]);

  async function onSubmit() {
    if (!nativeLanguage || !level) return;
    setSubmitting(true);
    setError(null);
    try {
      await updateProfile(nativeLanguage, level);
      navigate("/");
    } catch (err) {
      setError(err instanceof ApiError ? terr(err.code) : terr());
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="app-shell">
      <div className="onboarding">
        <div className="onboarding-head">
          <h1>{t("onboarding.title")}</h1>
          <p>{t("onboarding.subtitle", { tutor: getCurrentTutorName() })}</p>
        </div>
        <div className="onboarding-body">
          <div className="lbl">{t("onboarding.languageQuestion")}</div>
          <div className="lang-grid">
            {nativeLanguageOptions.map((id) => (
              <span
                key={id}
                className={`chip ${nativeLanguage === id ? "on" : ""}`}
                onClick={() => setNativeLanguage(id)}
              >
                {t(`nativeLang.${id}`)}
              </span>
            ))}
          </div>

          <div className="lbl" style={{ marginTop: 26 }}>
            {t("onboarding.levelQuestion")}
          </div>
          <div className="level-grid">
            {levelOptions.map((id) => (
              <div
                key={id}
                className={`level-card ${level === id ? "on" : ""}`}
                onClick={() => setLevel(id)}
              >
                <b>{t(`level.${id}.label`)}</b>
                <p>{t(`level.${id}.description`)}</p>
                <span className="ex">{t(`level.${id}.example`)}</span>
              </div>
            ))}
          </div>

          {error && (
            <div className="authcard err" style={{ marginTop: 16 }}>
              {error}
            </div>
          )}

          <button
            className="btn btn-primary btn-block"
            style={{ marginTop: 26 }}
            disabled={!nativeLanguage || !level || submitting}
            onClick={onSubmit}
          >
            {submitting ? t("auth.submitting") : t("onboarding.submit")}
          </button>
        </div>
      </div>
    </div>
  );
}
