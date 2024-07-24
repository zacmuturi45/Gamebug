"use client"

import { createContext, useContext, useState, useEffect } from 'react'

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
    const [filter, setFilter] = useState('');

  return (
    <FilterContext.Provider value={{ filter, setFilter }}>
        { children }
    </FilterContext.Provider>
  )
}


export const useFilter = () => useContext(FilterContext);
