import { useState } from "react";

function ItemCard({ data }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <>
      <article>
        <section className="section-card">
          <div className="div-card">
            <h2 className="h2-card">
              <strong>{data.name}</strong>
            </h2>
            <p className="par-low-opacity">{data.description}</p>
            {expanded && (
              <>
                <p className="par">
                  <strong>Value:</strong> {data.value}.
                </p>
                <p className="par">
                  <strong>Type:</strong> {data.type}.
                </p>
                <p className="par">
                  <strong>Rarity:</strong> {data.rarity}.
                </p>
                <p className="par">
                  <strong>Magic Item:</strong> {data.magic === 1 ? "yes" : "no"}
                  .
                </p>
              </>
            )}
          </div>
          <div className="div-card-button">
            <button
              className="button-card"
              onClick={() => setExpanded(!expanded)}
            >
              +
            </button>
          </div>
        </section>
      </article>
    </>
  );
}

export default ItemCard;
