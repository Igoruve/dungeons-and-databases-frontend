import { createContext, useState, useContext, useCallback } from "react";

const initialState = {
  first_name: "",
  last_name: "",
  age: 0,
  alignment: null,
  level: 1,
  appearance: null,
  lore: null,
  personality: null,
  user_id: "",
  class: { id: null, name: "", description: "" },
  species: { id: null, name: "", creature_type: "" },
  items: [],
  stats: {},
  skills: [],
};

const CharacterContext = createContext({});

function CharacterProvider({ children }) {
  const [character, setCharacter] = useState(initialState);
  const [characters, setCharacters] = useState([]);

  const updateCharacter = useCallback((key, value) => {
    setCharacter((prev) => ({
      ...prev,
      [key]: value,
    }));
  }, []);

  const addCharacter = useCallback(() => {
    setCharacters((prev) => [...prev, character]);
  }, [character]);

  return (
    <CharacterContext.Provider
      value={{
        character,
        characters,
        setCharacter,
        updateCharacter,
        addCharacter,
      }}
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
