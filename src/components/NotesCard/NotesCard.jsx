import { useState } from "react";

function NotesCard({ notes, onSelect, onRemove }) {
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleDelete = () => {
    onRemove(notes.notes_id);
    setShowConfirmModal(false);
  };

  const handleCancel = () => {
    setShowConfirmModal(false);
  };

  return (
    <article className="w-full content-start">
      <section className="bg-zinc-200 dark:bg-zinc-700 px-4 py-3 mx-4 flex flex-row min-h-40 gap-4 rounded-md shadow-md">
        <div className="div-card" onClick={() => onSelect()}>
          <h2 className="h2-card text-zinc-900 dark:text-zinc-100">
            <strong>{notes.title}</strong>
          </h2>
          <p className="par-low-opacity text-zinc-800 dark:text-zinc-200">
            Creation date:
            {new Date(notes.created_at).toLocaleDateString("es-ES")}
          </p>
        </div>
        <div className="flex flex-row items-start">
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

export default NotesCard;
