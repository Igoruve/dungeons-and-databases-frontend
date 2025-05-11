import { useEffect, useState } from "react";
import { useCharacterContext } from "../../context/CharacterContext";
import { getAllSpecies } from "../../utils/species";

function SelectSpecies({ onNext, back }) {
  const { updateCharacter, character } = useCharacterContext(); 
  const [species, setSpecies] = useState([]);
  const [error, setError] = useState(null);

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
    const selectedSpecies = species.find(
      (spec) => spec.species_id === selectedSpeciesId
    );

    if (!selectedSpecies) {
      console.error("Selected species not found:", selectedSpeciesId);
      alert("The selected species is invalid. Please try again.");
      return;
    }

    updateCharacter("species", {
      id: selectedSpecies.species_id,
      name: selectedSpecies.name,
      creature_type: selectedSpecies.creature_type,
    });

    console.log("Updated species in context:", {
      id: selectedSpecies.species_id,
      name: selectedSpecies.name,
      creature_type: selectedSpecies.creature_type,
    }); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Character object before proceeding:", character); 
    if (!character.species || !character.species.id) {
      setError("Please select a species before proceeding.");
      return;
    }

    onNext();
  };

  return (
    <section className="section-card-extended">
      <form onSubmit={handleSubmit} className="form-create-character">
        <h2 className="h2-card">Select a Species</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <select
          onChange={handleSpeciesSelection}
          defaultValue=""
          className="form-input"
        >
          <option value="" disabled>
            Select a Species
          </option>
          {species.map((spec) => (
            <option key={spec.species_id} value={spec.species_id}>
              {spec.name}
            </option>
          ))}
        </select>
        <div className="button-group">
          <button type="button" onClick={back} className="form-button-secondary">
            Back
          </button>

          <button type="submit" className="form-button">
            Next
          </button>
        </div>
      </form>
    </section>
  );
}

export default SelectSpecies;
