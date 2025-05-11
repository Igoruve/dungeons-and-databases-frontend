import { createContext, useState } from "react";

const ClassContext = createContext();

export const ClassProvider = ({ children }) => {
  const [selectedClassId, setSelectedClassId] = useState(null);

  return (
    <ClassContext.Provider value={{ selectedClassId, setSelectedClassId }}>
      {children}
    </ClassContext.Provider>
  );
};

export default ClassContext;