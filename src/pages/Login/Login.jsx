import styles from "./Login.module.css";
import {useCallback, useContext, useState} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";
import Button from "../../components/Button/Button.jsx";
import {ReactComponent as WarningCircle} from "../../assets/svg/warning-circle.svg"
import  {useNavigate} from "react-router-dom";
import PasswordInput from "../../components/PasswordInput/PasswordInput.jsx";


function Login (callback, deps) {


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState('');
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        login (email, password).then(() => {
            navigate('/');
        }).catch(error => {
            console.error("Login failed", error);
            setLoginError("Incorrect email or password.")
        });
        setEmail("");
        setPassword("");
    };

    return(
        <section className="outer-section-container">
            <div className={styles["content-container"]}>
                <div className={styles["register-box"]}>
                    <h1 className={styles.boxTitle}> JOIN CLUB OSSO </h1>
                    <p id={styles["registerText"]}>Create your account today and start exploring exclusive features and personalized cocktail recommendations.
                        Signing up is quick and easy!
                    </p>
                    <Button type="button" className="primary" onClick={() => navigate("/register")}>CREATE AN ACCOUNT</Button>
                    <p id={styles["specialText"]} > <em>Start you flavor adventure with us!</em></p>
                </div>
            <form className={styles ["form-container"]} onSubmit={handleSubmit}>
                <div className={styles["login-box"]}>
                    <h1 className={styles.boxTitle}> LOGIN </h1>
                    <div className={styles["login-input"]}>
                    <label htmlFor="email" className={styles["login-label"]}>Email adres</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder= "Enter email adress"
                    />

                    <label htmlFor="password" className={styles["login-label"]}>Password:</label>
                    <PasswordInput
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <a href="/" id={styles["forgot-my-password"]}>Forgot Password</a>
                    </div>

                <Button type="submit" className="primary">LOGIN</Button>
                    {loginError && <p style={{ color: "red"}}>{loginError}</p>}

                    <div className={styles["login-warning"]}>
                    <WarningCircle className={styles["warning-sign"]}/>
                    <p className={styles["text-warning"]}>Do you already have an account? Click on 'Forgot Password?' to complete a one-time verification to access it. Your new password must be at least 8 characters long and contain a digit, an uppercase letter, and a special character.</p>
                    </div>
                </div>
            </form>
            </div>
        </section>

    )
}

export default Login;