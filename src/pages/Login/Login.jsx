import styles from "./Login.module.css";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";
import Button from "../../components/Button/Button.jsx";
import {ReactComponent as WarningCircle} from "../../assets/svg/warning-circle.svg"
import  {useNavigate} from "react-router-dom";
import { ReactComponent as Openeye } from '../../assets/svg/eye.svg';
import { ReactComponent as Closedeye } from '../../assets/svg/eye-closed.svg';
import {useForm} from "react-hook-form";
import axios from "axios";


function Login () {
    const {handleSubmit, register} = useForm();

    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    const {login} = useContext(AuthContext)
    const [error, toggleError] = useState(false);

    const source = axios.CancelToken.source();

    const navigate = useNavigate()

    useEffect(() => {
         return function cleanup() {
             source.cancel();
         }
     }, []);

    async function onSubmit(data) {
        console.log("Submitting inlog form data:", data);
        toggleError(false);

        try {
            const response = await axios.post("https://api.datavortex.nl/occo/users/authenticate",
                {
                    username: `${data.username}`,
                    password: `${data.password}`
                });

            console.log("API response:", response);
            login(response.data.jwt, true)

        } catch (e) {
            console.error("Caught an error during form submission:", e);
            if (e.response) {
                console.error("Server responded with:", e.response.status, e.response.data);
                toggleError(true);
            }
        }
    }



    return(
        <section className="outer-section-container">
            <div className={styles["content-container"]}>
                <div className={styles["register-box"]}>
                    <h1 className={styles.boxTitle}> JOIN CLUB OCCO </h1>
                    <p id={styles["registerText"]}>Create your account today and start exploring exclusive features and personalized cocktail recommendations.
                        Signing up is quick and easy!
                    </p>
                    <Button type="button" className="primary" onClick={() => navigate("/register")}>CREATE AN ACCOUNT</Button>
                    <p id={styles["specialText"]} > <em>Start you flavor adventure with us!</em></p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className={styles.loginForm}>
                <div className={styles["login-box"]}>
                    <h1 className={styles.boxTitle}> LOGIN </h1>
                    <div className={styles["login-input"]}>
                    <label htmlFor="username-field" className={styles["username-label"]}>
                        Username
                    <input
                        type="username"
                        id="username"
                        {...register("username")}
                        placeholder= "Enter username"
                    />
                    </label>
                    <label htmlFor="password" className={styles["login-label"]}>
                        Password
                        <input
                            type={isVisible ? 'text' : 'password'}
                            id="password"
                            placeholder= "Enter password"
                            {...register("password") }
                        />
                    </label>
                        {isVisible?(
                            <Closedeye
                                onClick={toggleVisibility}
                                className={styles.eyeIcon}
                            />
                        ) : (
                            <Openeye
                                onClick={toggleVisibility}
                                className={styles.eyeIcon}
                            />
                        )}
                    <a href="/" id={styles["forgot-my-password"]}>Forgot Password</a>
                    </div>
                    <div className={styles.btnBox}>
                    <Button
                        type="submit"
                        className="primary"
                    >
                        LOGIN
                    </Button>
                        {error && <p style={{ color: "red"}}>{error}</p>}
                    <div className={styles["login-warning"]}>
                        <WarningCircle className={styles["warning-sign"]}/>
                        {/* eslint-disable-next-line react/no-unescaped-entities */}
                    <p className={styles["text-warning"]}>Do you already have an account? Click on 'Forgot Password?' to complete a one-time verification to access it. Your new password must be at least 8 characters long and contain a digit, an uppercase letter, and a special character.</p>
                    </div>
                    </div>
                </div>
            </form>
            </div>
        </section>

    )
}

export default Login;