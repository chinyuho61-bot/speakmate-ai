import { useEffect, useRef } from "react";
import { getStoredTutorId, tutors } from "@/lib/tutors";

// Riley's looping teaching-gesture clips — the fallback for any tutor that
// doesn't have its own video assets yet (e.g. still "coming soon").
const FALLBACK_VIDEOS = ["/riley-teaching.mp4", "/riley-teaching-2.mp4"];
const FALLBACK_POSTER = "/riley-stage-wide.jpg";

export function RileyVideo({
  className,
  variantSeed = 0,
}: {
  className?: string;
  // Picks which clip plays, cycling through the tutor's videos — e.g. pass
  // the chapter number so the gesture changes as the learner moves through
  // lessons, instead of the same clip looping forever.
  variantSeed?: number;
}) {
  const tutor = tutors.find((t) => t.id === getStoredTutorId());
  const videos = tutor?.videos ?? FALLBACK_VIDEOS;
  const poster = tutor?.poster ?? FALLBACK_POSTER;
  const src = videos[((variantSeed % videos.length) + videos.length) % videos.length];
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) ref.current?.pause();
  }, [src]);

  return (
    <video
      // Remount on src change so the browser actually swaps and autoplays
      // the new clip, rather than sitting on a <video> that only updated
      // its src attribute.
      key={src}
      ref={ref}
      className={className}
      src={src}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      aria-label={tutor?.name ?? "Riley"}
    />
  );
}
