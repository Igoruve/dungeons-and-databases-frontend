import NotesCard from "../Notes/NotesCard";
import { useEffect, useState } from "react";
import { getAllNotes, deleteNotes, getNotesByUserId } from "../../utils/notes";
import NotesCardExtended from "../NotesCardExtended/NotesCardExtended";
import { getUser } from "../../utils/localStorage";

function NotesList(onRouteChange) {
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);

  useEffect(() => {
    handleLoadNotes();
  }, []);

  const handleLoadNotes = async () => {
    try {
      const user = getUser();
      if (!user) {
        onRouteChange("login");
        return;
      }
      const data = await getNotesByUserId(user.user_id);
      console.log(data);
      if (data.error) {
        if (data.status === 401) {
          onRouteChange("login");
        } else {
          setError(`Error loading notes: ${data.error}`);
        }
      } else if (Array.isArray(data)) {
        setNotes(data);
      } else {
        setError("Invalid data format received from server");
        setNotes([]);
      }
    } catch (err) {
      console.error("Exception occurred:", err);
      setError(`Failed to load notes: ${err.message}`);
    }
  };

  const handleRemoveNote = async (notes_id) => {
    try {
      const response = await deleteNotes(notes_id);
      if (response.error) {
        setError(`Error deleting note: ${response.error}`);
      } else {
        setNotes(notes.filter((note) => note.notes_id !== notes_id));
        if (selectedNote?.note_id === notes_id) {
          setSelectedNote(null);
        }
      }
    } catch (err) {
      setError(`Failed to delete note: ${err.message}`);
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
    </section>
  );
}

export default NotesList;
