import styles from "./Filter.module.css";
import {useMemo, useState} from 'react';
import Button from "../Button/Button.jsx";
import useFetchCocktailData from "../useFetchCocktailData/useFetchCocktailData.jsx";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import IconButton from "../IconButton/IconButton.jsx";

function Sort({isVisible, onFilterChange, onClose}){

    const sortedAndFilteredCocktails = useMemo(() => {
        let sortedCocktails = [...filteredCocktails]; // Copy to avoid mutating the original array
        if (sortCriteria) {
            sortedCocktails.sort((a, b) => {
                if (sortCriteria === 'name') {
                    return a.strDrink.localeCompare(b.strDrink); // Sort by name
                } else if (sortCriteria === 'value') {
                    return a.value - b.value; // Sort by value, assuming 'value' is a numeric property
                }
                return 0;
            });
        }
        return sortedCocktails;
    }, [filteredCocktails, sortCriteria]);


    return isVisible ? (
        <aside className={styles.filterPanel}>
            <h4>Sort</h4>
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

