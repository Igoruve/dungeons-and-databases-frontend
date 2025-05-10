import { useState } from "react";
import { useCharacterContext } from "../../context/CharacterContext";

function SelectStats({ onNext, back }) {
  const { character, updateCharacter } = useCharacterContext();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleStatsSelection = (e) => {
    const statName = e.target.name;
    const statValue = Number(e.target.value);
    console.log(`Handling stat change for ${statName}:`, statValue);
    if (statValue < 1 || statValue > 30) {
      setError("Stat value must be between 1 and 30.");
      console.log("Error: Stat value out of range");
      return;
    }

    console.log("Current stats before update:", character.stats);

    updateCharacter("stats", {
      ...character.stats,
      [statName]: statValue,
    });
    console.log("Updated stats:", character.stats);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    console.log("Submitting stats:", character.stats);

    onNext();
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Allocate Your Stats</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div>
        <label htmlFor="STR">Strength (STR)</label>
        <input
          type="number"
          id="STR"
          name="STR"
          min={1}
          max={30}
          value={character.stats.STR || ""}
          onChange={handleStatsSelection}
        />
      </div>

      <div>
        <label htmlFor="DEX">Dexterity (DEX)</label>
        <input
          type="number"
          id="DEX"
          name="DEX"
          min={1}
          max={30}
          value={character.stats.DEX || ""}
          onChange={handleStatsSelection}
        />
      </div>

      <div>
        <label htmlFor="CON">Constitution (CON)</label>
        <input
          type="number"
          id="CON"
          name="CON"
          min={1}
          max={30}
          value={character.stats.CON || ""}
          onChange={handleStatsSelection}
        />
      </div>

      <div>
        <label htmlFor="WIS">Wisdom (WIS)</label>
        <input
          type="number"
          id="WIS"
          name="WIS"
          min={1}
          max={30}
          value={character.stats.WIS || ""}
          onChange={handleStatsSelection}
        />
      </div>

      <div>
        <label htmlFor="INT">Intelligence (INT)</label>
        <input
          type="number"
          id="INT"
          name="INT"
          min={1}
          max={30}
          value={character.stats.INT || ""}
          onChange={handleStatsSelection}
        />
      </div>

      <div>
        <label htmlFor="CHA">Charisma (CHA)</label>
        <input
          type="number"
          id="CHA"
          name="CHA"
          min={1}
          max={30}
          value={character.stats.CHA || ""}
          onChange={handleStatsSelection}
        />
      </div>

      <button type="button" onClick={back}>
        Back
      </button>

      <button type="submit" disabled={isLoading}>
        {isLoading ? "Saving..." : "Next"}
      </button>
    </form>
  );
}

export default SelectStats;
