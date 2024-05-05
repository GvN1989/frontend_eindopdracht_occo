import IconButton from "../IconButton/IconButton.jsx";
import styles from "../../pages/ProductDetail/ProductDetail.module.css";

function Counter({ setCocktailCount, cocktailCount, classnameBtn, classnameSvg, className  }) {


    return (
        <>
            <IconButton
                icon="minus"
                type="button"
                disabled={cocktailCount === 0}
                onClick={() => setCocktailCount(cocktailCount - 1)}
                className={classnameBtn}
                svgClassName={classnameSvg}
            />

            <p className={className}>{cocktailCount}</p>

            <IconButton
                icon="plus"
                type="button"
                onClick={() => setCocktailCount(cocktailCount + 1)}
                className={classnameBtn}
                svgClassName={classnameSvg}
            />
        </>
    );
}


export default Counter;