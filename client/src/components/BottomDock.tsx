import { Home, TrendingUp } from "lucide-react";
import { useLocation } from "wouter";
import { useI18n } from "@/lib/i18n";

export function BottomDock() {
  const [location, navigate] = useLocation();
  const { t } = useI18n();

  return (
    <nav className="dock">
      <button className={location === "/" ? "active" : ""} onClick={() => navigate("/")}>
        <Home size={22} strokeWidth={location === "/" ? 2.5 : 2} />
        {t("nav.home")}
      </button>
      <button
        className={location === "/progress" ? "active" : ""}
        onClick={() => navigate("/progress")}
      >
        <TrendingUp size={22} strokeWidth={location === "/progress" ? 2.5 : 2} />
        {t("nav.progress")}
      </button>
    </nav>
  );
}
