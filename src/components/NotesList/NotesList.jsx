import NotesCard from "../NotesCard/NotesCard";
import { useEffect, useState, useContext } from "react";
import { getNotesByUserId, deleteNotes } from "../../utils/notes";
import NotesCardExtended from "../NotesCardExtended/NotesCardExtended";
import { AuthContext } from "../../context/AuthContext"; // Importar AuthContext
import RouteContext from "../../context/RouterContext"; // Importar RouteContext

function NotesList() {
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);

  const { userData } = useContext(AuthContext);
  const { onRouteChange } = useContext(RouteContext);
  useEffect(() => {
    if (!userData) {
      onRouteChange("login");
    } else {
      handleLoadNotes();
    }
  }, [userData, onRouteChange]);

  const handleLoadNotes = async () => {
    try {
      const data = await getNotesByUserId(userData.user_id);
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
        if (selectedNote?.notes_id === notes_id) {
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
    <section className="section-list">
      <h2 className="h2-list">Campaing Notes</h2>
      {error && <p>{error}</p>}
      {notes.length === 0 ? (
        <p>No notes available</p>
      ) : (
        notes.map((note) => (
          <NotesCard
            notes={note}
            key={note.notes_id}
            onRemove={handleRemoveNote}
            onSelect={() => setSelectedNote(note)}
          />
        ))
      )}
      <button className="border border-red-500 rounded-md flex flex-row justify-center px-4 py-2 absolute bottom-32  left-1/2 transform -translate-x-1/2">
        Create a Note
      </button>
    </section>
  );
}

export default NotesList;
