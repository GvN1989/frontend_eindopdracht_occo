import axios from "axios";
import { useState, useEffect } from "react";

function useFetchCocktailData(url) {
    const [cocktailData, setCocktailData] = useState([]);
    const [isLoading, toggleIsLoading] = useState(false);
    const [error, toggleError] = useState(null);

    useEffect(() => {
        const controller = new AbortController();
        async function fetchCocktailData  (){
            toggleIsLoading(true);

            try {
                const response = await axios.get(url);
                if (response.data && response.data.drinks) {
                    setCocktailData(response.data.drinks);
                }
            } catch (e) {
                toggleError(error);
            } finally {
                toggleIsLoading(false);
                }
            }

        fetchCocktailData();

        return () => {controller.abort();}
    }, [url]);

    return { cocktailData, isLoading, error };
}

export default useFetchCocktailData;