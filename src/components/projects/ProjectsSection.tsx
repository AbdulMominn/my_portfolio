import { useMemo, useState } from "react";
import { PROJECTS } from "../../data/portfolio";
import { PROFILES } from "../../data/profiles";
import type { ProfileId } from "../../types/portfolio";
import { AnimatedSection } from "../ui/AnimatedSection";
import { SectionHeading } from "../ui/SectionHeading";
import { ProjectCard } from "./ProjectCard";

interface ProjectsSectionProps {
  profileId: ProfileId;
}

export function ProjectsSection({ profileId }: ProjectsSectionProps) {
  const [expandedProfile, setExpandedProfile] = useState<ProfileId | null>(null);
  const profile = PROFILES[profileId];
  const showAll = expandedProfile === profileId;

  const orderedProjects = useMemo(() => {
    const order = new Map(profile.projectOrder.map((id, index) => [id, index]));
    return [...PROJECTS].sort(
      (a, b) => (order.get(a.id) ?? Number.MAX_SAFE_INTEGER) - (order.get(b.id) ?? Number.MAX_SAFE_INTEGER),
    );
  }, [profile]);

  const visibleProjects = showAll ? orderedProjects : orderedProjects.slice(0, profile.featuredProjectCount);
  const additionalCount = PROJECTS.length - profile.featuredProjectCount;

  return (
    <section className="section" id="projects" aria-labelledby="projects-title">
      <AnimatedSection>
        <SectionHeading
          id="projects-title"
          number="02"
          title="Projects"
          context={`${profile.label} focus`}
          introduction={`Projects are ordered by relevance to the ${profile.label.toLowerCase()} profile. Additional projects remain available below.`}
        />
      </AnimatedSection>

      <div className="projects-grid">
        {visibleProjects.map((project, index) => (
          <AnimatedSection key={project.id} delay={(index % 2) * 70}>
            <ProjectCard project={project} profileId={profileId} featured={index < profile.featuredProjectCount} />
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
          {showAll ? "Show featured work" : `Explore ${additionalCount} additional projects`}
          <span aria-hidden="true">{showAll ? "↑" : "↓"}</span>
        </button>
      </AnimatedSection>
    </section>
  );
}
