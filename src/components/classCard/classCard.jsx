import { useState } from "react";

function ClassCard({ data }) {
  const [expanded, setExpanded] = useState(false);
  return (
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
                <strong>Hit Die:</strong> {data.hit_die}.
              </p>
              <p className="par">
                <strong>Main Stat:</strong> {data.main_stat}.
              </p>
              <p className="par">
                <strong>Caster:</strong> {data.caster === 1 ? "yes" : "no"}.
              </p>
              <p className="par">
                <strong>Saving Throw Proficiencies:</strong>{" "}
                {data.saving_throw_proficiencies}.
              </p>
              <p className="par">
                <strong>Tool Proficiencies:</strong>{" "}
                {data.tool_proficiencies ? data.tool_proficiencies : "none"}.
              </p>
              <p className="par">
                <strong>Weapon Proficiencies:</strong>{" "}
                {data.weapon_proficiencies ? data.weapon_proficiencies : "none"}
                .
              </p>
              <p className="par">
                <strong>Skill Proficiencies:</strong> {data.skill_proficiencies}
                .
              </p>
              <p className="par">
                <strong>Armor Training:</strong>{" "}
                {data.armor_training ? data.armor_training : "none"}.
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
  );
}

export default ClassCard;
