"use client"

import React, { useEffect } from 'react'
import { createContext, useContext, useState } from 'react'

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        console.log(`Filterssss iss ${filter}`)
    }, [filter])

  return (
    <FilterContext.Provider value={{ filter, setFilter }}>
        { children }
    </FilterContext.Provider>
  )
}


export const useFilter = () => useContext(FilterContext);
