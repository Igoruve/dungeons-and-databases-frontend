import { useEffect, useState } from "react";
import { useCharacterContext } from "../../context/CharacterContext";
import { getAllSpecies } from "../../utils/species";

function SelectSpecies({ onNext, back }) {
  const { updateCharacter, character } = useCharacterContext();
  const [species, setSpecies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedSpecies, setSelectedSpecies] = useState(null);

  useEffect(() => {
    async function fetchSpecies() {
      try {
        const arraySpecies = await getAllSpecies();
        setSpecies(arraySpecies);
        console.log("Species fetched:", arraySpecies);
      } catch (error) {
        console.error("Error loading species:", error);
        setError("Failed to load species. Please try again.");
      }
    }
    fetchSpecies();
  }, []);

  const handleSpeciesSelection = (e) => {
    const selectedSpeciesId = Number(e.target.value);
    console.log("Selected species ID:", selectedSpeciesId);
    const selectedSpec = species.find(
      (spec) => spec.species_id === selectedSpeciesId
    );
    if (selectedSpec) {
      setSelectedSpecies(selectedSpec);
      updateCharacter("species", {
        name: selectedSpec.name,
        creature_type: selectedSpec.creature_type,
      });
      setError(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Character species before submit:", character.species);
    if (!character.species || !character.species.name) {
      setError("Please select a species before proceeding.");
      return;
    }
    onNext();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Select a Species</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <select onChange={handleSpeciesSelection} defaultValue="">
        <option value="" disabled>
          Select a Species
        </option>
        {species.map((spec) => (
          <option key={spec.species_id} value={spec.species_id}>
            {spec.name}
          </option>
        ))}
      </select>

      <button type="button" onClick={back}>
        Back
      </button>

      <button type="submit" disabled={isLoading}>
        {isLoading ? "Saving..." : "Next"}
      </button>
    </form>
  );
}

export default SelectSpecies;
