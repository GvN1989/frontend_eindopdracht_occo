import {useState, useEffect} from "react";
import axios from "axios";

function useFetchCocktails() {

    const [cocktails, setCocktails] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {

        async function fetchCocktails () {
            setIsLoading(true);
            const endpoint = `https://www.thecocktaildb.com/api/json/v2/${import.meta.env.VITE_API_KEY}/search.php?f=`
            const allData = []
            const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');


            try {
                for (const letter of alphabet) {
                    const url = `${endpoint}${letter}`;
                    const response = await axios.get(url);
                    if (response.data && response.data.drinks) {
                        allData.push(...response.data.drinks);

                    }
                }
            } catch (error) {
                console.error(`Failed to fetch drinks:`, error)
                setError(error);
            } finally {
                setCocktails(allData);
                setIsLoading(false);
            }
        }

        fetchCocktails();

    }, []);

        return {cocktails, isLoading, error};

}
export default useFetchCocktails;
