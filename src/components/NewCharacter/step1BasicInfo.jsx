import { useEffect, useContext, useState } from "react";
import { useCharacterContext } from "../../context/CharacterContext";
import { AuthContext } from "../../context/AuthContext";

function NewCharacter({ onNext }) {
  const { character, updateCharacter } = useCharacterContext();
  const { userData } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (userData) {
      updateCharacter("user_id", userData.user_id);
    }
  }, [userData, updateCharacter]);

  const handleChange = (key, value) => {
    updateCharacter(key, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (!character.first_name || !character.last_name || !character.level) {
      setError("Please fill in all required fields.");
      setIsLoading(false);
      return;
    }
    onNext();
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="first_name"
        placeholder="First Name"
        id="first_name"
        value={character.first_name}
        onChange={(e) => handleChange("first_name", e.target.value)}
        required
      />
      <input
        type="text"
        name="last_name"
        placeholder="Last Name"
        id="last_name"
        value={character.last_name}
        onChange={(e) => handleChange("last_name", e.target.value)}
        required
      />
      <input
        type="number"
        name="age"
        placeholder="Age"
        id="age"
        value={character.age}
        onChange={(e) => handleChange("age", e.target.value)}
        min="1"
      />
      <input
        type="text"
        name="alignment"
        placeholder="Alignment"
        id="alignment"
        value={character.alignment}
        onChange={(e) => handleChange("alignment", e.target.value)}
      />
      <input
        type="number"
        name="level"
        placeholder="Level"
        id="level"
        value={character.level}
        onChange={(e) => handleChange("level", e.target.value)}
        min="1"
        required
      />
      <textarea
        name="appearance"
        placeholder="Appearance"
        id="appearance"
        value={character.appearance}
        onChange={(e) => handleChange("appearance", e.target.value)}
      />
      <textarea
        name="lore"
        placeholder="Your character story"
        id="lore"
        value={character.lore}
        onChange={(e) => handleChange("lore", e.target.value)}
      />
      <textarea
        name="personality"
        placeholder="Your character personality"
        id="personality"
        value={character.personality}
        onChange={(e) => handleChange("personality", e.target.value)}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button disabled={isLoading}>{isLoading ? "Saving..." : "Next"}</button>
    </form>
  );
}

export default NewCharacter;
