import { useEffect, useState } from "react";

const INTRO_STORAGE_KEY = "abdul-momin-portfolio-intro-v2-seen";

function shouldShowIntro() {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;

  try {
    return window.sessionStorage.getItem(INTRO_STORAGE_KEY) !== "true";
  } catch {
    return true;
  }
}

export function SiteIntro() {
  const [isVisible, setIsVisible] = useState(shouldShowIntro);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    if (!isVisible) return;

    const portfolio = document.querySelector<HTMLElement>(".app");
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    portfolio?.setAttribute("aria-hidden", "true");
    portfolio?.setAttribute("inert", "");

    const leaveTimer = window.setTimeout(() => setIsLeaving(true), 1500);
    const finishTimer = window.setTimeout(() => {
      try {
        window.sessionStorage.setItem(INTRO_STORAGE_KEY, "true");
      } catch {
        // The intro can still complete when browser storage is unavailable.
      }

      setIsVisible(false);
    }, 2600);

    return () => {
      window.clearTimeout(leaveTimer);
      window.clearTimeout(finishTimer);
      document.body.style.overflow = previousOverflow;
      portfolio?.removeAttribute("aria-hidden");
      portfolio?.removeAttribute("inert");
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      className={`site-intro ${isLeaving ? "site-intro--leaving" : ""}`}
      role="status"
      aria-label="Opening Abdul Momin’s portfolio"
    >
      <div className="site-intro__curtain" aria-hidden="true" />
      <div className="site-intro__monogram" aria-hidden="true">
        <span className="site-intro__monogram-outline">AM</span>
        <span className="site-intro__monogram-fill">AM</span>
      </div>
    </div>
  );
}
