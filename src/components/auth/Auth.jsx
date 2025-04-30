import { useState } from "react";

function Auth({ onLogin }) {
  const [error, setError] = useState();//no se si hayq ue poner algo entre parents TODO
  const [isRegister, setIsRegister] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleUserPasswrod = (e) => {
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
    console.log("login", userData);
    const result = await onLogin(userData.email, userData.password);
    setError(result);
  };

  return (
    <section className="auth-section">
      <h1>Login</h1>
      <p className="error">{error}</p>
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={userData.email}
          onChange={handleUserEmail}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={userData.password}
          onChange={handleUserPasswrod}
        />
        <button>Login</button>
      </form>
    </section>
  );
}

export default Auth;
