import { removeToken } from "../../utils/localStorage";
import RouteContext from "../../context/RouterContext";
import { useContext } from "react";
import character from "../../assets/character.svg";

function NavBar({ handleLogOut }) {
  const { route, onRouteChange } = useContext(RouteContext);
  const baseButtonClasses =
    "w-full text-xs py-2 text-center flex flex-col justify-center items-center gap-1";

  return (
    <nav className="fixed bottom-0 z-10 bg-[--primary-bg-color] h-20 w-screen flex items-center justify-center border-b border-grey-500">
      <ul className="flex flex-wrap justify-center items-center h-full w-full gap-x-4 px-4">
        <li className="flex-1 flex justify-center items-center">
          <button
            className={`${baseButtonClasses} ${
              route === "characters"
                ? "text-[--accent-color] font-bold"
                : "text-white"
            }`}
            onClick={() => onRouteChange("characters")}
          >
            <svg
              className={`${
                route === "characters"
                  ? "w-6 h-6 mb-1 text-[--accent-color] font-bold"
                  : ""
              }`}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm9 1.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 0-1h-4a.5.5 0 0 0-.5.5M9 8a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 0-1h-4A.5.5 0 0 0 9 8m1 2.5a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 0-1h-3a.5.5 0 0 0-.5.5m-1 2C9 10.567 7.21 9 5 9c-2.086 0-3.8 1.398-3.984 3.181A1 1 0 0 0 2 13h6.96q.04-.245.04-.5M7 6a2 2 0 1 0-4 0 2 2 0 0 0 4 0" />
            </svg>
            Characters
          </button>
        </li>
        <li className="flex-1 flex justify-center items-center">
          <button
            className={`${baseButtonClasses} ${
              route === "notes"
                ? "text-[--accent-color] font-bold"
                : "text-white"
            }`}
            onClick={() => onRouteChange("notes")}
          >
            <svg
              className={`${
                route === "notes"
                  ? "w-6 h-6 mb-1 text-[--accent-color] font-bold"
                  : ""
              }}`}
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="currentColor"
            >
              <path d="M160-400v-80h280v80H160Zm0-160v-80h440v80H160Zm0-160v-80h440v80H160Zm360 560v-123l221-220q9-9 20-13t22-4q12 0 23 4.5t20 13.5l37 37q8 9 12.5 20t4.5 22q0 11-4 22.5T863-380L643-160H520Zm300-263-37-37 37 37ZM580-220h38l121-122-18-19-19-18-122 121v38Zm141-141-19-18 37 37-18-19Z" />
            </svg>
            Notes
          </button>
        </li>
        <li className="flex-1 flex justify-center items-center">
          <button
            className={`${baseButtonClasses} ${
              route === "browser"
                ? "text-[--accent-color] font-bold"
                : "text-white"
            }`}
            onClick={() => onRouteChange("browser")}
          >
            <svg
              className="w-6 h-6 mb-1"
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="currentColor"
            >
              <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
            </svg>
            Search
          </button>
        </li>
        <li className="flex-1 flex justify-center items-center">
          <button
            className={`${baseButtonClasses} ${
              route === "login"
                ? "text-[--accent-color] font-bold"
                : "text-white"
            }`}
            onClick={() => onRouteChange("login")}
          >
            <svg
              className="w-6 h-6 mb-1"
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="currentColor"
            >
              <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z" />
            </svg>
            Profile
          </button>
        </li>
        {/*         <li className="flex-1">
          <button
            className={`${baseButtonClasses} ${
              route === "login" ? "text-[--accent-color] font-bold" : "text-white"
            }`}
            onClick={handleLogOut}
          >
            Logout
          </button>
        </li> */}
      </ul>
    </nav>
  );
}

export default NavBar;
