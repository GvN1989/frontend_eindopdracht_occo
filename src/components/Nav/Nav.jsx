import styles from "./Nav.module.css";
import {NavLink, useNavigate} from 'react-router-dom';
import {ReactComponent as ShoppingBasket} from "../../assets/svg/basket.svg";
import {ReactComponent as LoggedOut} from "../../assets/svg/user.svg";
import {ReactComponent as Loggedin} from "../../assets/svg/user-check.svg";
import {ReactComponent as Favorite} from "../../assets/svg/heart.svg";
import {AuthContext} from "../../context/AuthContext.jsx";
import {useContext} from "react";
import IconButton from "../IconButton/IconButton.jsx";

function Nav () {

    const { isAuth, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        navigate("/")
    }

        return (
            <nav className={styles["main-navigation"]}>
                <div className={styles["right-nav-container"]}>
                    <ul>
                        <NavLink className={({isActive}) => isActive ? styles["active-link"] : styles["default-link"]} to = "/">Home</NavLink>
                        <NavLink className={({isActive}) => isActive ? styles["active-link"] : styles["default-link"]} to = "/quiz">Inspiration Quiz</NavLink>
                        <NavLink className={({isActive}) => isActive ? styles["active-link"] : styles["default-link"]} to = "/productoverview">CocktailFinder</NavLink>
                    </ul>
                </div>
            <div className={styles["left-nav-container"]}>
                <form onSubmit={handleSearchSubmit} className={styles["search-container"]}>
                    <input
                        type="text"
                        name="searchinput"
                        className={styles["searchInput"]}
                        placeholder="Search"></input>
                    <IconButton icon="search"  ariaLabel="Log out" onClick={handleSearchSubmit}/>
                </form>
                <NavLink className={({isActive}) => isActive ? styles["nav-button-default"] : styles["nav-button-default"]} to = {isAuth? "/profile" : "/login"}>{isAuth ? <Loggedin className={styles["icon-svg"]} /> : <LoggedOut />}</NavLink>
                <NavLink className={({isActive}) => isActive ? styles["nav-button-active"] : styles["nav-button-default"]} to = "/favorites"><Favorite className={styles["icon-svg"]}  /></NavLink>
                <NavLink className={({isActive}) => isActive ? styles["nav-button-active"] : styles["nav-button-default"]} to = "/shoppingbasket"><ShoppingBasket className={styles["icon-svg"]}  /></NavLink>
                <IconButton icon="logout"  ariaLabel="Log out" onClick={logout} />
            </div>
            </nav>

    )
}

export default Nav;