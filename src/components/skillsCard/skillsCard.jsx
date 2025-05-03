function SkillsCard({ data }) {
  return (
    <>
      <p>{data.description}</p>
      <p>Associated Stat: {data.associated_stat}</p>
    </>
  );
}

export default SkillsCard;
