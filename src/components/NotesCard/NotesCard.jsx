function NotesCard({ notes, onSelect, onRemove }) {
  return (
    <article>
      <section>
        <h2>{notes.title}</h2>
        <p>Creation date: {new Date(notes.created_at).toLocaleDateString("es-ES")}</p>
      </section>
      <button onClick={() => onSelect()}>+ INFO</button>
      <button>Edit Note</button>
      <button onClick={() => onRemove(notes.notes_id)}>Delete</button>
    </article>
  );
}

export default NotesCard;
