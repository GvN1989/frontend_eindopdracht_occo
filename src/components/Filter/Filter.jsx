import styles from "./Filter.module.css";
import {useMemo, useState} from 'react';
import Button from "../Button/Button.jsx";
import useFetchCocktailData from "../useFetchCocktailData/useFetchCocktailData.jsx";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import IconButton from "../IconButton/IconButton.jsx";

function Filter({isVisible, onFilterChange, onClose}){

    const {cocktailData: categories,isLoading: loadingCategories, error: errorCategories} = useFetchCocktailData(`https://www.thecocktaildb.com/api/json/v2/${import.meta.env.VITE_API_KEY1}/list.php?c=list`)
    const {cocktailData: types,isLoading: loadingTypes,error: errorTypes} = useFetchCocktailData(`https://www.thecocktaildb.com/api/json/v2/${import.meta.env.VITE_API_KEY1}/list.php?a=list`)


    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedTypes, setSelectedTypes] = useState([])

    const typeOptions= useMemo (()=> types?.map(type=> ({value: type.strAlcoholic, label: type.strAlcoholic})), [types]);
    const categoryOptions =  useMemo(() => categories?.map(cat=> ({value: cat.strCategory, label: cat.strCategory})), [categories]);

    const animatedComponents = useMemo(()=>makeAnimated(), []);

    const applyFilters= () => {
        const newFilters ={
            types: selectedTypes,
            categories: selectedCategories
        }

        console.log('Applying filters:', newFilters);

        onFilterChange(newFilters);
    }

    const resetFilters = () => {
        setSelectedCategories([]);
        setSelectedTypes([]);
        onFilterChange({
            categories: [],
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