import FetchData from "./Fetch";

async function getAllClasses() {
  const response = await FetchData("/class");
  return response;
}

export { getAllClasses };
