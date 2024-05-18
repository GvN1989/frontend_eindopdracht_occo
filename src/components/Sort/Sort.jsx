import styles from "./Sort.module.css"
import IconButton from "../IconButton/IconButton.jsx";
import Button from "../Button/Button.jsx";

function Sort({isVisible, sortOption, setSortOption, onClose}) {

    const handleSortChange = (e) => {
        console.log("Selected sort option:", e.target.value);
        setSortOption(e.target.value);
    };

    const resetSort = () => {
        console.log("Resetting sort option")
        setSortOption(" ");
    };

    return isVisible ? (
        <aside className={`${styles.sortPanel} ${isVisible ? styles.visible : ""}`}>
            <div className={styles.flexIconButton}>
                <IconButton
                    icon={"close"}
                    ariaLabel="close"
                    className={styles.btnSpecs}
                    svgClassName={styles.changeFill}
                    onClick={onClose}
                />
            </div>
            <h4 className={styles.sortTitle}>Sort</h4>
            <div className={styles.sortContainer}>
            <fieldset className={styles.fieldSetStyle}>
                <div className={styles.sortOptionsBox}>
                    <label className={styles.sortOptionsLabel}>
                        A-Z
                        <input type="radio"
                               id="az"
                               name="sortOption"
                               value="a-z"
                               checked={sortOption === 'a-z'}
                               onChange={handleSortChange}
                               className={styles.sortCheckbox}
                        />
                    </label>
                </div>
                <div className={styles.sortOptionsBox}>
                    <label className={styles.sortOptionsLabel}>
                        Z-A
                        <input type="radio"
                               id="za"
                               name="sortOption"
                               value="z-a"
                               checked={sortOption === 'z-a'}
                               onChange={handleSortChange}
                               className={styles.sortCheckbox}
                        />
                    </label>
                </div>
            </fieldset>
            </div>
            <div className={styles.filterBtnContainer}>
                <Button className={styles.resetButton} onClick={resetSort}>Reset Sort</Button>
            </div>
        </aside>
    ) : null;
}

export default Sort;
