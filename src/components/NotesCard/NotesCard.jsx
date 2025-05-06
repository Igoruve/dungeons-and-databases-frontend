function NotesCard({ notes, onSelect, onRemove }) {
  const baseButtonClasses =
    "w-full text-white text-xs py-2 text-center flex flex-col justify-center items-center";
  return (
    <article className="w-full content-start">
      <section className="w-100 bg-zinc-900 px-4 py-3 mx-4 flex flex-row min-h-40 gap-4 rounded-md">
        <div className="flex flex-col flex-1">
          <h2 className="text-white text-lg">{notes.title}</h2>
          <p className="text-white text-opacity-70">
            Creation date:{" "}
            {new Date(notes.created_at).toLocaleDateString("es-ES")}
          </p>
        </div>
        <div className="flex flex-col items-end">
          <button className={`${baseButtonClasses}`} onClick={() => onSelect()}>
            More Info.
          </button>
          <button className={`${baseButtonClasses}`}>Edit</button>
          <button
            className={`${baseButtonClasses}`}
            onClick={() => onRemove(notes.notes_id)}
          >
            Delete
          </button>
        </div>
      </section>
    </article>
  );
}

export default NotesCard;
