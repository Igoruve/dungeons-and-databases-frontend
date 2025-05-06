function ItemCard({ data }) {
  return (
    <>
      <article>
        <p className="text-white">{data.description}</p>
        <p className="text-white">Value: {data.value}</p>
        <p className="text-white">Type: {data.type}</p>
        <p className="text-white">Rarity: {data.rarity}</p>
        <p className="text-white">
          Magic Item: {data.magic === 1 ? "Yes" : "No"}
        </p>
      </article>
    </>
  );
}

export default ItemCard;
