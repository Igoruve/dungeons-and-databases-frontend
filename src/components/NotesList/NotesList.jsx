import NotesCard from "../NotesCard/NotesCard";
import { useEffect, useState, useContext } from "react";
import { getNotesByUserId, deleteNotes, editNotes } from "../../utils/notes";
import NotesCardExtended from "../NotesCardExtended/NotesCardExtended";
import { AuthContext } from "../../context/AuthContext";
import RouteContext from "../../context/RouterContext";

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
        const sortedNotes = data.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        setNotes(sortedNotes);
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

  const handleEditNote = async (notes_id, data) => {
    try {
      const response = await editNotes(notes_id, data);
      if (response.error) {
        setError(`Error editing note: ${response.error}`);
      } else {
        setNotes((prevNotes) =>
          prevNotes.map((note) =>
            note.notes_id === notes_id ? { ...note, ...data } : note
          )
        );
        setSelectedNote((prevNote) =>
          prevNote?.notes_id === notes_id ? { ...prevNote, ...data } : prevNote
        );
      }
    } catch (err) {
      setError(`Failed to delete note: ${err.message}`);
    }
  };

  const handleCreateNote = () => {
    onRouteChange("createNote");
  };

  if (selectedNote) {
    return (
      <NotesCardExtended
        notes={selectedNote}
        onRemove={handleRemoveNote}
        onChange={handleEditNote}
        onSelect={() => setSelectedNote(null)}
      />
    );
  }

  return (
    <section className="section-list">
      <h2 className="h2-list">Campaing Notes</h2>
      {error && <p>{error}</p>}
      {notes.length === 0 ? (
        <p className="text-red-500 px-6 justify-center items-center ">
          No notes available.
        </p>
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
      <button className="create-button" onClick={handleCreateNote}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="48px"
          viewBox="0 -960 960 960"
          width="48px"
          fill="white"
        >
          <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
        </svg>
      </button>
    </section>
  );
}

export default NotesList;
