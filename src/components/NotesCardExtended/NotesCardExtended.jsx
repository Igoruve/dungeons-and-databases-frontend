import { useState, useEffect } from "react";

function NotesCardExtended({ notes, onRemove, onSelect }) {
  const baseButtonClasses =
    "w-full text-white py-2 flex flex-col justify-start items-start";
  return (
    <article className="bg-[--dark-bg-color] w-full content-start min-h-screen">
      <section className="w-100 bg-[--primary-bg-color] px-10 py-20 flex flex-col min-h-screen">
        <button
          className="text-white absolute left-10 top-10 flex flex-row"
          onClick={() => onSelect()}
        >
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
        <h2 className="text-white text-xl font-bold py-4">{notes.title}</h2>
        <p className="text-white py-2 text-opacity-70">
          <strong>Creation Date:</strong>{" "}
          {new Date(notes.created_at).toLocaleDateString("es-ES")}
        </p>
        <p className="text-white leading-relaxed">{notes.description}</p>
        <button>Edit Note</button>
        <button onClick={() => onRemove(character.character_id)}>Delete</button>
      </section>
    </article>
  );
}

export default NotesCardExtended;
