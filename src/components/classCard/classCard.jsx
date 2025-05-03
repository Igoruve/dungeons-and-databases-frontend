function ClassCard({ data }) {
  return (
    <>
      <p>{data.description}</p>
      <p>Hit Die: {data.hit_die}</p>
      <p>Main Stat: {data.main_stat}</p>
      <p>Caster: {data.caster === 1 ? "yes" : "no"}</p>
      <p>Saving Throws Proficiencies: {data.saving_throw_proficiencies}</p>
      <p>
        Tool Proficiencies:{" "}
        {data.tool_proficiencies ? data.tool_proficiencies : "None"}
      </p>
      <p>Weapon Proficiencies: {data.weapon_proficiencies}</p>
      <p>Skill Proficiencies: {data.skill_proficiencies}</p>
      <p>Armor Training: {data.armor_training}</p>
    </>
  );
}

export default ClassCard;
