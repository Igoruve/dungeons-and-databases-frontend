function CharacterCard({ character, onRemove, onSelect }) {
  return (
    <article className="w-full content-start">
      <section className="bg-zinc-200 dark:bg-zinc-800 px-4 py-3 mx-4 flex flex-row min-h-40 gap-4 rounded-md shadow-md">
        <div className="div-card">
          <h2 className="h2-card text-zinc-900 dark:text-zinc-100">
            <strong>
              {character.first_name} {character.last_name}
            </strong>
          </h2>
          <p className="par-low-opacity text-zinc-800 dark:text-zinc-200">
            <strong>Level:</strong> {character.level}
          </p>
          <p className="par-low-opacity text-zinc-800 dark:text-zinc-200">
            <strong>Species:</strong> {character.species[0].name}
          </p>
          <p className="par-low-opacity text-zinc-800 dark:text-zinc-200">
            <strong>Class:</strong> {character.class[0].name}
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
}

export default CharacterCard;
