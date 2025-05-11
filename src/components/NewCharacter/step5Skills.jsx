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
      (s) => s.id === selectedSkillId
    );

    if (isAlreadySelected) {
      // Si ya está seleccionado, lo eliminamos (proficiency: 0)
      updateCharacter(
        "skills",
        currentSkills.filter((s) => s.id !== selectedSkillId)
      );
    } else {
      // Si no está seleccionado, lo agregamos con `proficiency: 1`
      updateCharacter("skills", [
        ...currentSkills,
        {
          id: selectedSkill.skill_id,
          name: selectedSkill.name, // agregar esto
          proficiency: 1,
        },
      ]);
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
    <section className="section-card-extended">
      <form onSubmit={handleSubmit} className="form-create-character">
        <h2 className="h2-card">Select Your Skills</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {skills.map((skill) => (
          <div
            key={skill.skill_id}
            className="grid grid-cols-[auto,1fr] items-center gap-x-4 py-2"
          >
            {/* Checkbox invisible */}
            <input
              type="checkbox"
              value={skill.skill_id}
              checked={character.skills?.some((s) => s.id === skill.skill_id)}
              onChange={handleSkillsSelection}
              id={`skill-checkbox-${skill.skill_id}`}
              className="hidden"
            />

            {/* Checkbox visual personalizado */}
            <label
              htmlFor={`skill-checkbox-${skill.skill_id}`}
              className="w-6 h-6 cursor-pointer border-2 border-gray-500 rounded-lg bg-zinc-50 dark:bg-zinc-600 flex items-center justify-center"
            >
              <span
                className={`w-4 h-4 rounded-sm transition-all ${
                  character.skills?.some((s) => s.id === skill.skill_id)
                    ? "bg-red-500"
                    : "bg-transparent border"
                }`}
              ></span>
            </label>

            {/* Label de texto */}
            <label
              htmlFor={`skill-checkbox-${skill.skill_id}`}
              className="text-zinc-900 dark:text-zinc-100 cursor-pointer"
            >
              {skill.name}
            </label>
          </div>
        ))}

        <div className="button-group">
          <button type="button" onClick={back} className="form-button">
            Back
          </button>

          <button type="submit" disabled={isLoading} className="form-button">
            {isLoading ? "Saving..." : "Next"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default SelectSkills;
