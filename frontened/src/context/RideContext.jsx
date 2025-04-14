import { createContext, useContext, useState } from "react";

const RideContext = createContext();

export const RideProvider = ({ children }) => {
  const [UserData, setUserData] = useState(null);

  return (
    <RideContext.Provider value={{ UserData, setUserData }}>
      {children}
    </RideContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useRide = () => useContext(RideContext);
