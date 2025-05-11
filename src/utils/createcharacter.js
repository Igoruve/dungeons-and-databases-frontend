import FetchData from "./Fetch";

async function createCharacter(data) {
  const response = await FetchData("/createcharacter", "POST", data);
  return response;
}

export { createCharacter };
