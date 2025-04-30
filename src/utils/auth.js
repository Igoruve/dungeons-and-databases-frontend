import FetchData from "./Fetch";

export const login = async (email, password) => {
  const data = {
    email,
    password,
  };
  const result = await FetchData("/auth/login", "POST", data);
  console.log("login result", result);
  return result;
};

export default { login };
