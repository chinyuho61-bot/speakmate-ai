import { X, Check, Lock } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { tutors, type TutorId } from "@/lib/tutors";

export function TutorSheet({
  open,
  onClose,
  selectedId,
  onSelect,
}: {
  open: boolean;
  onClose: () => void;
  selectedId: TutorId;
  onSelect: (id: TutorId) => void;
}) {
  const { t } = useI18n();
  if (!open) return null;

  // Available tutors first, so what's actually usable today isn't buried
  // below a wall of "coming soon" cards.
  const sortedTutors = [...tutors].sort((a, b) => Number(b.available) - Number(a.available));

  return (
    <div className="sheet-overlay" onClick={onClose}>
      <div className="tutor-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="handle" />
        <div className="tutor-sheet-head">
          <div>
            <h2>{t("tutor.title")}</h2>
            <p>{t("tutor.subtitle")}</p>
          </div>
          <span className="sheet-close" onClick={onClose}>
            <X size={18} />
          </span>
        </div>
        <div className="tutor-list">
          {sortedTutors.map((tutor) => {
            const isSelected = tutor.id === selectedId;
            return (
              <div
                key={tutor.id}
                className={`tutor-card ${isSelected ? "selected" : ""} ${!tutor.available ? "locked" : ""}`}
                role={tutor.available ? "button" : undefined}
                onClick={() => tutor.available && onSelect(tutor.id)}
              >
                <span className={`tutor-avatar ${tutor.avatar ? "" : "placeholder"}`}>
                  {tutor.avatar ? <img src={tutor.avatar} alt={tutor.name} /> : tutor.name[0]}
                  {!tutor.available && (
                    <span className="tutor-lock">
                      <Lock size={12} />
                    </span>
                  )}
                </span>
                <div className="tutor-info">
                  <div className="tutor-name-row">
                    <b>{tutor.name}</b>
                    <span className="tutor-accent">{t(tutor.accentKey)}</span>
                  </div>
                  <p className="tutor-tagline">{t(tutor.taglineKey)}</p>
                  <div className="tutor-traits">
                    {tutor.traitKeys.map((k) => (
                      <span key={k} className="trait-chip">
                        {t(k)}
                      </span>
                    ))}
                  </div>
                </div>
                {isSelected ? (
                  <span className="tutor-status selected">
                    <Check size={14} />
                    {t("tutor.selected")}
                  </span>
                ) : !tutor.available ? (
                  <span className="tutor-status soon">{t("tutor.comingSoon")}</span>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
