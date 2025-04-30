import CharacterCard from "../CharacterCard/CharacterCard";
import { useEffect, useState } from "react";
import { getAllCharacters } from "../../utils/character";
import { deletCharacter } from "../../utils/character";

function CharacterList(onRouteChange) {
  const [characters, setCharacters] = useState([]);
  const [error, setError] = useState(null);

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

  return (
    <section>
      {error && <p>{error}</p>}
      {characters.map((character) => {
        return (
          <CharacterCard
            character={character}
            key={character.character_id}
            onRemove={handleRemoveCharacter}
          />
        );
      })}
    </section>
  );
}

export default CharacterList;
