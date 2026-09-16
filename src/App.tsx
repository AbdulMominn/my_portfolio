import { useEffect } from "react";
import { EducationSection } from "./components/education/EducationSection";
import { ExperienceSection } from "./components/experience/ExperienceSection";
import { HeroSection } from "./components/hero/HeroSection";
import { Nav } from "./components/navigation/Nav";
import { ProjectsSection } from "./components/projects/ProjectsSection";
import { SkillsSection } from "./components/skills/SkillsSection";
import { ClosingQuote } from "./components/ui/ClosingQuote";
import { SiteIntro } from "./components/ui/SiteIntro";
import { CONTACT } from "./data/portfolio";
import { PROFILES } from "./data/profiles";
import { useProfile } from "./hooks/useProfile";
import "./styles/components.css";

export default function App() {
  const { profileId, selectProfile } = useProfile();
  const profile = PROFILES[profileId];

  useEffect(() => {
    document.title = `${profile.eyebrow} | Abdul Momin`;
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    description?.setAttribute("content", profile.summary);
  }, [profile]);

  return (
    <>
      <SiteIntro />
      <div className="app" data-profile={profileId}>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <Nav />
      <HeroSection profile={profile} onProfileChange={selectProfile} />

      <main id="main-content" className="main-content shell">
        <ExperienceSection profileId={profileId} />
        <ProjectsSection profileId={profileId} />
        <SkillsSection profileId={profileId} />
        <EducationSection />
        <ClosingQuote />
      </main>

      <footer className="site-footer">
        <div className="site-footer__inner shell">
          <div>
            <p className="site-footer__name">Abdul Momin</p>
            <p>Software Engineer · Full-Stack & Product</p>
          </div>
          <div className="site-footer__links" aria-label="Footer links">
            <a href={CONTACT.email}>Email</a>
            <a href={CONTACT.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a href={CONTACT.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a href={CONTACT.resume} target="_blank" rel="noreferrer">
              Resume
            </a>
          </div>
          <p className="site-footer__meta">Antwerp, Belgium · 2026</p>
        </div>
      </footer>
      </div>
    </>
  );
}
