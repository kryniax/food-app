import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSearchRestaurants } from '../api/RestaurantApi';
import PulseLoader from 'react-spinners/PulseLoader';
import SearchResultsInfo from '../components/SearchResultsInfo';
import SearchResultsCard from '../components/SearchResultsCard';
import SearchBar, { SearchForm } from '../components/SearchBar';

export type SearchState = {
  searchQuery: string;
}

const SearchPage = () => {
  const { city } = useParams();
  const [searchState, setSearchState] = useState<SearchState>({
    searchQuery: "",
  });
  const { results, isLoading } = useSearchRestaurants(searchState, city);
  
  const setSearchQuery = (searchFormData: SearchForm) => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: searchFormData.searchQuery,
    }));
  };
  console.log(searchState);
  console.log(results);
  const resetSearch = () => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: "",
    }));
  };

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
        <SearchBar
          onReset={resetSearch}
          searchQuery={searchState.searchQuery}
          onSubmit={setSearchQuery} 
          placeHolder='Search by cusine or restaurant name' 
        />
        <SearchResultsInfo
          city={city}
          total={results?.pagination.total}
        />
        {results.data.map((restaurant) => (
          <SearchResultsCard
            key={restaurant._id}
            restaurant={restaurant}
            />
        ))}
      </div>
    </div>
  )
}

export default SearchPage