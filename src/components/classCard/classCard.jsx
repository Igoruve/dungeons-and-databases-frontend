function ClassCard({ data }) {
  const baseButtonClasses =
    "w-full text-white text-xs py-2 text-center flex flex-col justify-center items-center";
  return (
    <article>
      <section className="w-100 flex flex-row h-40 gap-4 border-gray-500 border-t-2">
        <div className="flex flex-col flex-1">
          <h2 className="text-white text-lg py-4">{data.name}</h2>
          <p className="text-white text-opacity-70">{data.description}</p>
        </div>
        <div className="flex flex-col items-end justify-center">
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

export default ClassCard;
