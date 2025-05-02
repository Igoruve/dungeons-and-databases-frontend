import { useState } from "react";

function Auth({ onLogin }) {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleUserPassword = (e) => {
    const newPassword = e.target.value;
    const newState = { ...userData, password: newPassword };
    setUserData(newState);
  };

  const handleUserEmail = (e) => {
    const newEmail = e.target.value;
    const newState = { ...userData, email: newEmail };
    setUserData(newState);
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
        // We're not using onRouteChange here anymore
        // The redirect will be handled by the App component based on auth state
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="auth-section">
      <h1>Login</h1>
      {error && <p className="error" style={{ color: "red" }}>{error}</p>}
      <form className="login-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={userData.email}
            onChange={handleUserEmail}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={userData.password}
            onChange={handleUserPassword}
            required
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
    </section>
  );
}

export default Auth;