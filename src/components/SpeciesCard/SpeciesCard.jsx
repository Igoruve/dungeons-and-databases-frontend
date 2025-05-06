function SpeciesCard({ data }) {
  return (
    <>
      <p className="text-white">{data.description}</p>
      <p className="text-white">Creature Type: {data.creature_type}</p>
      <p className="text-white">Size: {data.size}</p>
      <p className="text-white">Speed: {data.speed}</p>
    </>
  );
}

export default SpeciesCard;
