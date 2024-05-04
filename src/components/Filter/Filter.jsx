import styles from "./Filter.module.css";
import {useMemo, useState} from 'react';
import Button from "../Button/Button.jsx";
import useFetchCocktailData from "../useFetchCocktailData/useFetchCocktailData.jsx";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import IconButton from "../IconButton/IconButton.jsx";

function Filter({isVisible, onFilterChange, onClose}){

    const {data: categories,isLoading: loadingCategories,errorCategories} = useFetchCocktailData(`https://www.thecocktaildb.com/api/json/v2/${import.meta.env.VITE_API_KEY1}/list.php?c=list`)
    const {data: ingredients,isLoading: loadingIngredients,error: errorIngredients} = useFetchCocktailData( `https://www.thecocktaildb.com/api/json/v2/${import.meta.env.VITE_API_KEY1}/list.php?i=list`)
    const {data: types,isLoading: loadingTypes,error: errorTypes} = useFetchCocktailData(`https://www.thecocktaildb.com/api/json/v2/${import.meta.env.VITE_API_KEY1}/list.php?a=list`)


    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const [selectedTypes, setSelectedTypes] = useState([])

    const ingredientOptions= useMemo(() => ingredients?.map(ing=> ({value: ing.strIngredient1, label: ing.strIngredient1})), [ingredients]);
    const typeOptions= useMemo (()=> types?.map(type=> ({value: type.strAlcoholic, label: type.strAlcoholic})), [types]);
    const categoryOptions =  useMemo(() => categories?.map(cat=> ({value: cat.strCategory, label: cat.strCategory})), [categories]);

    const animatedComponents = useMemo(()=>makeAnimated(), []);

    const applyFilters= () => {
        onFilterChange({
            categories: selectedCategories,
            ingredients: selectedIngredients,
            types: selectedTypes
        })
    }

    const resetFilters = () => {
        setSelectedCategories([]);
        setSelectedIngredients([]);
        setSelectedTypes([]);
        onFilterChange({
            categories: [],
            ingredients: [],
            types: []
        })
    }
    return isVisible ? (
            <aside className={styles.filterPanel}>
                <h4>Filters</h4>
                <div>
                    <label>
                        Alcohol preference
                        {loadingTypes ? <p> Loading...</p> :
                        errorTypes ? <p> Error loading types. </p> :
                            <Select
                                components={animatedComponents}
                                isMulti
                                options={typeOptions}
                                onChange={selectedOptions => setSelectedTypes(selectedOptions.map(option => option.value))}
                                placeholder="Select drink type ..."

                        />}
                    </label>
                    <label>
                        Category
                        {loadingCategories ? <p> Loading...</p> :
                        errorCategories ? <p> Error loading categories. </p> :
                        <Select
                            components={animatedComponents}
                            isMulti
                            options={categoryOptions}
                            onChange={selectedOptions => setSelectedCategories(selectedOptions.map(option => option.value))}
                            placeholder="Select categories..."

                        />}
                    </label>
                    <label>
                        Ingredients
                        {loadingIngredients ? <p>Loading...</p> :
                            errorIngredients ? <p>Error loading ingredients.</p> :
                       <Select
                           components={animatedComponents}
                           isMulti
                           options={ingredientOptions}
                           onChange={selectedOptions => setSelectedIngredients(selectedOptions.map(option => option.value))}
                           placeholder="Select ingredients..."
                        />}
                    </label>
                </div>
                <Button className={"primary"} onClick={applyFilters}>Apply Filters</Button>
                <Button className={"secondary"} onClick={resetFilters}>Reset Filters</Button>
                <IconButton
                    icon={"close"}
                    ariaLabel="close"
                    className={styles.btnSpecs}
                    svgClassName={styles.changeFill}
                    onClick={onClose}
                />
        </aside>

    ) : null;
}

export default Filter;