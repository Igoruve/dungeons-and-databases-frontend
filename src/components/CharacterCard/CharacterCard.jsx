function CharacterCard({ character, onRemove, onSelect }) {
  const baseButtonClasses =
    "w-full text-white text-xs py-2 text-center flex flex-col justify-center items-center";
  return (
    <article className="w-full content-start">
      <section className="w-100 bg-zinc-900 px-4 py-3 mx-4 flex flex-row min-h-40 gap-4 rounded-md">
        <div className="flex flex-col flex-1">
          <h2 className="text-white text-lg">
            {character.first_name} {character.last_name}
          </h2>
          <p className="text-white text-opacity-70">Level: {character.level}</p>
          <p className="text-white text-opacity-70">
            Species: {character.species[0].name}
          </p>
          <p className="text-white text-opacity-70">
            Class: {character.class[0].name}
          </p>
        </div>
        <div className="flex flex-col items-end">
          <button className={`${baseButtonClasses}`} onClick={() => onSelect()}>
            More Info.
          </button>
          <button className={`${baseButtonClasses}`}>Edit</button>
          <button
            className={`${baseButtonClasses}`}
            onClick={() => onRemove(character.character_id)}
          >
            Delete
          </button>
        </div>
      </section>
    </article>
  );
}

export default CharacterCard;
