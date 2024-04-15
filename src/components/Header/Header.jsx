import styles from  "../../styles/Header.module.css";
import Nav from "/src/components/Nav/Nav.jsx";
import logo from "../../assets/images/LOGO_OCCO.png";

function Header ( ){
    return (
        <header className={styles.headerSite}>
            <>
                    <img className={styles.headerLogo}
                         src={logo}
                         alt="Logo OCCO"/>

                <Nav className={styles.headerNav}/>
            </>
        </header>


    )
}

export default Header;