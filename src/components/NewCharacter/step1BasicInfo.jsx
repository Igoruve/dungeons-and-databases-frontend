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
    <section className="section-card-extended">
      <h2 className="h2-card">Basic Information</h2>
      <form onSubmit={handleSubmit} className="form-create-character">
        <input
          className="form-input"
          type="text"
          name="first_name"
          placeholder="First Name"
          id="first_name"
          value={character.first_name}
          onChange={(e) => {
            const value = e.target.value;
            if (/^[a-zA-Z\s]*$/.test(value)) {
              handleChange("first_name", value);
            }
          }}
          pattern="[a-zA-Z\s]+" 
          title="First name can only contain letters and spaces."
          required
        />
        <input
          className="form-input"
          type="text"
          name="last_name"
          placeholder="Last Name"
          id="last_name"
          value={character.last_name}
          onChange={(e) => {
            const value = e.target.value;
            if (/^[a-zA-Z\s]*$/.test(value)) {
              handleChange("last_name", value);
            }
          }}
          pattern="[a-zA-Z\s]+"
          title="Last name can only contain letters and spaces."
          required
        />
        <input
          className="form-input"
          type="number"
          name="age"
          placeholder="Age"
          id="age"
          value={character.age}
          onChange={(e) => {
            const value = e.target.value;
            if (!isNaN(value) && Number(value) > 0) {
              handleChange("age", value);
            }
          }}
          min="1"
          title="Age must be a positive number."
          required
        />
        <select
          className="form-input"
          name="alignment"
          id="alignment"
          value={character.alignment}
          onChange={(e) => handleChange("alignment", e.target.value)}
          required
        >
          <option value="" disabled className="text-gray-400">
            Select Alignment
          </option>
          <option value="Good">Good</option>
          <option value="Neutral">Neutral</option>
          <option value="Evil">Evil</option>
        </select>

        <input
          className="form-input"
          type="number"
          name="level"
          placeholder="Level"
          id="level"
          value={character.level}
          onChange={(e) => {
            const value = e.target.value;
            if (!isNaN(value) && Number(value) > 0) {
              handleChange("level", value);
            }
          }}
          min="1"
          title="Level must be a positive number."
          required
        />
        <textarea
          className="form-input"
          name="appearance"
          placeholder="Appearance"
          id="appearance"
          value={character.appearance}
          onChange={(e) => handleChange("appearance", e.target.value)}
        />
        <textarea
          className="form-input"
          name="lore"
          placeholder="Your character story"
          id="lore"
          value={character.lore}
          onChange={(e) => handleChange("lore", e.target.value)}
        />
        <textarea
          className="form-input"
          name="personality"
          placeholder="Your character personality"
          id="personality"
          value={character.personality}
          onChange={(e) => handleChange("personality", e.target.value)}
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button disabled={isLoading} className="form-button">
          {isLoading ? "Saving..." : "Next"}
        </button>
      </form>
    </section>
  );
}

export default NewCharacter;
