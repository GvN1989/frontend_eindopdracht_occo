import styles from "./Profile.module.css"
import {useNavigate} from "react-router-dom";
import Button from "../../components/Button/Button.jsx";

function Profile () {
    const navigate = useNavigate()

    return(
        <section>
            <h1 className={styles.h1}> Hello (User) </h1>
            <div>
            <ul>
                <li>MY PROFILE</li>
                <li>MY PURCHASE</li>
                <li>MY FAVORITES</li>
                <li>MY QUIZ RESULTS </li>
                <li> LOG OUT </li>
            </ul>
            </div>
            <div>
            <h2> My personal Data </h2>
            </div>
            <div>
            <li>First en Last Name</li>
            <li>Date of Birth </li>
            <li>Email</li>
            </div>
            <div>
            <h2> Shipping Adress </h2>
            <h2> Billing Adress </h2>
            </div>
            <div>
            <Button> Edit My Profile </Button>
            <Button> Change Password </Button>
            </div>
        </section>

    )

}

export default Profile;