import { createBrowserRouter } from "react-router-dom";
import Root from "./pages/root/root";
import Browser from "./components/browser/browser.jsx";
import CharacterList from "./components/CharacterList/CharacterList.jsx";
import NotesList from "./components/NotesList/NotesList.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/browser",
        element: <Browser />,
      },
      {
        path: "/character",
        element: <CharacterList />,
      },
      {
        path: "/notes",
        element: <NotesList />,
      },
    ],
  },
]);

export default router;
