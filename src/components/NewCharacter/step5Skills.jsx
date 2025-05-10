import { getAllSkills } from "../../utils/skills";
import { useEffect, useState } from "react";
import { useCharacterContext } from "../../context/CharacterContext";

function SelectSkills({ onNext, back }) {
  const { character, updateCharacter } = useCharacterContext();
  const [skills, setSkills] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchSkills() {
      try {
        const arraySkills = await getAllSkills();
        setSkills(arraySkills);
        console.log("Fetched skills:", arraySkills);
      } catch (error) {
        console.error("Error loading skills:", error);
        setError("Failed to load skills. Please try again.");
      }
    }
    fetchSkills();
  }, []);

  const handleSkillsSelection = (e) => {
    const selectedSkillId = parseInt(e.target.value, 10);
    if (isNaN(selectedSkillId)) return;

    const selectedSkill = skills.find((s) => s.skill_id === selectedSkillId);
    if (!selectedSkill) return;

    const currentSkills = character.skills || [];

    const isAlreadySelected = currentSkills.some(
      (s) => s.skill_id === selectedSkillId
    );

    if (isAlreadySelected) {
      updateCharacter(
        "skills",
        currentSkills.filter((s) => s.skill_id !== selectedSkillId)
      );
    } else {
      updateCharacter("skills", [...currentSkills, selectedSkill]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!character.skills || character.skills.length === 0) {
      setError("Please select at least one skill before proceeding.");
      return;
    }
    onNext();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Select Your Skills</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {skills.map((skill) => (
        <div key={skill.skill_id}>
          <label>{skill.name}</label>
          <input
            type="checkbox"
            value={skill.skill_id}
            checked={character.skills?.some(
              (s) => s.skill_id === skill.skill_id
            )}
            onChange={handleSkillsSelection}
          />
        </div>
      ))}
      <button type="button" onClick={back}>
        Back
      </button>

      <button type="submit" disabled={isLoading}>
        {isLoading ? "Saving..." : "Next"}
      </button>
    </form>
  );
}

export default SelectSkills;
