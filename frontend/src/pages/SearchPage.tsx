import React from 'react'
import { useParams } from 'react-router-dom'
import { useSearchRestaurants } from '../api/RestaurantApi';
import PulseLoader from 'react-spinners/PulseLoader';
import SearchResultsInfo from '../components/SearchResultsInfo';
import SearchResultsCard from '../components/SearchResultsCard';

const SearchPage = () => {
  const { city } = useParams();
  const { results, isLoading } = useSearchRestaurants(city);

  if(isLoading) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <PulseLoader 
          color='#f97316'
          size={25}
        />
      </div>
    );
  }

  if(!results?.data || !city) {
    return <span>No results found</span>;
  }
  return (
    <div className='grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5'>
      <div id="cuisines-list" className='flex flex-col gap-2'>
        cuisines list
      </div>
      <div id="main-content" className='flex flex-col gap-5'>
        <SearchResultsInfo
          city={city}
          total={results?.pagination.total}
        />
        {results.data.map((restaurant) => (
          <SearchResultsCard
            key={restaurant.city}
            restaurant={restaurant}
            />
        ))}
      </div>
    </div>
  )
}

export default SearchPage