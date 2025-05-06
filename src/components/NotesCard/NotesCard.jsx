function NotesCard({ notes, onSelect, onRemove }) {
  const baseButtonClasses =
    "w-full text-white py-2 text-center flex flex-col justify-center items-center";
  return (
    <article className="w-full content-start">
      <section className="w-100 bg-[--primary-bg-color] px-4 py-3 mx-4 flex flex-row min-h-40 gap-4 rounded-md">
        <div className="flex flex-col flex-1">
          <h2 className="text-white text-lg"><strong>{notes.title}</strong></h2>
          <p className="text-white text-opacity-70">
            <strong>Creation date:</strong>{" "}
            {new Date(notes.created_at).toLocaleDateString("es-ES")}
          </p>
        </div>
        <div className="flex flex-col items-end">
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

export default NotesCard;
