import FetchData from "./Fetch";

async function getAllSkills() {
  const response = await FetchData("/skill", "GET");
  console.log("Fetched skills:", response); // Depuración
  return response;
}

export { getAllSkills };
