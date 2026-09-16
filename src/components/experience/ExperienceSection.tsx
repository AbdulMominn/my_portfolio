import { EXPERIENCE } from "../../data/portfolio";
import type { EvidenceItem, ProfileId } from "../../types/portfolio";
import { AnimatedSection } from "../ui/AnimatedSection";
import { GlassCard } from "../ui/GlassCard";
import { SectionHeading } from "../ui/SectionHeading";

interface ExperienceSectionProps {
  profileId: ProfileId;
}

function sortHighlights(highlights: EvidenceItem[], profileId: ProfileId) {
  return [...highlights].sort(
    (a, b) => Number(b.profiles.includes(profileId)) - Number(a.profiles.includes(profileId)),
  );
}

export function ExperienceSection({ profileId }: ExperienceSectionProps) {
  return (
    <section className="section" id="experience" aria-labelledby="experience-title">
      <AnimatedSection>
        <SectionHeading
          id="experience-title"
          number="01"
          title="Experience"
          context={`${profileId === "ai" ? "AI" : profileId.charAt(0).toUpperCase() + profileId.slice(1)} focus`}
          introduction="Professional work with the most relevant evidence for the selected profile shown first."
        />
      </AnimatedSection>

      <div className="experience-list">
        {EXPERIENCE.map((experience, index) => (
          <AnimatedSection key={experience.id} delay={index * 70}>
            <GlassCard as="article" className={`experience-card ${index === 0 ? "experience-card--primary" : ""}`}>
              <div className="experience-card__top">
                <div>
                  <p className="experience-card__type">{experience.type}</p>
                  <h3>{experience.role}</h3>
                  <p className="experience-card__company">
                    {experience.company} <span>· {experience.location}</span>
                  </p>
                </div>
                <time>{experience.period}</time>
              </div>

              <p className="experience-card__summary">{experience.summary}</p>

              <ul className="evidence-list">
                {sortHighlights(experience.highlights, profileId).map((highlight) => (
                  <li key={highlight.text} className={highlight.profiles.includes(profileId) ? "is-relevant" : ""}>
                    {highlight.text}
                  </li>
                ))}
              </ul>

              <div className="technology-list" aria-label={`${experience.company} technologies`}>
                {experience.technologies.map((technology) => (
                  <span key={technology}>{technology}</span>
                ))}
              </div>
            </GlassCard>
          </AnimatedSection>
        ))}
      </div>
    </section>
  );
}
