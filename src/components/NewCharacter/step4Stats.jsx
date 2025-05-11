import { useState, useEffect } from "react";
import { useCharacterContext } from "../../context/CharacterContext";

const defaultStats = [
  { name: "STR", value: 10 },
  { name: "DEX", value: 10 },
  { name: "CON", value: 10 },
  { name: "INT", value: 10 },
  { name: "WIS", value: 10 },
  { name: "CHA", value: 10 },
];

function SelectStats({ onNext, back }) {
  const { character, updateCharacter } = useCharacterContext();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [localStats, setLocalStats] = useState(defaultStats);

  useEffect(() => {
    if (Array.isArray(character.stats) && character.stats.length > 0) {
      setLocalStats(character.stats);
    }
  }, []);

  const handleStatsSelection = (e) => {
    const statName = e.target.name;
    const statValue = Number(e.target.value);

    if (statValue < 1 || statValue > 30) {
      setError("Stat value must be between 1 and 30.");
      return;
    }

    setError(null);
    setLocalStats((prev) =>
      prev.map((s) => (s.name === statName ? { ...s, value: statValue } : s))
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    for (const stat of localStats) {
      if (!stat.value || stat.value < 1) {
        setError(`Please set a valid value for ${stat.name}`);
        return;
      }
    }

    setIsLoading(true);
    setError(null);

    updateCharacter("stats", localStats);
    onNext();
    setIsLoading(false);
  };

  return (
    <section className="section-card-extended">
    <form onSubmit={handleSubmit} className="form-create-character">
      <h2 className="h2-card">Allocate Your Stats</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {localStats.map((stat) => (
        <div key={stat.name}>
          <label htmlFor={stat.name} className="text-zinc-900 dark:text-zinc-100">{stat.name}</label>
          <input 
            className="form-input"
            type="number"
            id={stat.name}
            name={stat.name}
            min={1}
            max={30}
            value={stat.value}
            onChange={handleStatsSelection}
            required
          />
        </div>
      ))}

      <div className="button-group">
        <button type="button" onClick={back} className="form-button-secondary">
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

export default SelectStats;
