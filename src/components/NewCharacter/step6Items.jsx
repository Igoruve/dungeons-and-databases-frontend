import { getAllItems } from "../../utils/items";
import { useEffect, useState } from "react";
import { useCharacterContext } from "../../context/CharacterContext";

function SelectItems({ onNext, back }) {
  const { character, updateCharacter } = useCharacterContext();
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchItems() {
      try {
        const arrayItems = await getAllItems();
        console.log("Fetched items:", arrayItems);
        setItems(arrayItems);
      } catch (error) {
        console.error("Error loading items:", error);
        setError("Failed to load items. Please try again.");
      }
    }
    fetchItems();
  }, []);

  const handleItemsSelection = (e) => {
    const itemId = parseInt(e.target.name, 10);
    const itemQuantity = Number(e.target.value);
    console.log(`Selected item ID: ${itemId}, Quantity: ${itemQuantity}`);

    if (isNaN(itemQuantity) || itemQuantity < 1) {
      console.error("Invalid quantity:", itemQuantity);
      return;
    }

    const updatedItems = [...character.items];
    const existingItemIndex = updatedItems.findIndex(
      (item) => item.id === itemId
    );

    if (existingItemIndex !== -1) {
      updatedItems[existingItemIndex].quantity = itemQuantity;
    } else {
      updatedItems.push({
        item_id: itemId,
        name: items.find((i) => i.item_id === itemId)?.name || "Unknown",
        quantity: itemQuantity,
      });
    }
    updateCharacter("items", updatedItems);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (!character.items || character.items.length === 0) {
      setError("Please select at least one item before proceeding.");
      setIsLoading(false);
      return;
    }
    onNext();
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Select Your Items</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {items.map((item) => (
        <div key={item.item_id}>
          <label>{item.name}</label>
          <input
            type="number"
            min={1}
            name={item.item_id}
            value={
              character.items.find(
                (charItem) => charItem.item_id === item.item_id
              )?.quantity || ""
            }
            onChange={handleItemsSelection}
          />
        </div>
      ))}

      <button type="button" onClick={back}>
        Back
      </button>

      <button type="submit" disabled={isLoading}>
        {isLoading ? "Saving..." : "Next"}
      </button>
    </form>
  );
}

export default SelectItems;
