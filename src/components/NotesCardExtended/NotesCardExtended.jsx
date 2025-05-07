import { useState, useEffect } from "react";

function NotesCardExtended({ notes, onRemove, onSelect }) {
  return (
    <article className="article-card-extended">
      <section className="section-card-extended">
        <button className="back-button" onClick={() => onSelect()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="currentColor"
          >
            <path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" />
          </svg>
          Back
        </button>
        <h2 className="text-zinc-800 text-xl font-bold py-4">{notes.title}</h2>
        <p className="par-low-opacity">
          <strong>Creation Date:</strong>{" "}
          {new Date(notes.created_at).toLocaleDateString("es-ES")}
        </p>
        <p className="par">{notes.description}</p>
        <button className="border border-red-500 rounded-md flex flex-row justify-center px-4 py-2 mb-4 mt-2">
          Edit Note
        </button>
        <button
          className="border border-red-500 rounded-md flex flex-row justify-center px-4 py-2 mb-4"
          onClick={() => onRemove(character.character_id)}
        >
          Delete
        </button>
      </section>
    </article>
  );
}

export default NotesCardExtended;
