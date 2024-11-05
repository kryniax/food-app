import React from 'react'
import { Link } from 'react-router-dom';

type SearchResultsInfoProps = {
    total: number;
    city: string;
}

const SearchResultsInfo = (props: SearchResultsInfoProps) => {
    const { total, city } = props;

  return (
    <div className='text-xl font-bold flex flex-col gap-3 justify-between lg:items-center lg:flex-row'>
        <span>
            {total} Restaurants found in {city}
            <Link to="/" className='ml-2 text-sm font-semibold underline cursor-pointer text-blue-500'>Change Location</Link>
        </span>
    </div>
  )
}

export default SearchResultsInfo