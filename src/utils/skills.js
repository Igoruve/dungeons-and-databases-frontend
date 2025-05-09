import FetchData from "./Fetch";

async function getAllSkills() {
  const response = await FetchData("/skills", "GET");
  return response;
}

export { getAllSkills };
