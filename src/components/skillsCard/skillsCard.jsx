function SkillsCard({ data }) {
  return (
    <>
      <p className="text-white">{data.description}</p>
      <p className="text-white">Associated Stat: {data.associated_stat}</p>
    </>
  );
}

export default SkillsCard;
