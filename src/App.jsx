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
import User from "./components/user/user.jsx";
import NewNote from "./components/NewNote/NewNote.jsx";
import NewCharacter from "./components/NewCharacter/step1BasicInfo.jsx";
import SelectClass from "./components/NewCharacter/step2Class.jsx";
import SelectSpecies from "./components/NewCharacter/step3Species.jsx";
import SelectStats from "./components/NewCharacter/step4Stats.jsx";
import SelectSkills from "./components/NewCharacter/step5Skills.jsx";
import SelectItems from "./components/NewCharacter/step6Items.jsx";
import FinalStep from "./components/NewCharacter/lastsept.jsx";
import { CharacterProvider } from "./context/CharacterContext.jsx";

function App() {
  const [route, setRoute] = useState("login");

  const handleRouteChange = (newRoute) => {
    setRoute(newRoute);
  };

  const routes = {
    login: <Auth />,
    characters: <CharacterList />,
    createcharacter: (
      <NewCharacter onNext={() => handleRouteChange("selectclass")} />
    ),
    selectclass: (
      <SelectClass onNext={() => handleRouteChange("selectspecies")} />
    ),
    selectspecies: (
      <SelectSpecies onNext={() => handleRouteChange("selectstats")} />
    ),
    selectstats: (
      <SelectStats onNext={() => handleRouteChange("selectskills")} />
    ),
    selectskills: (
      <SelectSkills onNext={() => handleRouteChange("selectitems")} />
    ),
    selectitems: <SelectItems onNext={() => handleRouteChange("finalstep")} />,
    finalstep: <FinalStep onNext={() => handleRouteChange("characters")} />,
    notes: <NotesList />,
    createNote: <NewNote />,
    browser: <Browser />,
    user: <User />,
  };

  return (
    <>
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
    </>
  );
}

export default App;
