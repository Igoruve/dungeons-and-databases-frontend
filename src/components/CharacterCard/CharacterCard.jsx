function CharacterCard({ character, onRemove, onSelect }) {
  const baseButtonClasses =
    "w-full text-white text-center flex flex-col justify-center items-center";
  return (
    <article className="w-full content-start">
      <section className="w-100 bg-[--primary-bg-color] px-4 py-3 mx-4 flex flex-row min-h-40 gap-4 rounded-md">
        <div className="flex flex-col flex-1">
          <h2 className="text-white text-lg">
            <strong>{character.first_name} {character.last_name}</strong>
          </h2>
          <p className="text-white text-opacity-70">
            <strong>Level:</strong> {character.level}
          </p>
          <p className="text-white text-opacity-70">
            <strong>Species:</strong> {character.species[0].name}
          </p>
          <p className="text-white text-opacity-70">
            <strong>Class:</strong> {character.class[0].name}
          </p>
        </div>
        <div className="flex flex-col items-end justify-start">
          <button
            className={`${baseButtonClasses} text-[var(--accent-color)] text-4xl pb-4 px-4 font-bold`}
            onClick={() => onSelect()}
          >
            +
          </button>
        </div>
      </section>
    </article>
  );
}

export default CharacterCard;
