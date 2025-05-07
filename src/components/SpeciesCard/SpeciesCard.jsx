function SpeciesCard({ data }) {
  return (
    <>
      <article>
        <section className="section-card">
          <div className="div-card">
            <h2 className="h2-card">
              <strong>{data.name}</strong>
            </h2>
            <p className="par">
              <strong>Creature Type: </strong>
              {data.creature_type}.
            </p>
            <p className="par">
              <strong>Size: </strong>
              {data.size}.
            </p>
            <p className="par">
              <strong>Speed: </strong>
              {data.speed} ft.
            </p>
          </div>
        </section>
      </article>
    </>
  );
}

export default SpeciesCard;
