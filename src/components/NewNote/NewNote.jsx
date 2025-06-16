import { useState, useEffect } from "react";
import { createNotes } from "../../utils/notes";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import RouteContext from "../../context/RouterContext";

function NewNote({ onSelect }) {
  const { onRouteChange } = useContext(RouteContext);
  const [isLoading, setIsLoading] = useState(false);
  const { userData } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const [notesData, setNotesData] = useState({
    title: "",
    description: "",
    user_id: "",
  });

  useEffect(() => {
    if (userData) {
      console.log("User data received:", userData);
      setNotesData((prev) => ({
        ...prev,
        user_id: userData.user_id,
      }));
    } else {
      console.warn("No user data available");
    }
  }, [userData]);

  const handleNotesTitle = (e) => {
    const newTitle = e.target.value;
    setNotesData((prevState) => ({ ...prevState, title: newTitle }));
  };

  const handleNotesDescription = (e) => {
    const newDescription = e.target.value;
    const textarea = e.target;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
    setNotesData((prevState) => ({
      ...prevState,
      description: newDescription,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    if (!notesData.user_id) {
      const errorMsg = "Please log in again.";
      console.error(errorMsg);
      setError(errorMsg);
      setIsLoading(false);
      return;
    }
    if (!notesData.title.trim()) {
      const errorMsg = "Title is required";
      console.error(errorMsg);
      setError(errorMsg);
      setIsLoading(false);
      return;
    }

    if (!notesData.description.trim()) {
      const errorMsg = "Description is required";
      console.error(errorMsg);
      setError(errorMsg);
      setIsLoading(false);
      return;
    }
    try {
      const dataToSend = {
        title: notesData.title.trim(),
        description: notesData.description.trim(),
        user_id: notesData.user_id,
      };
      const result = await createNotes(dataToSend);
      if (result && result.error) {
        console.error("Creation failed:", result.error);
        setError(result.error || "Creation failed. Please try again.");
      } else {
        console.log("Creation successful:", result);
        onRouteChange("notes");
      }
    } catch (err) {
      console.error("Submit error:", err);
      setError(`An unexpected error occurred: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center w-screen max-w-md mx-auto pt-8 h-screen bg-zinc-50 dark:bg-zinc-800">
      <button className="back-button" onClick={() => onRouteChange("notes")}>
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

      <h2 className="h2-card">New Note</h2>
      {error && <div>{error}</div>}

      <form
        className="w-full flex flex-col justify-around gap-4 px-4 pt-6"
        onSubmit={handleSubmit}
      >
        <div>
          <input
            type="text"
            name="title"
            placeholder="Enter a title"
            id="title"
            value={notesData.title}
            onChange={handleNotesTitle}
            required
            className="form-input"
          />
        </div>
        <div>
          <textarea
            name="description"
            placeholder="Enter a description"
            id="description"
            value={notesData.description}
            onChange={handleNotesDescription}
            required
            className="form-input"
          />
        </div>
        <button type="submit" disabled={isLoading} className="form-button">
          {isLoading ? "Creating..." : "Create"}
        </button>
      </form>
    </div>
  );
}

export default NewNote;
