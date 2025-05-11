import FetchData from "./Fetch";

async function getAllClasses() {
  const response = await FetchData("/class");
  console.log("Response from /class:", response); 
  return response;
}

export { getAllClasses };
