"use client"

import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

export default function SearchBar({ search, data, setGameData, games }) {
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    const copy = [...data]
    if (filtered.length > 0) {
      const filterData = copy.filter(item => item.node.title.toLowerCase().includes(filtered.toLowerCase()))
      setGameData(filterData)
    } else if(filtered.length === 0) {
      setGameData(games)
    }
  }, [filtered])
  

  return (
    <div className='searchbar'>
      <div className='search-font'>
        <FontAwesomeIcon icon={faSearch} style={{ fontSize: 20 }} />
        {/* <p>Search {search}</p> */}
        <form>
          <input
            type='text'
            name={search}
            id={search}
            value={filtered}
            onChange={(e) => setFiltered(e.target.value)}
            placeholder={`Search ${search}`}
          />
        </form>
      </div>
    </div>
  )
}
