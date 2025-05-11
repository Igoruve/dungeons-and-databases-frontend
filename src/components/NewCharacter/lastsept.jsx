import { useCharacterContext } from "../../context/CharacterContext";
import { useContext } from "react";
import RouteContext from "../../context/RouterContext";
import { createCharacter } from "../../utils/character";
import { AuthContext } from "../../context/AuthContext";

function FinalStep({ back }) {
  const { character } = useCharacterContext();
  const { onRouteChange } = useContext(RouteContext);
  const { userData } = useContext(AuthContext);

  if (!character) {
    return <p className="par">Loading...</p>;
  }

  const handleFinish = async () => {
    try {
      if (!userData?.user_id) {
        alert("User data is not available. Please log in again.");
        return;
      }

      console.log("Character state before sending payload:", character);

      const statsArray = Array.isArray(character.stats)
        ? character.stats.map(({ name, value }) => ({
            name: name.toLowerCase(),
            value: Number(value) || 0,
          }))
        : [];

      const payload = {
        first_name: String(character.first_name).trim(),
        last_name: String(character.last_name).trim(),
        alignment: character.alignment || "Neutral",
        appearance: character.appearance || null,
        lore: character.lore || null,
        personality: character.personality || null,
        age: Number(character.age) || 0,
        level: Number(character.level) || 1,
        user_id: userData.user_id,
        class_id: character.class?.id || null,
        species_id: character.species?.id || null,
        items: Array.isArray(character.items)
          ? character.items.map((item) => ({
              id: item.item_id,
              quantity: Number(item.quantity),
            }))
          : [],
        skills: Array.isArray(character.skills)
          ? character.skills.map((skill) => ({
              id: skill.skill_id,
              proficiency: Number(skill.proficiency),
            }))
          : [],
        stats: statsArray,
        money: character.money || {},
      };

      console.log("Payload being sent to backend:", payload);

      const createdCharacter = await createCharacter(payload);

      onRouteChange("characters");
    } catch (error) {
      console.error("Error creating character:", error);
      alert("There was an error creating the character. Please try again.");
    }
  };

  return (
    <section className="section-card-extended">
      <h2 className="h2-card">Review Your Character</h2>
      <div className="space-y-4 mt-4">
        <p className="par">
          <strong>Name:</strong> {character.first_name} {character.last_name}
        </p>
        <p className="par">
          <strong>Age:</strong> {character.age}
        </p>
        <p className="par">
          <strong>Alignment:</strong> {character.alignment}
        </p>
        <p className="par">
          <strong>Level:</strong> {character.level}
        </p>
        <p className="par">
          <strong>Appearance:</strong> {character.appearance}
        </p>
        <p className="par">
          <strong>Lore:</strong> {character.lore}
        </p>
        <p className="par">
          <strong>Personality:</strong> {character.personality}
        </p>
        <p className="par">
          <strong>Class:</strong> {character.class?.name} -{" "}
          {character.class?.description}
        </p>
        <p className="par">
          <strong>Species:</strong> {character.species?.name} -{" "}
          {character.species?.creature_type}
        </p>

        <div>
          <p className="par">
            <strong>Items:</strong>
          </p>
          {character.items.length > 0 ? (
            <ul className="list-disc pl-5 space-y-1">
              {character.items.map((item) => (
                <li key={item.item_id} className="par">
                  {item.name} (Quantity: {item.quantity})
                </li>
              ))}
            </ul>
          ) : (
            <p className="par">None</p>
          )}
        </div>

        <div>
          <p className="par">
            <strong>Stats:</strong>
          </p>
          <ul className="list-disc pl-5 space-y-1">
            {Array.isArray(character.stats) && character.stats.length > 0 ? (
              character.stats.map((stat) => (
                <li key={stat.name} className="par">
                  {stat.name}: {stat.value}
                </li>
              ))
            ) : (
              <li className="par">No stats assigned</li>
            )}
          </ul>
        </div>

        <p className="par">
          <strong>Skills:</strong>{" "}
          {character.skills.length > 0
            ? character.skills.map((s) => s.name).join(", ")
            : "None"}
        </p>
      </div>

      <div className="button-group mt-6">
        {back && (
          <button onClick={back} className="form-button-secondary w-1/2">
            Back
          </button>
        )}
        <button onClick={handleFinish} className="form-button w-1/2">
          Finish
        </button>
      </div>
    </section>
  );
}

export default FinalStep;
