import { useEffect, useRef, useState } from "react";
import { CONTACT } from "../../data/portfolio";

const NAV_LINKS = [
  ["Experience", "#experience"],
  ["Projects", "#projects"],
  ["Skills", "#skills"],
  ["Education", "#education"],
] as const;

const SECTION_LINKS = [["Overview", "#top"], ...NAV_LINKS] as const;

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 48);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    let frameId = 0;

    const updateActiveSection = () => {
      const readingLine = Math.min(window.innerHeight * 0.32, 240);
      let nextSection = 0;

      SECTION_LINKS.forEach(([, href], index) => {
        const section = document.getElementById(href.slice(1));
        if (section && section.getBoundingClientRect().top <= readingLine) {
          nextSection = index;
        }
      });

      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 8) {
        nextSection = SECTION_LINKS.length - 1;
      }

      setActiveSection(nextSection);
      frameId = 0;
    };

    const handleSectionScroll = () => {
      if (!frameId) frameId = window.requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();
    window.addEventListener("scroll", handleSectionScroll, { passive: true });
    window.addEventListener("resize", handleSectionScroll);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", handleSectionScroll);
      window.removeEventListener("resize", handleSectionScroll);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav className={`site-nav ${scrolled ? "site-nav--scrolled" : ""}`} aria-label="Primary navigation">
        <div className="site-nav__inner shell">
          <a className="site-nav__logo" href="#top" aria-label="Abdul Momin — back to top">
            AM
          </a>

          <div className="site-nav__desktop-links">
            {NAV_LINKS.map(([label, href]) => (
              <a key={href} className="nav-link" href={href}>
                {label}
              </a>
            ))}
          </div>

          <div className="site-nav__actions">
            <a className="nav-contact" href={CONTACT.email}>
              Contact
            </a>
            <button
              className="menu-button"
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </nav>

      <div className="section-index" aria-label={`Current section: ${SECTION_LINKS[activeSection][0]}`}>
        <ol aria-label="Portfolio sections">
          {SECTION_LINKS.map(([label, href], index) => (
            <li key={href}>
              <a
                className={`section-index__link ${index === activeSection ? "is-active" : ""}`}
                href={href}
                aria-label={`Go to ${label}`}
                aria-current={index === activeSection ? "location" : undefined}
              >
                <span className="section-index__line" aria-hidden="true" />
                <span className="section-index__label">{label}</span>
              </a>
            </li>
          ))}
        </ol>
      </div>

      <div
        id="mobile-navigation"
        className={`mobile-menu ${menuOpen ? "is-open" : ""}`}
        aria-hidden={!menuOpen}
      >
        <button
          ref={closeButtonRef}
          className="mobile-menu__close"
          type="button"
          onClick={closeMenu}
          aria-label="Close navigation menu"
          tabIndex={menuOpen ? 0 : -1}
        >
          <span aria-hidden="true">Close</span>
          <span aria-hidden="true">×</span>
        </button>

        <div className="mobile-menu__links">
          {NAV_LINKS.map(([label, href], index) => (
            <a key={href} href={href} onClick={closeMenu} tabIndex={menuOpen ? 0 : -1}>
              <span aria-hidden="true">0{index + 1}</span>
              {label}
            </a>
          ))}
        </div>

        <div className="mobile-menu__footer">
          <a href={CONTACT.resume} target="_blank" rel="noreferrer" tabIndex={menuOpen ? 0 : -1}>
            Resume
          </a>
          <a href={CONTACT.github} target="_blank" rel="noreferrer" tabIndex={menuOpen ? 0 : -1}>
            GitHub
          </a>
          <a href={CONTACT.linkedin} target="_blank" rel="noreferrer" tabIndex={menuOpen ? 0 : -1}>
            LinkedIn
          </a>
        </div>
      </div>
    </>
  );
}
