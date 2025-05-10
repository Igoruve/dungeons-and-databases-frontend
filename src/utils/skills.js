import FetchData from "./Fetch";

async function getAllSkills() {
  const response = await FetchData("/skill", "GET");
  return response;
}

export { getAllSkills };
