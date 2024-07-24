"use client"

import { createContext, useContext, useState } from 'react'

const LoggedUserContext = createContext();

export const LoggedProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState({});

  return (
    <LoggedUserContext.Provider value={{ userInfo, setUserInfo }}>
        { children }
    </LoggedUserContext.Provider>
  )
}


export const useLoggedUser = () => useContext(LoggedUserContext);
