import { useState } from "react";

function NotesCardExtended({ notes, onSelect, onRemove, onChange }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState(notes.description);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleDeleteNote = () => {
    setShowConfirmModal(true);
  };

  const handleDeleteConfirm = async () => {
    const error = await onRemove(notes.notes_id);
    if (!error) {
      onSelect(null);
    }
    setShowConfirmModal(false);
  };

  const handleCancel = () => {
    setShowConfirmModal(false);
  };

  const handleEditNote = async () => {
    const error = await onChange(notes.notes_id, {
      description: editedDescription,
    });
    if (!error) {
      setIsEditing(false);
    }
  };

  const handleDescriptionChange = (e) => {
    const newValue = e.target.value;
    const textarea = e.target;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
    setEditedDescription(newValue);
  };

  const handleDelete = () => {
    onRemove(notes.notes_id);
    setShowConfirmModal(false);
  };

  return (
    <article className="article-card-extended">
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
      </button>
      <section className="section-card-extended">
        <div className="div-card-extended">
          <h1 className="text-zinc-900 dark:text-zinc-100 text-2xl pb-2">
            {notes.title}
          </h1>
          <p className="par-card-extended">
            {new Date(notes.created_at).toLocaleDateString("es-ES")}
          </p>
        </div>
        {isEditing ? (
          <textarea
            value={editedDescription}
            onChange={handleDescriptionChange}
            name="description"
            placeholder="Enter a description"
            id="description"
            required
            className="edit-form-input"
          >
            {notes.description}
          </textarea>
        ) : (
          <p className="par mb-20">{notes.description}</p>
        )}
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-red-500 backdrop-blur-sm rounded-full flex flex-row justify-center px-2 py-2 mb-4 mt-2 shadow-md w-fit fixed right-8 bottom-24"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="white"
            >
              <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
            </svg>
          </button>
        ) : (
          <div className="flex flex-row">
            <button
              onClick={() => {
                setIsEditing(false);
                setEditedDescription(notes.description);
              }}
              className="flex flex-row justify-center px-2 py-2 mb-4 mt-2 text-zinc-900 dark:text-zinc-100 fixed bottom-24 left-8 shadow-md"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="32px"
                viewBox="0 -960 960 960"
                width="32px"
                fill="#ef4444"
              >
                <path d="m336-280 144-144 144 144 56-56-144-144 144-144-56-56-144 144-144-144-56 56 144 144-144 144 56 56ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
              </svg>
            </button>
            <button
              onClick={handleEditNote}
              className="flex flex-row justify-center px-2 py-2 mb-4 mt-2 text-zinc-900 dark:text-zinc-100 fixed bottom-24 right-8 shadow-md"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="32px"
                viewBox="0 -960 960 960"
                width="32px"
                fill="#ef4444"
              >
                <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
              </svg>
            </button>
          </div>
        )}
        {!isEditing && (
          <button
            className="flex flex-row justify-center px-2 py-2 text-zinc-900 dark:text-zinc-100 shadow-md w-fit fixed right-8 top-8"
            onClick={handleDeleteNote}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#ef4444"
            >
              <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
            </svg>
          </button>
        )}
      </section>

      {showConfirmModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-10 px-4">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-lg font-semibold text-zinc-800">
              Confirmation
            </h3>
            <p className="mt-2 text-zinc-600">Are you sure?</p>
            <div className="mt-4 flex justify-end gap-4">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-2xl"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                className="delete-confirm-button"
                onClick={handleDeleteConfirm}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}

export default NotesCardExtended;
