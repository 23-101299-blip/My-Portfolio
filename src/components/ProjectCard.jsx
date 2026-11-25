import { Link } from 'react-router-dom';
import { getCategory } from '../data/site';

// Thumbnail for a project — a real image, or one of the editable schematic previews.
export function ProjectThumb({ project }) {
  const t = project.thumb;
  if (t.type === 'image') {
    return (
      <div className={`thumb thumb--${t.bg} thumb--${t.fit}`}>
        <img
          src={t.src}
          alt={`${project.title} preview`}
          loading="lazy"
          style={t.position ? { objectPosition: t.position } : undefined}
        />
      </div>
    );
  }
  if (t.type === 'foodiq') {
    return (
      <div className={`thumb thumb--${t.bg} thumb--schematic`}>
        <div className="schematic">
          <div className="schematic__bar schematic__bar--green pixel">FoodIQ</div>
          <p className="retro schematic__title">Explore food choices</p>
          <div className="schematic__tiles">
            <span className="retro tile tile--sky">Compare</span>
            <span className="retro tile tile--yellow">Discover</span>
          </div>
          <p className="retro muted schematic__note">SCHEMATIC / PREVIEW PLACEHOLDER</p>
        </div>
      </div>
    );
  }
  // agency concept
  return (
    <div className={`thumb thumb--${t.bg} thumb--schematic`}>
      <div className="schematic">
        <div className="schematic__bar schematic__bar--sky pixel">CREATIVE SERVICES</div>
        <img className="schematic__icon" src="/assets/pixel/remote-workspace.svg" width="64" height="56" alt="" />
        <p className="retro schematic__center">Startups + Remote creatives</p>
        <p className="retro muted schematic__note">SCHEMATIC / PREVIEW PLACEHOLDER</p>
      </div>
    </div>
  );
}

export default function ProjectCard({ project }) {
  return (
    <article className="pcard">
      <ProjectThumb project={project} />
      <div className="pcard__body">
        <h3 className="pixel pcard__title">{project.title}</h3>
        <p className="pcard__summary">{project.summary}</p>
        <p className="retro muted pcard__label">{project.label}</p>
        {project.categories.length > 0 && (
          <ul className="tags pcard__tags" aria-label="Categories">
            {project.categories.map((slug) => (
              <li key={slug}>
                <Link to={`/projects?category=${slug}`} className="tag">{getCategory(slug).short}</Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}
