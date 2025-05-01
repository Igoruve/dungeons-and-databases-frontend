import FetchData from "./Fetch.js";

async function getAllCharacters() {
  const response = await FetchData("/character");
  return response;
}

async function deletCharacter(id) {
  const response = await FetchData(`/character/${id}`, "DELETE");
  return response;
}

async function createCharacter(data) {
  const response = await FetchData("/character", "POST");
  return response;
}

export { getAllCharacters, deletCharacter, createCharacter };
