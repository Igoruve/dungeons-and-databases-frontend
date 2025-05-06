import { createContext } from "react";

const RouteContext = createContext({
  route: "home",
  onRouteChange: () => {},
});

export default RouteContext;
