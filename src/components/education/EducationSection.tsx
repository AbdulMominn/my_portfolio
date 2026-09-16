import { EDUCATION } from "../../data/portfolio";
import { AnimatedSection } from "../ui/AnimatedSection";
import { GlassCard } from "../ui/GlassCard";
import { SectionHeading } from "../ui/SectionHeading";

export function EducationSection() {
  return (
    <section className="section section--education" id="education" aria-labelledby="education-title">
      <AnimatedSection>
        <SectionHeading id="education-title" number="04" title="Education" />
      </AnimatedSection>

      <div className="education-list">
        {EDUCATION.map((education, index) => (
          <AnimatedSection key={education.id} delay={index * 70}>
            <GlassCard as="article" className="education-card">
              <div>
                <p className="education-card__school">{education.school}</p>
                <h3>{education.degree}</h3>
                {(education.specialization || education.honors) && (
                  <div className="education-card__highlights">
                    {education.specialization && (
                      <p className="education-card__specialization">
                        <span>Specialization</span>
                        {education.specialization}
                      </p>
                    )}
                    {education.honors && <p className="education-card__honors">{education.honors}</p>}
                  </div>
                )}
                {education.detail && <p className="education-card__detail">{education.detail}</p>}
              </div>
              <div className="education-card__meta">
                <span>{education.location}</span>
                <time>{education.period}</time>
              </div>
            </GlassCard>
          </AnimatedSection>
        ))}
      </div>
    </section>
  );
}
