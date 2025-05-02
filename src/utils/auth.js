import FetchData from "./Fetch";
import { saveToken, saveUser } from "./localStorage";

export const login = async (email, password) => {
  const data = {
    email,
    password,
  };
  const result = await FetchData("/auth/login", "POST", data);
  console.log("login result", result);

  if (result && !result.error) {
    if (result.token) {
      saveToken(result.token);
    }
    if (result.user) {
      saveUser(result.user);
    } else if (result.user_id) {
      saveUser({
        user_id: result.user_id,
        email: email,
      });
    }
  }

  return result;
};

export default { login };
