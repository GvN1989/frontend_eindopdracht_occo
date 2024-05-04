import axios from "axios";
import { useState, useEffect } from "react";

function useFetchCocktailData(url) {
    const [cocktailData, setCocktailData] = useState([]);
    const [isLoading, toggleIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted= true;
        const controller = new AbortController();
        async function fetchCocktailData  (){
            toggleIsLoading(true);
            setError(null);

            try {
                const response = await axios.get(url, {signal: controller.signal});
                if (response.data && response.data.drinks) {
                    setCocktailData(response.data.drinks);
                    console.log(`Data fetched:`, response.data.drinks);
                }

                console.log("All data fetched", cocktailData);
            } catch (e) {
                if(axios.isCancel(e)) {
                console.log("Fetch aborted");

            } else {
                console.error(`Failed to fetch the specific data: ${e}`)
                if (isMounted) setError(e);
            }
            } finally {
                    if (isMounted) toggleIsLoading(false);
                }
            }

        fetchCocktailData();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [url]);

    return { cocktailData, isLoading, error };
}

export default useFetchCocktailData;