import { useState, type FormEvent } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/lib/auth";
import { ApiError } from "@/lib/api";
import { useI18n, locales } from "@/lib/i18n";
import { getCurrentTutorName } from "@/lib/tutors";

export function AuthPage() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const { login, register } = useAuth();
  const { t, terr, locale, setLocale } = useI18n();
  const [, navigate] = useLocation();

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      if (mode === "login") {
        await login(email, password);
      } else {
        await register(email, password, name);
      }
      navigate("/");
    } catch (err) {
      setError(err instanceof ApiError ? terr(err.code) : terr());
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="app-shell">
      <div className="lang-switch">
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
      <div className="auth-wrap">
        <div className="brand">
          <div className="mark">SM</div>
          <h1>{t("brand.name")}</h1>
          <p>{t("brand.tagline", { tutor: getCurrentTutorName() })}</p>
        </div>
        <form className="authcard" onSubmit={onSubmit}>
          {error && <div className="err">{error}</div>}
          {mode === "register" && (
            <label>
              {t("auth.nameLabel")}
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t("auth.namePlaceholder")}
                required
              />
            </label>
          )}
          <label>
            {t("auth.emailLabel")}
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("auth.emailPlaceholder")}
              required
            />
          </label>
          <label>
            {t("auth.passwordLabel")}
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t("auth.passwordPlaceholder")}
              minLength={8}
              required
            />
          </label>
          <button className="btn btn-primary btn-block" type="submit" disabled={submitting}>
            {submitting ? t("auth.submitting") : mode === "login" ? t("auth.submitLogin") : t("auth.submitRegister")}
          </button>
          <div className="switch">
            {mode === "login" ? (
              <>
                {t("auth.noAccount")}{" "}
                <button type="button" onClick={() => setMode("register")}>
                  {t("auth.registerNow")}
                </button>
              </>
            ) : (
              <>
                {t("auth.hasAccount")}{" "}
                <button type="button" onClick={() => setMode("login")}>
                  {t("auth.backToLogin")}
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
