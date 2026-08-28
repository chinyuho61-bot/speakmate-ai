import { useEffect } from "react";
import { Route, Switch, Redirect } from "wouter";
import { AuthProvider, useAuth } from "@/lib/auth";
import { I18nProvider, useI18n } from "@/lib/i18n";
import { AuthPage } from "@/pages/Auth";
import { OnboardingPage } from "@/pages/Onboarding";
import { HomePage } from "@/pages/Home";
import { LessonPage } from "@/pages/Lesson";
import { ProgressPage } from "@/pages/Progress";
import { FreeTalkPage } from "@/pages/FreeTalk";
import { unlockSpeechOnFirstInteraction } from "@/lib/speech";

function RequireAuth({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const { t } = useI18n();

  if (loading) {
    return (
      <div className="app-shell">
        <div className="loading-screen">{t("common.loading")}</div>
      </div>
    );
  }
  if (!user) return <Redirect to="/login" />;
  return <>{children}</>;
}

// Same as RequireAuth, but also sends a logged-in user who hasn't finished
// onboarding (no native language / level yet) to /onboarding first.
function RequireProfile({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const { t } = useI18n();

  if (loading) {
    return (
      <div className="app-shell">
        <div className="loading-screen">{t("common.loading")}</div>
      </div>
    );
  }
  if (!user) return <Redirect to="/login" />;
  if (!user.nativeLanguage || !user.level) return <Redirect to="/onboarding" />;
  return <>{children}</>;
}

function Routes() {
  const { user, loading } = useAuth();
  const { t } = useI18n();

  return (
    <Switch>
      <Route path="/login">{!loading && user ? <Redirect to="/" /> : <AuthPage />}</Route>
      <Route path="/onboarding">
        <RequireAuth>
          <OnboardingPage />
        </RequireAuth>
      </Route>
      <Route path="/">
        <RequireProfile>
          <HomePage />
        </RequireProfile>
      </Route>
      <Route path="/lesson/:scenarioId/:chapterId">
        <RequireProfile>
          <LessonPage />
        </RequireProfile>
      </Route>
      <Route path="/progress">
        <RequireProfile>
          <ProgressPage />
        </RequireProfile>
      </Route>
      <Route path="/free-talk">
        <RequireProfile>
          <FreeTalkPage />
        </RequireProfile>
      </Route>
      <Route>
        <div className="app-shell">
          <div className="loading-screen">{t("common.notFoundPage")}</div>
        </div>
      </Route>
    </Switch>
  );
}

export default function App() {
  useEffect(() => {
    unlockSpeechOnFirstInteraction();
  }, []);

  return (
    <I18nProvider>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </I18nProvider>
  );
}
