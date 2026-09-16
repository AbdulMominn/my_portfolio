import { useState } from "react";
import type { Project, ProfileId } from "../../types/portfolio";
import { GlassCard } from "../ui/GlassCard";

interface ProjectCardProps {
  project: Project;
  profileId: ProfileId;
  featured: boolean;
}

export function ProjectCard({ project, profileId, featured }: ProjectCardProps) {
  const [showAllTechnologies, setShowAllTechnologies] = useState(false);
  const technologyLimit = featured ? 6 : 5;
  const visibleTechnologies = project.technologies.slice(0, technologyLimit);
  const additionalTechnologies = project.technologies.slice(technologyLimit);

  return (
    <GlassCard as="article" className={`project-card ${featured ? "project-card--featured" : ""}`}>
      <div className="project-card__topline">
        <span>{project.subtitle}</span>
        {project.profiles.includes(profileId) && <span className="project-card__relevance">Relevant now</span>}
      </div>

      <h3>{project.title}</h3>
      <p className="project-card__summary">{project.summary}</p>

      <div className="project-card__engineering">
        <span>Engineering focus</span>
        <p>{project.engineering}</p>
      </div>

      <div className="technology-list technology-list--project" aria-label={`${project.title} technologies`}>
        {visibleTechnologies.map((technology) => (
          <span key={technology}>{technology}</span>
        ))}
        {showAllTechnologies &&
          additionalTechnologies.map((technology) => (
            <span className="technology-list__extra" key={technology}>
              {technology}
            </span>
          ))}
        {additionalTechnologies.length > 0 && (
          <button
            className="technology-list__more"
            type="button"
            onClick={() => setShowAllTechnologies((current) => !current)}
            aria-expanded={showAllTechnologies}
            aria-label={`${showAllTechnologies ? "Hide" : "Show"} additional technologies for ${project.title}`}
          >
            {showAllTechnologies ? "Show less" : `+${additionalTechnologies.length} more`}
          </button>
        )}
      </div>
    </GlassCard>
  );
}
