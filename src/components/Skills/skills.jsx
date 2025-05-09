function SkillsCard({ skill, statValue }) {
  const bonus = Math.floor((statValue - 10) / 2);

  return (
    <section className="grid grid-cols-3 gap-2 max-w-md mx-auto py-2 px-4">
      <div className="flex items-center justify-center">
        <p className="skills-section-text">{skill.associated_stat}</p>
      </div>
      <div className="flex items-center justify-center">
        <p className="skills-section-text">{skill.name}</p>
      </div>
      <div className="flex items-center justify-center">
        <div className="skills-section-text border border-zinc-500 rounded-md px-2 min-w-[40px] text-center">
          {bonus >= 1 ? `+${bonus}` : bonus}
        </div>
      </div>
    </section>
  );
}

export default SkillsCard;
