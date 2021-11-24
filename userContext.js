import { createContext, useState } from "react";

const UserContext = createContext();
const UserProvider = UserContext.Provider;
const UserConsumer = UserContext.Consumer;

const User = ({ children }) => {
  const [user, setUser] = useState("");

  const updateUser = (update) => {
    setUser(update);
  };

  return <UserProvider value={{ user, updateUser }}>{children}</UserProvider>;
};

export { UserConsumer, UserContext };

export default User;
