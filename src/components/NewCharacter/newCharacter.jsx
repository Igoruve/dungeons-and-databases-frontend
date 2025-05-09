import { useState, useEffect } from "react";
import { createCharacter } from "../../utils/character";
import { AuthContext, useContext } from "../../context/AuthContext";
import RouteContext from "../../context/RouterContext";

function NewCharacter() {
  const { onRouteChange } = useContext(RouteContext);
  const [isLoading, setIsLoading] = useState(false);
  const { userData } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const [characterData, setCharacterData] = useState({
    first_name: "",
    last_name: "",
    age: 0,
    alignment: "",
    level: 1,
    appereance: "",
    lore: "",
    personality: "",
    user_id: "",
  });

  useEffect(() => {
    if (userData) {
      setCharacterData((prev) => ({
        ...prev,
        user_id: userData.user_id,
      }));
    }
  }, [userData]);

  const handleCharacterFirstName = (e) => {
    const newName = e.target.value;
    setCharacterData((prevState) => ({ ...prevState, first_name: newName }));
  };

  const handleCharacterLastName = (e) => {
    const newLastName = e.target.value;
    setCharacterData((prevState) => ({ ...prevState, last_name: newLastName }));
  };

  const handleCharacterAge = (e) => {
    const newAge = e.target.value;
    setCharacterData((prevState) => ({ ...prevState, age: newAge }));
  };

  const handleCharacterAlignment = (e) => {
    const newAlignment = e.target.value;
    setCharacterData((prevState) => ({
      ...prevState,
      alignment: newAlignment,
    }));
  };

  const handleCharacterLevel = (e) => {
    const newLevel = e.target.value;
    setCharacterData((prevState) => ({ ...prevState, level: newLevel }));
  };

  const handleCharacterAppereance = (e) => {
    const newAppereance = e.target.value;
    setCharacterData((prevState) => ({
      ...prevState,
      appereance: newAppereance,
    }));
  };

  const handleCharacterLore = (e) => {
    const newLore = e.target.value;
    setCharacterData((prevState) => ({ ...prevState, lore: newLore }));
  };

  const handleCharacterPersonality = (e) => {
    const newPersonality = e.target.value;
    setCharacterData((prevState) => ({
      ...prevState,
      personality: newPersonality,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const result = await createCharacter(characterData);
      if (result && result.error) {
        console.error("Creation failed:", result.error);
        setError(result.error || "Creation failed. Please try again.");
      } else {
        console.log("Creation successful:", result);
        onRouteChange("characters");
      }
    } catch (err) {
      console.error("Submit error:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="first_name"
        placeholder="First Name"
        id="first_name"
        value={characterData.first_name}
        onChange={handleCharacterFirstName}
        required
      />
      <input
        type="text"
        name="last_name"
        placeholder="Last Name"
        id="last_name"
        value={characterData.last_name}
        onChange={handleCharacterLastName}
        required
      />
      <input
        type="number"
        name="age"
        placeholder="Age"
        id="age"
        value={characterData.age}
        onChange={handleCharacterAge}
        min="1"
      />
      <input
        type="text"
        name="alignment"
        placeholder="Alignment"
        id="alignment"
        value={characterData.alignment}
        onChange={handleCharacterAlignment}
      />
      <input
        type="number"
        name="level"
        placeholder="Level"
        id="level"
        value={characterData.level}
        onChange={handleCharacterLevel}
        min="1"
        required
      />
      <textarea
        name="appereance"
        placeholder="Appereance"
        id="appereance"
        value={characterData.appereance}
        onChange={handleCharacterAppereance}
      />
      <textarea
        name="lore"
        placeholder="Your character story"
        id="lore"
        value={characterData.lore}
        onChange={handleCharacterLore}
      />
      <textarea
        name="personality"
        placeholder="Your character personality"
        id="personality"
        value={characterData.personality}
        onChange={handleCharacterPersonality}
      />
      <button disabled={isLoading}>{isLoading ? "Creating" : "Create"}</button>
    </form>
  );
}

export default NewCharacter;
