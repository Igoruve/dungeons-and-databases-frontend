import { useEffect, useState, useContext } from "react";
import CharacterCard from "../CharacterCard/CharacterCard";
import { getCharactersByUserId, deleteCharacter } from "../../utils/character";
import CharacterCardExtended from "../CharacterCardExtended/CharacterCardExtended";
import { AuthContext } from "../../context/AuthContext";
import RouteContext from "../../context/RouterContext";

function CharacterList() {
  const [characters, setCharacters] = useState([]);
  const [error, setError] = useState(null);
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  const { userData } = useContext(AuthContext);
  const { onRouteChange } = useContext(RouteContext);

  useEffect(() => {
    if (!userData) {
      onRouteChange("login");
    } else {
      handleLoadCharacters();
    }
  }, [userData, onRouteChange]);

  const handleLoadCharacters = async () => {
    try {
      if (!userData) {
        onRouteChange("login");
        return;
      }
      const data = await getCharactersByUserId(userData.user_id);
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
        setCharacters(
          characters.filter((char) => char.character_id !== character_id)
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
    <section className="flex flex-col space-y-4 py-10 bg-[--dark-bg-color] h-screen">
      <h2 className="absolute text-white top-0 left-0 right-0 text-center py-4">
        My Characters
      </h2>
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
      <button className="bottom-0" onClick={handleCreateCharacter}>Create New Character</button>
    </section>
  );
}

export default CharacterList;
