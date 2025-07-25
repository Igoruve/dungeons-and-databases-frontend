import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import RouteContext from "../../context/RouterContext";

function Auth() {
  const { onLogin } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState({
    email: "demo@gmail.com",
    password: "1234",
  });
  const { onRouteChange } = useContext(RouteContext);

  const handleUserEmail = (e) => {
    const newEmail = e.target.value;
    setUserData((prevState) => ({ ...prevState, email: newEmail }));
  };

  const handleUserPassword = (e) => {
    const newPassword = e.target.value;
    setUserData((prevState) => ({ ...prevState, password: newPassword }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      console.log("Attempting login with:", userData.email);
      const result = await onLogin(userData.email, userData.password);
      if (result && result.error) {
        console.error("Login failed:", result.error);
        setError(result.error || "Login failed. Please try again.");
      } else {
        console.log("Login successful:", result);
        onRouteChange("characters");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-zinc-50 dark:bg-zinc-800 h-screen flex flex-col items-center justify-center relative gap-4">
      {error && <p className="text-zinc-900 dark:text-zinc-100">{error}</p>}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 640 512"
        width="64px"
        height="64px"
        className="text-[var(--accent-color)] absolute top-10"
        fill="currentColor"
      >
        <path d="M352 124.5l-51.9-13c-6.5-1.6-11.3-7.1-12-13.8s2.8-13.1 8.7-16.1l40.8-20.4L294.4 28.8c-5.5-4.1-7.8-11.3-5.6-17.9S297.1 0 304 0L416 0l32 0 16 0c30.2 0 58.7 14.2 76.8 38.4l57.6 76.8c6.2 8.3 9.6 18.4 9.6 28.8c0 26.5-21.5 48-48 48l-21.5 0c-17 0-33.3-6.7-45.3-18.7L480 160l-32 0 0 21.5c0 24.8 12.8 47.9 33.8 61.1l106.6 66.6c32.1 20.1 51.6 55.2 51.6 93.1C640 462.9 590.9 512 530.2 512L496 512l-64 0L32.3 512c-3.3 0-6.6-.4-9.6-1.4C13.5 507.8 6 501 2.4 492.1C1 488.7 .2 485.2 0 481.4c-.2-3.7 .3-7.3 1.3-10.7c2.8-9.2 9.6-16.7 18.6-20.4c3-1.2 6.2-2 9.5-2.2L433.3 412c8.3-.7 14.7-7.7 14.7-16.1c0-4.3-1.7-8.4-4.7-11.4l-44.4-44.4c-30-30-46.9-70.7-46.9-113.1l0-45.5 0-57zM512 72.3c0-.1 0-.2 0-.3s0-.2 0-.3l0 .6zm-1.3 7.4L464.3 68.1c-.2 1.3-.3 2.6-.3 3.9c0 13.3 10.7 24 24 24c10.6 0 19.5-6.8 22.7-16.3zM130.9 116.5c16.3-14.5 40.4-16.2 58.5-4.1l130.6 87 0 27.5c0 32.8 8.4 64.8 24 93l-232 0c-6.7 0-12.7-4.2-15-10.4s-.5-13.3 4.6-17.7L171 232.3 18.4 255.8c-7 1.1-13.9-2.6-16.9-9s-1.5-14.1 3.8-18.8L130.9 116.5z" />
      </svg>
      <h1 className="text-zinc-900 dark:text-zinc-100 text-3xl font-bold mb-10 text-center">
        Welcome to<br></br>Dungeons & Databases
      </h1>
      <form
        className="bg-zinc-100 dark:bg-zinc-900 mx-10 rounded-md shadow-md px-3 h-auto"
        onSubmit={handleSubmit}
      >
        <label htmlFor="email"></label>
        <input
          className="bg-zinc-200 dark:bg-zinc-800 w-full px-4 py-2 rounded-md text-zinc-900 dark:text-zinc-100 mb-3 mt-4  shadow-inner"
          placeholder="Email"
          type="email"
          name="email"
          id="email"
          value={userData.email}
          onChange={handleUserEmail}
          required
        />
        <label htmlFor="password"></label>
        <input
          className="bg-zinc-200 dark:bg-zinc-800 w-full px-4 py-2 rounded-md text-zinc-900 dark:text-zinc-100 mb-3 shadow-inner"
          placeholder="Password"
          type="password"
          name="password"
          id="password"
          value={userData.password}
          onChange={handleUserPassword}
          required
        />
        <button className="form-button" type="submit" disabled={isLoading}>
          <strong>{isLoading ? "Logging in..." : "Login"}</strong>
        </button>
      </form>
      <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 text-center max-w-xs px-4">
        Demo user: <strong>demo@gmail.com</strong> <br />
        Password: <strong>1234</strong> <br />
        Use these credentials to log in and test the app.
        <br />
        (It's best suited for mobile devices as is thought for an app prototype.)
        <br />
      </p>
    </section>
  );
}

export default Auth;
