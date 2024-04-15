import styles from "../../styles/Nav.module.css";
import {NavLink} from 'react-router-dom';
import {ReactComponent as SearchGlass} from "../../assets/svg/magnifying-glass.svg";
import {ReactComponent as ShoppingBasket} from "../../assets/svg/basket.svg";
import {ReactComponent as Profile} from "../../assets/svg/user.svg";
import {ReactComponent as Favorite} from "../../assets/svg/heart.svg";

function Nav () {
        return (
            <nav className={styles.navSite}>
                <ul className={styles.navList}>
                    <NavLink to={"/"} className={styles.navLink}>Home</NavLink>
                    <NavLink to={"/"} className={styles.navLink}>Inspiration Quiz</NavLink>
                    <NavLink to={"/"} className={styles.navLink}>CocktailFinder</NavLink>
                </ul>
            <div className={styles.iconNavList}>
                <span className={styles.searchSite}>
                    <input
                        type="text"
                        name="searchinput"
                        className={styles.searchField}
                        placeholder="Search"></input>
                    <NavLink to={"/"}><SearchGlass className={styles.navSvg}/></NavLink>
                </span>
                <NavLink to={"/"}><Profile className={styles.navSvg}/></NavLink>
                <NavLink to={"/"}><Favorite className={styles.navSvg}/></NavLink>
                <NavLink to={"/"}><ShoppingBasket className={styles.navSvg}/></NavLink>
            </div>
            </nav>

    )
}

export default Nav;