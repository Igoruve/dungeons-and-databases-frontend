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
        id: selectedClass.class_id, 
        name: selectedClass.name,
        description: selectedClass.description,
      });
      setError(null);
      console.log("Selected class:", selectedClass);
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
    <section className="section-card-extended">
      <form onSubmit={handleSubmit} className="form-create-character">
        <h2 className="h2-card">Select a Class</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <select
          className="form-input"
          onChange={handleClassSelection}
          defaultValue=""
        >
          <option value="" disabled>
            Select a Class
          </option>
          {classes.map((charClass) => (
            <option key={charClass.class_id} value={charClass.class_id}>
              {charClass.name}
            </option>
          ))}
        </select>
        <div className="button-group">
          <button className="form-button-secondary" type="button" onClick={back}>
            Back
          </button>
          <button className="form-button" type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : "Next"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default SelectClass;
