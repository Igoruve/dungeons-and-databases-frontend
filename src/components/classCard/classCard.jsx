import { useState } from "react";

function ClassCard({ data }) {
  const classText = "text-white leading-relaxed pb-2";
  const baseButtonClasses =
    "w-full text-white py-2 text-center flex flex-col justify-center items-center";
  const [expanded, setExpanded] = useState(false);
  return (
    <article>
      <section className="w-100 flex flex-row h-min-40 gap-4 border-gray-500 border-b">
        <div className="flex flex-col flex-1 mb-2">
          <h2 className="text-white text-lg py-4">
            <strong>{data.name}</strong>
          </h2>
          <p className="text-white text-opacity-70 pb-4">{data.description}</p>
          {expanded && (
            <>
              <p className={`${classText}`}>
                <strong>Hit Die:</strong> {data.hit_die}.
              </p>
              <p className={`${classText}`}>
                <strong>Main Stat:</strong> {data.main_stat}.
              </p>
              <p className={`${classText}`}>
                <strong>Caster:</strong> {data.caster === 1 ? "yes" : "no"}.
              </p>
              <p className={`${classText}`}>
                <strong>Saving Throw Proficiencies:</strong>{" "}
                {data.saving_throw_proficiencies}.
              </p>
              <p className={`${classText}`}>
                <strong>Tool Proficiencies:</strong>{" "}
                {data.tool_proficiencies ? data.tool_proficiencies : "none"}.
              </p>
              <p className={`${classText}`}>
                <strong>Weapon Proficiencies:</strong>{" "}
                {data.weapon_proficiencies ? data.weapon_proficiencies : "none"}
                .
              </p>
              <p className={`${classText}`}>
                <strong>Skill Proficiencies:</strong> {data.skill_proficiencies}
                .
              </p>
              <p className={`${classText}`}>
                <strong>Armor Training:</strong>{" "}
                {data.armor_training ? data.armor_training : "none"}.
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
  );
}

export default ClassCard;
