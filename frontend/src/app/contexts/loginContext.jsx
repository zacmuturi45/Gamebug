"use client"

import { useLazyQuery } from '@apollo/client';
import { createContext, useContext, useEffect, useState } from 'react'
import { LOGGEDUSER } from '../GraphQL/queries';
import { jwtDecode } from 'jwt-decode';

const LoggedUserContext = createContext();

export const LoggedProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState({});
    const [loading, setLoading] = useState(true);
    const [burgerOn, setBurgerOn] = useState(false);
    const [getUserInfo, { data }] = useLazyQuery(LOGGEDUSER, {
      fetchPolicy: 'no-cache'
    });

    useEffect(() => {
      const token = localStorage.getItem('token');
      if(token) {
        const decodedToken = jwtDecode(token);
        console.log(`JWTSS ARE ${decodedToken.sub}`)
        getUserInfo({variables: {id: decodedToken.sub}})
      } else {
        setLoading(false);
      }
    }, []);
    

    useEffect(() => {
      if (data && data.oneUser) {
        setUserInfo(data.oneUser)
        setLoading(false);
      } else if (data) {
        setUserInfo(null)
        setLoading(false);
      }
    }, [data]);

  return (
    <LoggedUserContext.Provider value={{ loading, burgerOn, setBurgerOn, userInfo, setUserInfo }}>
        { children }
    </LoggedUserContext.Provider>
  )
}


export const useLoggedUser = () => useContext(LoggedUserContext);
