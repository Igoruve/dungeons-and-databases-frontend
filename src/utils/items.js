import FetchData from "./Fetch";

async function getAllItems() {
  const response = await FetchData("/item");
  return response;
}

export { getAllItems };
