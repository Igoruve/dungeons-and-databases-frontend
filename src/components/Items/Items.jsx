function ItemsCard({ item }) {
    const quantity = item.characters?.[0]?.character_has_item?.quantity ?? 1;
  
    return (
      <section className="character-items">
        <p>{item.name} ({quantity})</p>
      </section>
    );
  }
  
export default ItemsCard;