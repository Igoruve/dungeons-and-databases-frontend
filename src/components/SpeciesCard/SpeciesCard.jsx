function SpeciesCard({ data }) {
  return (
    <>
      <p>{data.description}</p>
      <p>Creature Type: {data.creature_type}</p>
      <p>Size: {data.size}</p>
      <p>Speed: {data.speed}</p>
    </>
  );
}

export default SpeciesCard;
