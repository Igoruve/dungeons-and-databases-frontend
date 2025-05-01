import CharacterCard from "../CharacterCard/CharacterCard";
import { useEffect, useState } from "react";
import { getAllCharacters } from "../../utils/character";
import { deletCharacter, createCharacter } from "../../utils/character";
import CharacterCardExtended from "../CharacterCardExtended/CharacterCardExtended";

function CharacterList(onRouteChange) {
  const [characters, setCharacters] = useState([]);
  const [error, setError] = useState(null);
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  useEffect(() => {
    handleLoadCharacters();
  }, []);

  const handleLoadCharacters = async () => {
    const data = await getAllCharacters();
    if (data.error) {
      if (data.status === 401) {
        onRouteChange("login");
      } else {
        setError(data.error);
      }
    } else {
      setCharacters(data);
    }
  };

  const handleRemoveCharacter = async (character_id) => {
    const response = await deletCharacter(character_id);
    if (response.error) {
    } else {
      const newCharacter = characters.filter(
        (character) => character.character_id !== character_id
      );
      setCharacters(newCharacter);
    }
  };

  if (selectedCharacter) {
    return (
      <CharacterCardExtended
        character={selectedCharacter}
        onRemove={handleRemoveCharacter}
        onSelect={() => setSelectedCharacter(null)}
      />
    );
  }

  return (
    <section>
      {error && <p>{error}</p>}
      {characters.map((character) => {
        return (
          <CharacterCard
            character={character}
            key={character.character_id}
            onRemove={handleRemoveCharacter}
            onSelect={() => setSelectedCharacter(character)}
          />
        );
      })}
      <button>Create New Character</button>{" "}
      {/* TODO que el boton te lleve al
      formulario de crear personaje */}
    </section>
  );
}

export default CharacterList;
