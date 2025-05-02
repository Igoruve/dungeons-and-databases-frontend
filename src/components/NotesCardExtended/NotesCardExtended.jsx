import { useState, useEffect } from "react";

function NotesCardExtended({ notes, onRemove, onSelect }) {
  return (
    <article>
      <section>
        <h1>{notes.title}</h1>
        <p>
          Creation Date:{" "}
          {new Date(notes.created_at).toLocaleDateString("es-ES")}
        </p>
        <p>{notes.description}</p>
      </section>
      <button onClick={() => onSelect()}>Back</button>
      <button>Edit Note</button>
      <button onClick={() => onRemove(character.character_id)}>Delete</button>
    </article>
  );
}

export default NotesCardExtended;
