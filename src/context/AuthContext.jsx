import { createContext, useState, useContext } from "react";
import { login } from "../utils/auth";
import { saveToken, removeToken } from "../utils/localStorage";
import RouteContext from "./RouterContext";

const AuthContext = createContext({
  userData: {},
  onLogin: async () => {},
  onLogout: () => {},
});

const AuthComponent = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const { onRouteChange } = useContext(RouteContext);
  
  const handleLogin = async (email, password) => {
    const result = await login(email, password);
    if (result.error) {
      return result.error;
    } else {
      console.log("login", result);
      setUserData(result.user);
      saveToken(result.token);
      onRouteChange("home");
      return null;
    }
  };

  const handleLogOut = () => {
    removeToken();
    onRouteChange("login");
  };

  return (
    <AuthContext
      value={{
        userData: userData,
        onLogin: handleLogin,
        onLogout: handleLogOut,
      }}
    >
      {children}
    </AuthContext>
  );
};

export { AuthContext, AuthComponent };
