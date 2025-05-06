import { useState } from "react";

function ItemCard({ data }) {
  const classText = "text-white leading-relaxed pb-2";
  const baseButtonClasses =
    "w-full text-white py-2 text-center flex flex-col justify-center items-center";
  const [expanded, setExpanded] = useState(false);
  return (
    <>
      <article>
        <section className="w-100 flex flex-row h-min-40 gap-4 border-gray-500 border-b">
          <div className="flex flex-col flex-1 pb-4">
            <h2 className="text-white text-lg py-4">
              <strong>{data.name}</strong>
            </h2>
            <p className="text-white text-opacity-70 pb-3">
              {data.description}
            </p>
            {expanded && (
              <>
                <p className={`${classText}`}>
                  <strong>Value:</strong> {data.value}.
                </p>
                <p className={`${classText}`}>
                  <strong>Type:</strong> {data.type}.
                </p>
                <p className={`${classText}`}>
                  <strong>Rarity:</strong> {data.rarity}.
                </p>
                <p className={`${classText}`}>
                  <strong>Magic Item:</strong> {data.magic === 1 ? "yes" : "no"}.
                </p>
              </>
            )}
          </div>
          <div className="flex flex-col items-end justify-start py-3">
            <button
              className={`${baseButtonClasses} text-[var(--accent-color)] text-4xl py-4 px-4 font-bold`}
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
