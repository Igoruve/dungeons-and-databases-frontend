import FetchData from "./Fetch";

async function getAllSpecies() {
  const response = await FetchData("/species");
  return response;
}

export { getAllSpecies };
