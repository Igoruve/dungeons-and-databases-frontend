function SkillsCard({ skill, statValue }) {
  const bonus = Math.floor((statValue - 10) / 2);

  return (
    <section className="flex flex-row justify-between mx-4 border-b border-zinc-700 py-4 items-center">
      <p className="text-zinc-900 dark:text-zinc-100">
        {skill.associated_stat}
      </p>
      <p className="text-zinc-900 dark:text-zinc-100">{skill.name}</p>
      <p className="text-zinc-900 dark:text-zinc-100">
        {bonus >= 1 ? `+${bonus}` : bonus}
      </p>
    </section>
  );
}
export default SkillsCard;
