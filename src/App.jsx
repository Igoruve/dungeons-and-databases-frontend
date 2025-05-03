import { useEffect, useState } from "react";
import "./App.css";
import CharacterList from "./components/CharacterList/CharacterList.jsx";
import NotesList from "./components/NotesList/NotesList.jsx";
import NavBar from "./components/Navbar/Navbar.jsx";
import Auth from "./components/auth/Auth.jsx";
import Browser from "./components/browser/browser.jsx";
import { login } from "./utils/auth.js";
import { saveToken } from "./utils/localStorage.js";

function App() {
  const [route, setRoute] = useState("home");
  const [userData, setUserData] = useState(null);

  const handleLogin = async (email, password) => {
    const result = await login(email, password);
    if (result.error) {
      return result.error;
    } else {
      console.log("login", result);
      setUserData(result.user);
      saveToken(result.token);
      setRoute("home");
      return null;
    }
  };

  const handleRouteChange = (newRoute) => {
    setRoute(newRoute);
  };

  const routes = {
    characters: <CharacterList onRouteChange={handleRouteChange} />,
    login: <Auth onLogin={handleLogin} />,
    notes: <NotesList onRouteChange={handleRouteChange} />,
    browser: <Browser onRouteChange={handleRouteChange} />,
  };

  return (
    <>
      <NavBar route={route} onRouteChange={handleRouteChange} />
      {routes[route]}
    </>
  );
}

export default App;
