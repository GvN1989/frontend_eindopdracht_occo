import styles from "./Filter.module.css";
import {useMemo, useState} from 'react';
import Button from "../Button/Button.jsx";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import IconButton from "../IconButton/IconButton.jsx";

function Filter({isVisible, onFilterChange, onClose, cocktails}) {

    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedTypes, setSelectedTypes] = useState([]);

    const typeOptions = useMemo(() => [
        {value: 'Alcoholic', label: 'Alcoholic'},
        {value: 'Non Alcoholic', label: 'Non Alcoholic'},
    ], []);

    const categoryOptions = useMemo(() => {
        if (!cocktails) return [];
        const uniqueCategories = new Set(cocktails.map(cocktail => cocktail.strCategory));
        return Array.from(uniqueCategories).map(category => ({value: category, label: category}));
    }, [cocktails]);

    const animatedComponents = useMemo(() => makeAnimated(), []);

    const applyFilters = () => {
        const filters = {
            types: selectedTypes,
            categories: selectedCategories
        };

        onFilterChange(filters);
    };

    const resetFilters = () => {
        setSelectedCategories([]);
        setSelectedTypes([]);
        onFilterChange({
            categories: [],
            types: [],
        });
    };
    return isVisible ? (
        <aside className={styles.filterPanel}>
            <div className={styles.flexIconButton}>
                <IconButton
                    icon={"close"}
                    ariaLabel="close"
                    className={styles.btnSpecs}
                    svgClassName={styles.changeFill}
                    onClick={onClose}
                />
            </div>
            <h4 className={styles.filterTitle}>Filters</h4>
            <div className={styles.filterContainer}>
                <label>
                    Alcohol preference
                            <Select
                                components={animatedComponents}
                                isMulti
                                options={typeOptions}
                                onChange={selectedOptions => setSelectedTypes(selectedOptions.map(option => option.value))}
                                placeholder="Select drink type ..."

                            />
                </label>
                <label>
                    Category
                            <Select
                                components={animatedComponents}
                                isMulti
                                options={categoryOptions}
                                onChange={selectedOptions => setSelectedCategories(selectedOptions.map(option => option.value))}
                                placeholder="Select categories..."

                            />
                </label>
            </div>
            <div className={styles.filterBtnContainer}>
                <Button className={"primary"} onClick={applyFilters}>Apply Filters</Button>
                <Button className={styles.resetButton} onClick={resetFilters}>Reset Filters</Button>
            </div>

        </aside>

    ) : null;
}

export default Filter;