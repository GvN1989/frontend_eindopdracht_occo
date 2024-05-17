import styles from "./Profile.module.css"
import Button from "../../components/Button/Button.jsx";
import IconButton from "../../components/IconButton/IconButton.jsx";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";
import EditMyProfile from "../../components/EditMyProfile/EditMyProfile.jsx";
import {useNavigate} from "react-router-dom";

function Profile () {
    const [activeSection, setActiveSection] = useState("profile");
    const [isEditing, setIsEditing] = useState(false);
    const {user, isAuth, logout} = useContext(AuthContext)
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuth) {
            logout();
            navigate("/login", { replace: true });
        }
    }, [isAuth, logout, navigate]);

    const handleEdit = () => {
        setIsEditing(!isEditing);
    };

    useEffect(() => {

    }, [user]);

    if (!user) {
        return <div>Loading your profile...</div>;
    }


    const renderSection = () => {
        switch (activeSection) {
            case "profile":
                return (
                    <section id="profile" className={styles.profileContent}>
                        <div className={styles["profile-outer-container"]}>
                            <div className={styles["profile-inner-container"]}>
                                <div className={styles["title-left-flex"]}>
                                    <h2 className={styles["section-title"]}> My Personal Data </h2>
                                </div>
                                <div className={styles["profile-personal-info"]}>
                                    <ul className={styles["profile-info"]}>
                                        <li>Username: {user.username}  </li>
                                        <li>Date of Birth: {user.info}  </li>
                                        <li>Email: {user.email} </li>
                                    </ul>
                                    <div className={isEditing ? styles["profile-editing-container"] : styles["profile-button-container"]}>
                                        <Button
                                            onClick={handleEdit}
                                            Button type="button"
                                            className={isEditing ? styles.editingBtn : styles.cancelBtn }
                                        >
                                            {isEditing ? 'Cancel Edit' : 'Edit Profile'}
                                        </Button>
                                        {isEditing && <EditMyProfile />}
                                    </div>
                                </div>
                                <div className={styles["profile-shipping-info"]}>
                                    <ul className={styles["shipping-info"]}>
                                        <li> Shipping Adress</li>
                                        <li> Billing Adress</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>
                );
            case "purchases":
                return (
                    <section id="purchases" className={styles.profileContent}>
                        <div className={styles["profile-outer-container"]}>
                            <div className={styles["profile-inner-container"]}>
                                <div className={styles["title-left-flex"]}>
                                    <h2 className={styles["section-title"]}> My Purchases </h2>
                                </div>
                                <div className={styles["profile-personal-info"]}>
                                </div>
                            </div>
                        </div>
                    </section>
                );
            case "favorites":
                return (
                    <section id="favorites" className={styles.profileContent}>
                        <div className={styles["profile-outer-container"]}>
                            <div className={styles["profile-inner-container"]}>
                                <div className={styles["title-left-flex"]}>
                                    <h2 className={styles["section-title"]}> My Favorites </h2>
                                </div>
                                <div className={styles["profile-personal-info"]}>
                                </div>
                            </div>
                        </div>
                    </section>
                );
            case "quiz":
                return (
                    <section id="quiz" className={styles.profileContent}>
                        <div className={styles["profile-outer-container"]}>
                            <div className={styles["profile-inner-container"]}>
                                <div className={styles["title-left-flex"]}>
                                    <h2 className={styles["section-title"]}> My Quiz Results </h2>
                                </div>
                                <div className={styles["profile-personal-info"]}>
                                </div>
                            </div>
                        </div>
                    </section>
                );

            default:
                return null;

        }
    }

return (
    <>
        <h1 className={styles.profileHeader}> Hello {user.username}   </h1>
        <div className={styles["profile-nav-container"]}>
            <ul className={styles["profile-nav-list"]}>
                <a href="#" onClick={() => setActiveSection('profile')} className={styles["profile-link"]}>MY PROFILE</a>
                <a href="#" onClick={() => setActiveSection('purchases')} className={styles["profile-link"]}>MY PURCHASES</a>
                <a href="#" onClick={() => setActiveSection('favorites')} className={styles["profile-link"]}>MY FAVORITES</a>
                <a href="#" onClick={() => setActiveSection('quiz')} className={styles["profile-link"]}>MY QUIZ RESULTS</a>
            </ul>
            <div className={styles["profile-logout"]}>
                <IconButton icon="logout" ariaLabel="Log out" onClick={logout}/>
            </div>
        </div>
        {renderSection()}
    </>
)
}
export default Profile;