import FetchData from "./Fetch";

async function getAllItems() {
  const response = await FetchData("/item");
  console.log("Fetched items:", response); // Depuración
  return response;
}



export { getAllItems };
