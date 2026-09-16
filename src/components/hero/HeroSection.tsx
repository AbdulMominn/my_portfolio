import { useEffect, useState } from "react";
import { CONTACT } from "../../data/portfolio";
import type { Profile, ProfileId } from "../../types/portfolio";
import { ProfileSwitcher } from "../profile-switcher/ProfileSwitcher";

interface HeroSectionProps {
  profile: Profile;
  onProfileChange: (profile: ProfileId) => void;
}

export function HeroSection({ profile, onProfileChange }: HeroSectionProps) {
  const [pointerOffset, setPointerOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce), (pointer: coarse)");
    if (mediaQuery.matches) return;

    const handlePointerMove = (event: PointerEvent) => {
      setPointerOffset({
        x: (event.clientX / window.innerWidth - 0.5) * 14,
        y: (event.clientY / window.innerHeight - 0.5) * 14,
      });
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  return (
    <header className="hero" id="top">
      <div
        className="hero__background"
        aria-hidden="true"
        style={{ transform: `scale(1.025) translate3d(${pointerOffset.x}px, ${pointerOffset.y}px, 0)` }}
      />
      <div className="hero__shade" aria-hidden="true" />

      <div className="hero__inner shell">
        <div className="hero__identity">
          <p className="hero__identity-kicker">Applied Computer Science · KdG Antwerp</p>
          <h1 className="hero__name">Abdul Momin</h1>

          <div className="hero__socials" aria-label="Professional links">
            <a className="hero__resume" href={CONTACT.resume} target="_blank" rel="noreferrer">
              Resume
              <span className="hero__resume-icon" aria-hidden="true">
                <svg viewBox="0 0 12 12" focusable="false">
                  <path d="M3 9 9 3M4 3h5v5" />
                </svg>
              </span>
            </a>
            <a href={CONTACT.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a href={CONTACT.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a href={CONTACT.email}>Email</a>
          </div>
        </div>

        <div className="hero__content">
          <div className="hero__intro">
            <p className="hero__eyebrow">{profile.eyebrow}</p>
            <h2>{profile.headline}</h2>
            <p className="hero__summary">{profile.summary}</p>
          </div>

          <div className="hero__profile-panel">
            <p className="hero__availability">Recent Applied Computer Science graduate</p>
            <ProfileSwitcher activeProfile={profile.id} onChange={onProfileChange} />
            <p className="hero__profile-note" aria-live="polite">
              Selected: <strong>{profile.label}</strong>. Experience, projects, and skills are prioritized for this role.
            </p>
          </div>
        </div>
      </div>

      <a className="hero__scroll" href="#experience" aria-label="Explore the portfolio">
        <span>Explore</span>
        <span className="hero__scroll-line" aria-hidden="true" />
      </a>
    </header>
  );
}
