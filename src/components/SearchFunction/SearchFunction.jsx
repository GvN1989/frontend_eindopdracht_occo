import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SearchFuntion.module.css';
import IconButton from "../IconButton/IconButton.jsx";

function SearchFunction() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [focusIndex, setFocusIndex] = useState(-1);
    const navigate = useNavigate();

    useEffect(() => {
        if (query.length > 2) {
            setIsLoading(true);
            fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`)
                .then(response => response.json())
                .then(data => {
                    setResults(data.drinks || []);
                    setIsLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching search results:', error);
                    setResults([]);
                    setIsLoading(false);
                });
        } else {
            setResults([]);
        }
    }, [query]);

    return (
        <form className={styles["search-container"]}>
            <input
                type="text"
                className={styles["searchInput"]}
                placeholder="Search for drinks..."
                value={query}
                onChange={e => setQuery(e.target.value)}
            />
            <IconButton icon="search"  ariaLabel="search"/>
            {isLoading && <div>Loading...</div>}
            {results.length > 0 && (
                <div className={styles["search-results"]}>
                    {results.map((drink, index) => (
                        <div
                            key={drink.idDrink}
                            className={`${styles["search-result-item"]} ${index === focusIndex ? styles["focused"] : ''}`}
                            onClick={() => navigate(`/productdetail/${drink.idDrink}`)}
                            onMouseEnter={() => setFocusIndex(index)}
                        >
                            {drink.strDrink}
                        </div>
                    ))}
                </div>
            )}
        </form>
    );
}

export default SearchFunction;