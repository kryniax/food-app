import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "react-query";
import { RestaurantSearchResponse } from "../types";
import { SearchState } from "../pages/SearchPage";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useSearchRestaurants = (searchState: SearchState, city?: string) => {
    const { getAccessTokenSilently } = useAuth0();

    const createSearchRequest = async (): Promise<RestaurantSearchResponse> => {
        const accessToken = await getAccessTokenSilently();
        const params = new URLSearchParams();
        params.set("searchQuery", searchState.searchQuery);

        const response = await fetch(`${API_BASE_URL}/api/restaurant/search/${city}?${params.toString()}`);

        if(!response.ok) {
            throw new Error("Failed to get restaurant");
        }
        
        return response.json();
    }

    const { 
        data: results, 
        isLoading 
    } = useQuery(
            ["searchRestaurant", searchState], 
            createSearchRequest,
            { enabled: !!city }
        );
    
    return {
        results,
        isLoading
    }
}