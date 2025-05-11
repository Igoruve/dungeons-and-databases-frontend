const CharacterCard = ({ character, onRemove, onSelect }) => {
  const className =
    character.class && character.class[0]
      ? character.class[0].name
      : "Unknown Class";
  const speciesName =
    character.species && character.species[0]
      ? character.species[0].name
      : "Unknown Species";
  const skillNames =
    character.skill && character.skill.length > 0
      ? character.skill.map((s) => s.name).join(", ")
      : "No Skills";

  return (
    <article className="w-full content-start">
      <section className="bg-zinc-200 dark:bg-zinc-700 px-4 py-3 mx-4 flex flex-row min-h-40 gap-4 rounded-md shadow-md">
        <div className="div-card" onClick={() => onSelect()}>
          <h2 className="h2-card text-zinc-900 dark:text-zinc-100">
            <strong>
              {character.first_name} {character.last_name}
            </strong>
          </h2>
          <p className="par-low-opacity text-zinc-800 dark:text-zinc-200">
            {className} {speciesName} Level {character.level}
          </p>
        </div>
        <div className="flex flex-col items-end justify-start">
          <button className="button-card" onClick={() => onSelect()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="32px"
              viewBox="0 -960 960 960"
              width="32px"
              fill="#ef4444"
            >
              <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" />
            </svg>
          </button>
        </div>
      </section>
    </article>
  );
};

export default CharacterCard;
