import { useCharacterContext } from "../../context/CharacterContext";
import { useContext } from "react";
import RouteContext from "../../context/RouterContext";

function FinalStep({ back, onFinish }) {
  const { character } = useCharacterContext();
  const { onRouteChange } = useContext(RouteContext); 

  if (!character) {
    return <p>Loading...</p>;
  }

  const handleFinish = () => {
    onRouteChange("characters");
  };

  return (
    <section>
      <h2>Review Your Character</h2>
      <div>
        <p>
          <strong>Name:</strong> {character.first_name} {character.last_name}
        </p>
        <p>
          <strong>Age:</strong> {character.age}
        </p>
        <p>
          <strong>Alignment:</strong> {character.alignment}
        </p>
        <p>
          <strong>Level:</strong> {character.level}
        </p>
        <p>
          <strong>Appearance:</strong> {character.appearance}
        </p>
        <p>
          <strong>Lore:</strong> {character.lore}
        </p>
        <p>
          <strong>Personality:</strong> {character.personality}
        </p>
        <p>
          <strong>Class:</strong> {character.class.name} -{" "}
          {character.class.description}
        </p>
        <p>
          <strong>Species:</strong> {character.species.name} -{" "}
          {character.species.creature_type}
        </p>
        <p>
          <strong>Items:</strong>
        </p>
        <ul>
          {(character.items || []).map((item) => (
            <li key={item.item_id}>
              {item.name} (Quantity: {item.quantity})
            </li>
          ))}
        </ul>
        <p>
          <strong>Stats:</strong>
        </p>
        <ul>
          {Object.entries(character.stats).map(([stat, value]) => (
            <li key={stat}>
              {stat}: {value}
            </li>
          ))}
        </ul>
        <p>
          <strong>Skills:</strong>{" "}
          {character.skills.map((s) => s.name).join(", ")}
        </p>
      </div>
      <div>
        {back && <button onClick={back}>Back</button>}
        <button onClick={handleFinish}>Finish</button>
      </div>
    </section>
  );
}

export default FinalStep;
