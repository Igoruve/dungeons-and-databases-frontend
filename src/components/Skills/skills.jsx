function SkillsCard({ skill }) {
  return (
    <section className="character-skills">
      <h3>Skills</h3>
      <p>{skill.name}</p>
    </section>
  );
}

export default SkillsCard;
