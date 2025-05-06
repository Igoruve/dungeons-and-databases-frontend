import { useContext, useEffect, useState } from "react";
import "./App.css";
import CharacterList from "./components/CharacterList/CharacterList.jsx";
import NotesList from "./components/NotesList/NotesList.jsx";
import NavBar from "./components/Navbar/Navbar.jsx";
import Auth from "./components/auth/Auth.jsx";
import Browser from "./components/browser/browser.jsx";
import { login } from "./utils/auth.js";
import { saveToken } from "./utils/localStorage.js";
import RouteContext from "./context/RouterContext.jsx";
import { AuthComponent } from "./context/AuthContext.jsx";

function App() {
  const [route, setRoute] = useState("home");

  const handleRouteChange = (newRoute) => {
    setRoute(newRoute);
  };

  const routes = {
    characters: <CharacterList />,
    login: <Auth />,
    notes: <NotesList />,
    browser: <Browser />,
  };

  return (
    <>
      <RouteContext.Provider
        value={{ route: route, onRouteChange: handleRouteChange }}
      >
        <AuthComponent>
          <NavBar />
          {routes[route]}
        </AuthComponent>
      </RouteContext.Provider>
    </>
  );
}

export default App;
