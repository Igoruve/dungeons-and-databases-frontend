import { useEffect, useState } from "react";
import { useCharacterContext } from "../../context/CharacterContext";
import { getAllClasses } from "../../utils/classes";

function SelectClass({ onNext, back }) {
  const { updateCharacter } = useCharacterContext();
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchClasses() {
      try {
        const arrayClasses = await getAllClasses();
        setClasses(arrayClasses);
        console.log("Classes fetched:", arrayClasses);
      } catch (error) {
        console.error("Error loading classes:", error);
        setError("Failed to load classes. Please try again.");
      }
    }
    fetchClasses();
  }, []);

  const handleClassSelection = (e) => {
    const selectedClassId = Number(e.target.value);
    const selectedClass = classes.find(
      (charClass) => charClass.class_id === selectedClassId
    );
    if (selectedClass) {
      setSelectedClass(selectedClass);
      updateCharacter("class", {
        name: selectedClass.name,
        description: selectedClass.description,
      });
      setError(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedClass) {
      setError("Please select a class before proceeding.");
      return;
    }
    onNext();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Select a Class</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <select onChange={handleClassSelection} defaultValue="">
        <option value="" disabled>
          Select a Class
        </option>
        {classes.map((charClass) => (
          <option key={charClass.class_id} value={charClass.class_id}>
            {charClass.name}
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

export default SelectClass;
