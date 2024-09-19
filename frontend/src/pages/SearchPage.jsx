import CuisineFilter from '@/components/CuisineFilter';
import PaginationSelector from '@/components/PaginationSelector';
import SearchBar from '@/components/SearchBar';
import SearchResultCard from '@/components/SearchResultCard';
import SearchResultsInfo from '@/components/SearchResultsInfo';
import SortOptionDropdown from '@/components/SortOptionDropdown';
import { Button } from '@/components/ui/button';
import useSearchRestaurant from '@/hooks/useSearchRestaurant';
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

const SearchPage = () => {
  const {city} = useParams();
  const [searchState, setSearchState] = useState({
    searchQuery:"",
    page:1,
    selectedCuisines:[""],
    sortOption:"",
  });


  const {results, isLoading} = useSearchRestaurant(searchState, city);

  const  setSortOption = (sortOption)=>{
    setSearchState((prevState)=>({
      ...prevState,
      sortOption,
      page:1,
    }))
  }

  const setSelectedCuisines = (selectedCuisines)=>{
    setSearchState((prevState)=>({
      ...prevState,
      selectedCuisines,
      page:1,
    }))
  }

  

  const setSearchQuery= (searchFormData)=>{
    setSearchState((prevState)=>({
      ...prevState, 
      searchQuery:searchFormData.searchQuery,
      page:1,
    }))
  }
  const resetSearch=()=>{
    setSearchState((prevState)=>({...prevState,
      searchQuery:searchFormData.searchQuery,
      page:1,
    }))
  }

  const setPage = (page)=>{
    setSearchState((prevState)=>({
      ...prevState,
      page,
    }))
  }


  if(isLoading){
    <span>please wait..</span>
  }
  if(!results?.response?.data || !city){
    return <span>No results found</span> ;
  }
  return (
    <div>
    <div className='mr-4 mt-4 mb-4 ml-0 flex flex-cols justify-around'>
      <div id='cuisine-list' className='m-4 w-[175px]'>
        <CuisineFilter 
        selectedCuisines={searchState.selectedCuisines}
        onChange={setSelectedCuisines}
      /></div>
      <div id='main content' className='flex flex-col gap-5'>
        <SearchBar 
         searchQuery={searchState.searchQuery} 
         onSubmit={setSearchQuery} 
         placeholder='search by cuisine or restaurant name' 
         onReset={resetSearch}/>
         
        <SearchResultsInfo total={results?.response?.pagination?.total} city={city}/>
        <SortOptionDropdown sortOption={searchState.sortOption} onChange={(value)=>{(setSortOption(value))}}/>
        <div className='grid sm:grid-cols-3 gap-2 md:grid-cols mt-2'>
        {results?.response?.data?.map((restaurant)=>(
          <div className='gap-4 lg:w-[345px] grid sm:grid-cols-5  w-[1000px] sm:w-[300px]'>
            <SearchResultCard restaurant={restaurant} />
          </div>
        ))}
        </div>
      </div>
    </div>
    <PaginationSelector
     page={results?.response?.pagination?.page}
     pages = {results?.response?.pagination?.pages}
     onPageChange={setPage}
     />
    </div>
  )
}

export default SearchPage