function ItemsCard({ item }) {
  let quantity = 1;

  if (item.characters && item.characters.length > 0) {
    const firstCharacter = item.characters[0];
    if (
      firstCharacter.character_has_item &&
      firstCharacter.character_has_item.quantity != null
    ) {
      quantity = firstCharacter.character_has_item.quantity;
    }
  }

  return (
    <section className="grid grid-cols-2 gap-2 max-w-md mx-auto py-2 px-4">
      <div className="flex items-center justify-center">
        <p className="skills-section-text">{item.name}</p>
      </div>
      <div className="flex items-center justify-center">
        <p className="skills-section-text">{quantity}</p>
      </div>
    </section>
  );
}

export default ItemsCard;
