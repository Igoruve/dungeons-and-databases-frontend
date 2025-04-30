import { removeToken } from "../../utils/localStorage";

function NavBar({ route, onRouteChange }) {
  const handleLogOut = () => {
    removeToken();
    onRouteChange("home");
  };

  return (
    <nav>
      <ul className="nav-list">
        <li className={"nav-item" + (route === "home" ? "active" : "")}>
          <button onClick={() => onRouteChange("home")}>Home</button>
        </li>
        <li className={"nav-item" + (route === "characters" ? "active" : "")}>
          <button onClick={() => onRouteChange("characters")}>
            Characters
          </button>
        </li>
        <li className={"nav-item" + (route === "login" ? "active" : "")}>
          <button onClick={() => onRouteChange("login")}>Login</button>
        </li>
        <li className={"nav-item"}>
          <button onClick={handleLogOut}>Logout</button>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
