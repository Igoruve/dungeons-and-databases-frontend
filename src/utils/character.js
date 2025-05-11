import FetchData from "./Fetch.js";

async function getAllCharacters() {
  const response = await FetchData("/character");
  return response;
}

async function getCharactersByUserId(user_id) {
  const response = await FetchData(`/user/${user_id}/character`);
  return response;
}

async function deleteCharacter(id) {
  const response = await FetchData(`/character/${id}`, "DELETE");
  return response;
}

async function createCharacter(data) {
  console.log("Data: ", data)
  const response = await FetchData("/character", "POST", data);
  return response;
}

export {
  getAllCharacters,
  deleteCharacter,
  createCharacter,
  getCharactersByUserId,
};
