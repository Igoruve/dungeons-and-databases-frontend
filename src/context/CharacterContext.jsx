import { createContext, useState, useContext, useCallback } from "react";

const initialState = {
  first_name: "",
  last_name: "",
  age: 1,
  alignment: "",
  level: 1,
  appearance: "",
  lore: "",
  personality: "",
  user_id: "",
  class: { name: "", description: "" },
  species: { name: "", creature_type: "" },
  items: [],
  stats: { STR: 0, DEX: 0, CON: 0, INT: 0, WIS: 0, CHA: 0 },
  skills: [],
};

const CharacterContext = createContext({});

function CharacterProvider({ children }) {
  const [character, setCharacter] = useState(initialState);
  const updateCharacter = useCallback((key, value) => {
    setCharacter((prev) => ({
      ...prev,
      [key]: value,
    }));
  }, []);

  return (
    <CharacterContext.Provider
      value={{ character, setCharacter, updateCharacter }}
    >
      {children}
    </CharacterContext.Provider>
  );
}

function useCharacterContext() {
  const context = useContext(CharacterContext);
  if (!context) {
    throw new Error(
      "useCharacterContext must be used within a CharacterProvider"
    );
  }
  return context;
}

export default CharacterContext;
export { CharacterProvider, useCharacterContext };
