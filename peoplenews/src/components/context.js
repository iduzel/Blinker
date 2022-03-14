import { createContext, useState } from "react";

export const UserContext = createContext();

export default function UserProvider({ children }) {
  const [userData, setUserData] = useState(null);
  const [showClass, setShowClass] = useState('hide')
  const [username, setUsername] = useState('')
  const [userId, setUserId] = useState('')

  return (
    <UserContext.Provider value={{ userData, setUserData, showClass, setShowClass, username, setUsername, userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
}
