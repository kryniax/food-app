import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSearchRestaurants } from '../api/RestaurantApi';
import PulseLoader from 'react-spinners/PulseLoader';
import SearchResultsInfo from '../components/SearchResultsInfo';
import SearchResultsCard from '../components/SearchResultsCard';
import SearchBar, { SearchForm } from '../components/SearchBar';
import PaginationSelector from '../components/PaginationSelector';
import CuisineFilter from '../components/CuisineFilter';
import SortOptionDropdown from '../components/SortOptionDropdown';

export type SearchState = {
  searchQuery: string;
  page: number;
  selectedCuisines: string[];
  sortOption: string;
}

const SearchPage = () => {
  const { city } = useParams();
  const [searchState, setSearchState] = useState<SearchState>({
    searchQuery: "",
    page: 1,
    selectedCuisines: [],
    sortOption: "bestMatch"
  });
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const { results, isLoading } = useSearchRestaurants(searchState, city);
  
  const setSortOption = (sortOption: string) => {
    setSearchState((prevState) => ({
      ...prevState,
      sortOption,
      page: 1,
    }))
  }

  const setSelectedCuisines = (selectedCuisines: string[]) => {
    setSearchState((prevState) => ({
      ...prevState,
      selectedCuisines,
      page: 1,
    }));
  }

  const setPage = (page: number) => {
    setSearchState((prevState) => ({
      ...prevState,
      page,
    }))
  }

  const setSearchQuery = (searchFormData: SearchForm) => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: searchFormData.searchQuery,
      page: 1,
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
        <CuisineFilter 
          selectedCuisines={searchState.selectedCuisines}
          onChange={setSelectedCuisines}
          isExpanded={isExpanded}
          onExpandedClick={() => setIsExpanded((prevIsExpanded) => !prevIsExpanded)}
        />
      </div>
      <div id="main-content" className='flex flex-col gap-5'>
        <SearchBar
          onReset={resetSearch}
          searchQuery={searchState.searchQuery}
          onSubmit={setSearchQuery} 
          placeHolder='Search by cusine or restaurant name' 
        />
        <div className='flex flex-col lg:flex-row justify-between gap-3'>
          <SearchResultsInfo
            city={city}
            total={results?.pagination.total}
          />
          <SortOptionDropdown 
            sortOption={searchState.sortOption} 
            onChange={(value) => setSortOption(value)} 
          />
        </div>
        {results.data.map((restaurant) => (
          <SearchResultsCard
            key={restaurant._id}
            restaurant={restaurant}
            />
        ))}
        <PaginationSelector 
          page={results.pagination.page} 
          pages={results.pagination.pages}
          onPageChange={setPage}
        />
      </div>
    </div>
  )
}

export default SearchPage