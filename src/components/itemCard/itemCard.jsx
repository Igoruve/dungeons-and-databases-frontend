import { useState } from "react";
import { motion } from "framer-motion";

function ItemCard({ data }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <>
      <article>
        <section className="section-card">
          <div className="div-card" onClick={() => setExpanded(!expanded)}>
            <h2 className="h2-card-browser">
              <strong>{data.name}</strong>
            </h2>
            <p className="par-low-opacity pb-3">{data.description}</p>

            <motion.div
              className="div-card-content"
              initial={{ maxHeight: 0, opacity: 0 }}
              animate={{
                maxHeight: expanded ? "1000px" : 0,
                opacity: expanded ? 1 : 0,
              }}
              transition={{
                duration: 0.4,
                ease: "easeInOut",
              }}
              style={{
                overflow: "hidden",
              }}
            >
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
                <strong>Magic Item:</strong> {data.magic === 1 ? "yes" : "no"}.
              </p>
            </motion.div>
          </div>
          <div className="div-card-button">
            <button
              className="button-card"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="32px"
                  viewBox="0 -960 960 960"
                  width="32px"
                  fill="#ef4444"
                >
                  <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="32px"
                  viewBox="0 -960 960 960"
                  width="32px"
                  fill="#ef4444"
                >
                  <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
                </svg>
              )}
            </button>
          </div>
        </section>
      </article>
    </>
  );
}

export default ItemCard;
