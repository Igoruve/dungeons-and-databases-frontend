import CharacterCard from "../CharacterCard/CharacterCard";
import { useEffect, useState } from "react";
import { getCharactersByUserId } from "../../utils/character";
import { deletCharacter } from "../../utils/character";
import CharacterCardExtended from "../CharacterCardExtended/CharacterCardExtended";
import { getUser } from "../../utils/localStorage";

function CharacterList({ onRouteChange }) {
  const [characters, setCharacters] = useState([]);
  const [error, setError] = useState(null);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [debugInfo, setDebugInfo] = useState({});

  useEffect(() => {
    handleLoadCharacters();
  }, []);

  const handleLoadCharacters = async () => {
    setLoading(true);
    try {
      // Get user information
      const user = getUser();
      console.log("User from localStorage:", user);
      
      setDebugInfo(prev => ({ ...prev, user }));
      
      if (!user) {
        console.log("No user found in localStorage, redirecting to login");
        onRouteChange("login");
        setLoading(false);
        return;
      }
      
      // Fetch characters
      console.log(`Fetching characters for user ID: ${user.user_id}`);
      const data = await getCharactersByUserId(user.user_id);
      console.log("API response for characters:", data);
      
      setDebugInfo(prev => ({ ...prev, apiResponse: data }));
      
      if (data.error) {
        console.error("Error from API:", data.error, "Status:", data.status);
        if (data.status === 401) {
          console.log("Unauthorized (401), redirecting to login");
          onRouteChange("login");
        } else {
          setError(`Error loading characters: ${data.error}`);
        }
      } else {
        // Check if data is an array before setting it
        if (Array.isArray(data)) {
          console.log(`Found ${data.length} characters`);
          setCharacters(data);
        } else {
          console.error("Expected array but got:", typeof data, data);
          setError("Invalid data format received from server");
          setCharacters([]);
        }
      }
    } catch (err) {
      console.error("Exception occurred:", err);
      setError(`Failed to load characters: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveCharacter = async (character_id) => {
    try {
      console.log(`Attempting to delete character with ID: ${character_id}`);
      const response = await deletCharacter(character_id);
      
      if (response.error) {
        console.error("Error deleting character:", response.error);
        setError(`Error deleting character: ${response.error}`);
      } else {
        console.log("Character deleted successfully");
        const newCharacters = characters.filter(
          (character) => character.character_id !== character_id
        );
        setCharacters(newCharacters);
        
        if (selectedCharacter && selectedCharacter.character_id === character_id) {
          setSelectedCharacter(null);
        }
      }
    } catch (err) {
      console.error("Exception during character deletion:", err);
      setError(`Failed to delete character: ${err.message}`);
    }
  };

  const handleCreateCharacter = () => {
    onRouteChange("create-character");
  };

  if (loading) {
    return <div className="p-4">Loading characters...</div>;
  }

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
      {error && <p style={{ color: "red" }}>{error}</p>}
      
      {characters.length === 0 && !loading ? (
        <div>
          <p>No characters found. {JSON.stringify(debugInfo)}</p>
        </div>
      ) : (
        characters.map((character) => (
          <CharacterCard
            character={character}
            key={character.character_id}
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