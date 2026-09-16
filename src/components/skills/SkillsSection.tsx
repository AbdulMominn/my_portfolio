import { useMemo, useState } from "react";
import { SKILL_CATEGORIES } from "../../data/portfolio";
import { PROFILES } from "../../data/profiles";
import type { ProfileId, SkillCategory } from "../../types/portfolio";
import { AnimatedSection } from "../ui/AnimatedSection";
import { GlassCard } from "../ui/GlassCard";
import { SectionHeading } from "../ui/SectionHeading";

interface SkillsSectionProps {
  profileId: ProfileId;
}

function orderSkills(category: SkillCategory, featuredSkills: string[]) {
  const featured = new Set(featuredSkills);
  return [...category.skills].sort((a, b) => Number(featured.has(b)) - Number(featured.has(a)));
}

export function SkillsSection({ profileId }: SkillsSectionProps) {
  const [expandedProfile, setExpandedProfile] = useState<ProfileId | null>(null);
  const profile = PROFILES[profileId];
  const showAll = expandedProfile === profileId;

  const orderedCategories = useMemo(() => {
    const order = new Map(profile.skillCategoryOrder.map((id, index) => [id, index]));
    return [...SKILL_CATEGORIES].sort(
      (a, b) => (order.get(a.id) ?? Number.MAX_SAFE_INTEGER) - (order.get(b.id) ?? Number.MAX_SAFE_INTEGER),
    );
  }, [profile]);

  const visibleCategories = showAll ? orderedCategories : orderedCategories.slice(0, 4);
  const featuredSkills = new Set(profile.featuredSkills);

  return (
    <section className="section" id="skills" aria-labelledby="skills-title">
      <AnimatedSection>
        <SectionHeading
          id="skills-title"
          number="03"
          title="Skills"
          context={`${profile.label} focus`}
          introduction={`The most relevant ${profile.label.toLowerCase()} skills appear first. The complete verified skill inventory remains available.`}
        />
      </AnimatedSection>

      <div className="skills-grid">
        {visibleCategories.map((category, index) => (
          <AnimatedSection key={category.id} delay={(index % 2) * 60}>
            <GlassCard className="skill-card">
              <div className="skill-card__header">
                <span aria-hidden="true">0{index + 1}</span>
                <h3>{category.title}</h3>
              </div>
              <p className="skill-card__description">{category.description}</p>
              <div className="skill-list">
                {orderSkills(category, profile.featuredSkills).map((skill) => (
                  <span key={skill} className={featuredSkills.has(skill) ? "is-highlighted" : ""}>
                    {skill}
                  </span>
                ))}
              </div>
            </GlassCard>
          </AnimatedSection>
        ))}
      </div>

      <AnimatedSection className="section-action">
        <button
          className="text-button"
          type="button"
          onClick={() => setExpandedProfile(showAll ? null : profileId)}
          aria-expanded={showAll}
        >
          {showAll ? "Show priority categories" : "View complete skill inventory"}
          <span aria-hidden="true">{showAll ? "↑" : "↓"}</span>
        </button>
      </AnimatedSection>
    </section>
  );
}
