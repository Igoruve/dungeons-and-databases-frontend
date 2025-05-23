const BASE_URL = import.meta.env.VITE_BACKEND_URL_PROD;

import { getToken } from "./localStorage";

async function FetchData(route, method = "GET", data = null) {
  const url = BASE_URL + route;
  const token = getToken();
  const options = {
    method,
    headers: {},
  };

  if (token) {
    options.headers["Authorization"] = `Bearer ${token}`;
  }

  if (data) {
    options.headers["Content-Type"] = "application/json";
    options.body = JSON.stringify(data);
  }

  try {
    console.log("Request URL:", url);
    console.log(options)
    const response = await fetch(url, options);
    const responseData = await response.json();

    if (!response.ok) {
      console.error(responseData);
      throw new Error(responseData.error);
    }

    return responseData;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export default FetchData;
