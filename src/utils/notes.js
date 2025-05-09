import FetchData from "./Fetch.js";

async function getAllNotes() {
  const response = await FetchData("/notes");
  return response;
}

async function deleteNotes(id) {
  const response = await FetchData(`/notes/${id}`, "DELETE");
  return response;
}

async function getNotesByUserId(user_id) {
  const response = await FetchData(`/user/${user_id}/notes`);
  return response;
}

async function createNotes(notesData) {
  try {
    console.log("Creating note with data:", notesData);
    if (!notesData.title || !notesData.description || !notesData.user_id) {
      throw new Error("Missing required fields for note creation");
    }
    return await FetchData("/notes", "POST", notesData);
  } catch (error) {
    console.error("Error creating note:", error);
    return { error: error.message };
  }
}

async function editNotes(notes_id, data){
  const response = await FetchData(`/notes/${notes_id}`, "PUT", data);
  return response;
}

export { getAllNotes, deleteNotes, createNotes, getNotesByUserId, editNotes };
