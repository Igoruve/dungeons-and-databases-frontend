import FetchData from "./Fetch.js";

async function getAllCharacters() {
  const character = await FetchData("/character");
  return character;
}

async function deletCharacter(id) {
  const response = await FetchData(`/character/${id}`, "DELETE");
  return response;
}

export { getAllCharacters, deletCharacter };
