import { useState } from "react";
import "./App.css";
import CharacterList from "./components/CharacterList/CharacterList.jsx";
import NotesList from "./components/NotesList/NotesList.jsx";
import NavBar from "./components/Navbar/Navbar.jsx";
import Auth from "./components/auth/Auth.jsx";
import Browser from "./components/browser/browser.jsx";
import RouteContext from "./context/RouterContext.jsx";
import { AuthComponent } from "./context/AuthContext.jsx";
import User from "./components/user/user.jsx";
import NewNote from "./components/NewNote/NewNote.jsx";
import { CharacterProvider } from "./context/CharacterContext.jsx";
import FullForm from "./components/NewCharacter/0index.jsx";
import ClassFeatures from "./components/classCard/classFeatures.jsx";
import { ClassProvider } from "./context/ClassContext.jsx";

function App() {
  const [route, setRoute] = useState("login");

  const handleRouteChange = (newRoute) => {
    setRoute(newRoute);
  };

  const routes = {
    login: <Auth />,
    characters: <CharacterList />,
    createcharacter: <FullForm />,
    notes: <NotesList />,
    createNote: <NewNote />,
    browser: <Browser />,
    user: <User />,
    classFeatures: (
      <ClassFeatures onBack={() => handleRouteChange("browser")} />
    ),
  };

  return (
    <>
      <ClassProvider>
        <CharacterProvider>
          <RouteContext.Provider
            value={{ route: route, onRouteChange: handleRouteChange }}
          >
            <AuthComponent>
              <NavBar />
              {routes[route] || <p>404 - Page Not Found</p>}
            </AuthComponent>
          </RouteContext.Provider>
        </CharacterProvider>
      </ClassProvider>
    </>
  );
}

export default App;
