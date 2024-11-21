import { createContext } from "react";
import { useState } from "react";
export const User = createContext(null)

export default function UserProvider({children}) {
  const [Auth , SetAuth] = useState({});
  return <User.Provider value={{Auth,SetAuth}}>{children}</User.Provider>
}