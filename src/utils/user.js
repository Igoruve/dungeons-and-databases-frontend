import FetchData from "./Fetch.js";

async function getAllUsers() {
  const response = await FetchData("/user");
  return response;
}

async function getUserById(user_id){
    const response = await FetchData(`/user/${user_id}`, "GET");
    return response;
}

async function deleteUsers(id) {
  const response = await FetchData(`/user/${id}`, "DELETE");
  return response;
}

async function createUsers(data) {
  const response = await FetchData("/user", "POST");
  return response;
}

export { getAllUsers, deleteUsers, createUsers, getUserById };
