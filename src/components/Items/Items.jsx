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
    <section>
      <p>
        {item.name} ({quantity})
      </p>
    </section>
  );
}

export default ItemsCard;
