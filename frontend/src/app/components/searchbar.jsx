import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

export default function SearchBar({ search }) {
  return (
    <div className='searchbar'>
        <div className='search-font'>
            <FontAwesomeIcon icon={faSearch} style={{fontSize: 20}} />
            {/* <p>Search {search}</p> */}
            <form>
                <input
                  type='text'
                  name={search}
                  id={search}
                  placeholder={`Search ${search}`}
                />
            </form>
        </div>
    </div>
  )
}
