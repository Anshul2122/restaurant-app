import React from 'react'
import { Link } from 'react-router-dom'

const SearchResultsInfo = ({total, city}) => {
  return (
    <div className='m-4 text-xl font-bold flex flex-col gap-3 justify-between lg:items-center lg:flex-row '>
        <span>
          ({total}) Restauants found in {city} {" "}
          <Link to='/' className='text-sm font-semibold underline cursor-pointer text-green-600'>change location</Link>
        </span>
    </div>
  )
}

export default SearchResultsInfo