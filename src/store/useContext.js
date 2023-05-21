import { createContext, useState } from "react";

export const Context = createContext();

const Provider = ({ children }) => {
  const [user, setUser] = useState(null);
  console.log('user', user);
  const value = {
    user,
    setUser
  }
  
  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  )
}

export default Provider;