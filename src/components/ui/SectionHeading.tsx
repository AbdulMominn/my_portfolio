interface SectionHeadingProps {
  id: string;
  number: string;
  title: string;
  introduction?: string;
  context?: string;
}

export function SectionHeading({ id, number, title, introduction, context }: SectionHeadingProps) {
  return (
    <div className="section-heading">
      <div className="section-heading__title-row">
        <span className="section-heading__number" aria-hidden="true">
          {number}
        </span>
        <h2 id={id}>{title}</h2>
        {context && <span className="section-heading__context">{context}</span>}
      </div>
      {introduction && <p>{introduction}</p>}
    </div>
  );
}
