import CharacterCard from "../CharacterCard/CharacterCard";
import { useEffect, useState } from "react";
import { getCharactersByUserId, deleteCharacter } from "../../utils/character";
import CharacterCardExtended from "../CharacterCardExtended/CharacterCardExtended";
import { getUser } from "../../utils/localStorage";

function CharacterList({ onRouteChange }) {
  const [characters, setCharacters] = useState([]);
  const [error, setError] = useState(null);
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  useEffect(() => {
    handleLoadCharacters();
  }, []);

  const handleLoadCharacters = async () => {
    try {
      const user = getUser();
      if (!user) {
        onRouteChange("login");
        return;
      }
      const data = await getCharactersByUserId(user.user_id);
      if (data.error) {
        if (data.status === 401) {
          onRouteChange("login");
        } else {
          setError(`Error loading characters: ${data.error}`);
        }
      } else if (Array.isArray(data)) {
        setCharacters(data);
      } else {
        setError("Invalid data format received from server");
        setCharacters([]);
      }
    } catch (err) {
      console.error("Exception occurred:", err);
      setError(`Failed to load characters: ${err.message}`);
    }
  };

  const handleRemoveCharacter = async (character_id) => {
    try {
      const response = await deleteCharacter(character_id);
      if (response.error) {
        setError(`Error deleting character: ${response.error}`);
      } else {
        setCharacters(characters.filter((char) => char.character_id !== character_id)
        );
        if (selectedCharacter?.character_id === character_id) {
          setSelectedCharacter(null);
        }
      }
    } catch (err) {
      setError(`Failed to delete character: ${err.message}`);
    }
  };

  const handleCreateCharacter = () => {
    onRouteChange("create-character");
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
      {characters.length === 0 ? (
        <p>No characters found.</p>
      ) : (
        characters.map((character) => (
          <CharacterCard
            key={character.character_id}
            character={character}
            onRemove={handleRemoveCharacter}
            onSelect={() => setSelectedCharacter(character)}
          />
        ))
      )}
      <button onClick={handleCreateCharacter}>Create New Character</button>
    </section>
  );
}

export default CharacterList;
