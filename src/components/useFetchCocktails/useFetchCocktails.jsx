import {useState, useEffect} from "react";
import axios from "axios";

function useFetchCocktails() {

    const [cocktails, setCocktails] = useState([]);
    const [categories, setCategories] = useState({});
    const [isLoading, toggleIsLoading] = useState(false);
    const [error, toggleError] = useState(null);

    useEffect(() => {
        const controller = new AbortController();

        async function fetchCocktails () {
            toggleIsLoading(true);
            const endpoint = `https://www.thecocktaildb.com/api/json/v2/${import.meta.env.VITE_API_KEY1}/search.php?f=`
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
                setCocktails(allData);
            } catch (error) {
                console.error(`Failed to fetch drinks:`, error)
                toggleError(error);
            } finally {
                setCocktails(allData);
                toggleIsLoading(false);
            }
        }

        fetchCocktails();

        return () => controller.abort();

    }, []);


        return {cocktails, isLoading, error};

}
export default useFetchCocktails;
