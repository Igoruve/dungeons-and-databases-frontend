function ItemCard({ data }) {
  return (
    <>
      <p>{data.description}</p>
      <p>Value: {data.value}</p>
      <p>Type: {data.type}</p>
      <p>Rarity: {data.rarity}</p>
      <p>Magic Item: {data.magic === 1 ? "yes" : "no"}</p>
    </>
  );
}

export default ItemCard;
