import styles from "./Footer.module.css";
import {Link} from "react-router-dom";

function Footer () {
    return(
        <footer className={styles.siteFooter}>

            <nav className={styles.footerNav}>
                <Link to="/" className={styles.navLink}> Over OCCO </Link>
                <Link to="/" className={styles.navLink}> Bestelling</Link>
                <Link to="/" className={styles.navLink}> Contact</Link>
            </nav>
            <p className={styles.footerText}> © OCCO 2024</p>
        </footer>
    )
}

export default Footer;