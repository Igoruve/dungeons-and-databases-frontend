function SkillsCard({ data }) {
  return (
    <>
      <article>
        <section className="section-card">
          <div className="div-card">
            <h2 className="h2-card-browser">
              <strong>{data.name}</strong>
            </h2>
            <p className="par-low-opacity pb-3">{data.description}</p>
            <p className="par">
              <strong>Associated Stat:</strong> {data.associated_stat}.
            </p>
          </div>
        </section>
      </article>
    </>
  );
}

export default SkillsCard;
