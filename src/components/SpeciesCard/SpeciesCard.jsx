function SpeciesCard({ data }) {
  return (
    <>
      <article>
        <section className="section-card">
          <div className="div-card">
            <h2 className="h2-card-browser">
              <strong>{data.name}</strong>
            </h2>
            <p className="par">
              Creature Type:
              {data.creature_type}.
            </p>
            <p className="par">
              Size:
              {data.size}.
            </p>
            <p className="par">
              Speed:
              {data.speed} ft.
            </p>
          </div>
        </section>
      </article>
    </>
  );
}

export default SpeciesCard;
