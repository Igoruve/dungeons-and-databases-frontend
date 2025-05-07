import { useEffect, useState, useContext } from "react";
import { getUserById } from "../../utils/user";
import { AuthContext } from "../../context/AuthContext";
import RouteContext from "../../context/RouterContext";

function UserCard() {
  const classText = "text-zinc-700 dark:text-zinc-300 leading-relaxed pb-2";

  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

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
    setDarkMode(!darkMode);
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
    <article className="bg-zinc-100 dark:bg-zinc-800 min-h-screen py-10 mb-8 text-center">
      <section className="mt-10 h-full">
        <div>
          {error && <p className="text-red-500">{error}</p>}
          {user ? (
            <>
              <div className="w-20 h-20 border border-[var(--accent-color)] rounded-md mx-auto bg-zinc-200 dark:bg-zinc-900"></div>
              <h2 className="text-zinc-900 dark:text-zinc-300 text-center py-4 mt-4 text-3xl">
                <strong>{`${user.first_name} ${user.last_name}`}</strong>
              </h2>
              <p className={`${classText} text-center text-xl pb-24`}>
                "{user.nickname}"
              </p>
              <p className={`${classText} text-center mb-24`}>
                Email: {user.email}
              </p>
            </>
          ) : (
            <p className="text-zinc-700 dark:text-zinc-300">
              Loading user info...
            </p>
          )}
        </div>
        <div className="flex justify-center">
          <button onClick={handleDarkMode} className="">
            Dark Theme
          </button>
          <button
            onClick={onLogout}
            className="px-4 py-2 border border-[var(--accent-color)] rounded-md mx-auto text-[var(--accent-color)] text-center bottom-24"
          >
            Log Out...
          </button>
        </div>
      </section>
    </article>
  );
}

export default UserCard;
