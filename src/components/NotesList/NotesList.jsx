import NotesCard from "../Notes/NotesCard";
import { useEffect, useState } from "react";
import { getAllNotes, deleteNotes } from "../../utils/notes";
import NotesCardExtended from "../NotesCardExtended/NotesCardExtended";

function NotesList(onRouteChange) {
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);

  useEffect(() => {
    handleLoadNotes();
  }, []);

  const handleLoadNotes = async () => {
    const data = await getAllNotes();
    if (data.error) {
      if (data.status === 401) {
        onRouteChange("login");
      } else {
        setError(data.error);
      }
    } else {
      setNotes(data);
    }
  };

  const handleRemoveNote = async (notes_id) => {
    const response = await deleteNotes(notes_id);
    if (response.error) {
    } else {
      const newNote = notes.filter((note) => note.notes_id !== notes_id);
      setNotes(newNote);
    }
  };

  if (selectedNote) {
    return (
      <NotesCardExtended
        notes={selectedNote}
        onRemove={handleRemoveNote}
        onSelect={() => setSelectedNote(null)}
      />
    );
  }

  return (
    <section>
      {error && <p>{error}</p>}
      {notes.map((notes) => {
        return (
          <NotesCard
            notes={notes}
            key={notes.notes_id}
            onRemove={handleRemoveNote}
            onSelect={() => setSelectedNote(notes)}
          />
        );
      })}
      <button>Create New Character</button>{" "}
      {/* TODO que el boton te lleve al
      formulario de crear personaje */}
    </section>
  );
}

export default NotesList;
