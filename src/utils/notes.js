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

async function createNotes(data) {
  const response = await FetchData("/notes", "POST");
  return response;
}

export { getAllNotes, deleteNotes, createNotes, getNotesByUserId };
