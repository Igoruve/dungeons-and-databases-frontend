import { useEffect, useState, useContext } from "react";
import { getUserById } from "../../utils/user";
import { AuthContext } from "../../context/AuthContext";
import RouteContext from "../../context/RouterContext";
import {
  saveToLocalStorage,
  getFromLocalStorage,
} from "../../utils/localStorage";

function UserCard() {
  const classText = "text-zinc-700 dark:text-zinc-300 leading-relaxed pb-2";

  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(() => {
    return getFromLocalStorage("theme") === "dark";
  });

  const { userData, onLogout } = useContext(AuthContext);
  const { onRouteChange } = useContext(RouteContext);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const handleDarkMode = () => {
    const newMode = !darkMode;
    saveToLocalStorage("theme", newMode ? "dark" : "light");
    setDarkMode(newMode);
  };

  useEffect(() => {
    if (!userData) return;
    handleLoadUser();
  }, [userData, onRouteChange]);

  const handleLoadUser = async () => {
    try {
      const data = await getUserById(userData.user_id);
      if (data.error) {
        if (data.status === 401) {
          onRouteChange(userData ? "user" : "login");
        } else {
          setError(`Error loading user: ${data.error}`);
        }
      } else if (data && typeof data === "object") {
        setUser(data);
      } else {
        setError("Invalid data format received from server");
        setUser(null);
      }
    } catch (err) {
      console.error("Exception occurred:", err);
      setError(`Failed to load user: ${err.message}`);
    }
  };

  return (
    <article className="relative bg-zinc-100 dark:bg-zinc-800 min-h-screen py-10 mb-8 text-center">
      <section className="mt-10 h-full">
        <div>
          {error && <p className="text-red-500">{error}</p>}
          {user ? (
            <>
              <div className="w-20 h-20 border border-[var(--accent-color)] rounded-md mx-auto bg-zinc-200 dark:bg-zinc-900 shadow-md"></div>
              <h2 className="text-zinc-900 dark:text-zinc-300 text-center py-4 mt-4 text-3xl">
                <strong>{`${user.first_name} ${user.last_name}`}</strong>
              </h2>
              <p className={`${classText} text-center text-xl`}>
                "{user.nickname}"
              </p>
              <p className={`${classText} text-center`}>Email: {user.email}</p>
            </>
          ) : (
            <p className="text-zinc-700 dark:text-zinc-300">
              Loading user info...
            </p>
          )}
        </div>
        <div className="flex flex-col justify-center pt-16 gap-6">
          <h2 className="h2-card">Settings</h2>
          <div className="flex flex-row px-20 justify-between items-center">
            <p className={`${darkMode ? "text-zinc-50" : "text-zinc-900"}`}>
              Dark Theme
            </p>
            <label
              htmlFor="checkbox"
              className={`${
                darkMode
                  ? "bg-red-500 border-zinc-50"
                  : "bg-zinc-50 border-red-500 "
              } w-6 h-6 border rounded-lg shadow-md`}
            ></label>
            <input
              id="checkbox"
              name="checkbox"
              type="checkbox"
              onClick={handleDarkMode}
              className="hidden"
            />
          </div>
          <button
            onClick={onLogout}
            className="px-4 py-2 border border-[var(--accent-color)] rounded-md text-[var(--accent-color)] text-center absolute bottom-24 left-1/2 transform -translate-x-1/2 font-bold bg-white"
          >
            Log Out...
          </button>
        </div>
      </section>
    </article>
  );
}

export default UserCard;
