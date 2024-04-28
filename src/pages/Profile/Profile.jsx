import styles from "./Profile.module.css"
import {useNavigate} from "react-router-dom";

function Profile () {
    const navigate = useNavigate()

    return(
        <section className="outer-content-container">
            <h1 className={styles.h1}> Profile </h1>
        </section>

    )

}

export default Profile;