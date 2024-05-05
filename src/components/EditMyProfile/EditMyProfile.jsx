import styles from "./EditMyProfile.module.css";
import validateDOB from "../../helpers/validateDOB.js";
import axios from "axios";
import {useForm} from "react-hook-form";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";
import Button from "../Button/Button.jsx";
import dobToString from "../../helpers/dobToString.js";


function EditMyProfile () {

    const {user, token} = useContext(AuthContext)


    const { handleSubmit, register, formState: {errors}, reset} = useForm({
        defaultValues: {
            username: user.username,
            email: user.email,
            dob: user.dob,
            password: user.password,
        }
    });

    const [loading, setLoading] = useState(false);
    const [formError, setFormError] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        reset({
        username: user.username,
            email: user.email,
            dob: user.dob,
            password: ''
    });
}, [user, reset]);
    const editProfile = async (data) => {

        if (!token) {
            console.error("No token available.");
            return;
        }

        console.log("Attempting to update profile for", data);

        setLoading(true);
        setFormError(null);


        const updateData = {
            name: data.username,
            email: data.email,
            info: data.dob ? dobToString(data.dob) : '',
        };


        if (data.password && data.password.trim() !== '') {
            updateData.password = data.password;
        }

        try  {
            const response = await axios.put(`https://api.datavortex.nl/occo/users/Geesje`, updateData,{
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            console.log("the UpdateData variable", updateData);
            console.log("Sending update with token:", token);
            console.log("Username for update:", user.username);
            console.log("response", response);

            if (response.status === 204) {
                console.log("Profile updated successfully.", response);
                setSuccessMessage("Profile updated successfully!");
                reset(updateData);
                setFormError(null);
            }
        } catch (error) {
            console.error("Failed to update profile:", error);
            setFormError("Failed to update profile. Please try again.");
        }
        setLoading(false);
    };


    return(
        <form onSubmit={handleSubmit(editProfile)} className={styles["update-form"]}>
            <div className={styles["update-inner-container"]}>
                <div className={styles["form-field"]}>
                    <label className={styles["form-field__label"]} htmlFor="username-field">
                        Username
                        <input
                            type="text"
                            id="username-field"
                            {...register("username",{
                                required: "Name is required",
                                minLength:{
                                    value:2,
                                    message: "Name field must at least contain 2 characters"
                                }})}
                        />
                        {errors.username && <p className={styles["form-field__error"]}>{errors.name.message}</p>}
                    </label>
                </div>
                <div className={styles["form-field"]}>
                    <label className={styles["form-field__label"]} htmlFor="email-field">
                        Email:
                        <input
                            type="text"
                            id="email-field"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^\S+@\S+\.\S+$/,
                                    message: "Entered value does not match email format"
                                }
                            })}
                        />
                        {errors.email && <p className={styles["form-field__error"]}>{errors.email.message}</p>}
                    </label>
                </div>
                <div className={styles["form-field"]}>
                    <label className={styles["form-field__label"]} htmlFor="dob-field">
                        Date of Birth
                        <input
                            type="date"
                            id="dob-field"
                            {...register("dob", {
                                required: "this field is required",
                                validate: value => validateDOB(value) || "Invalid date of birth"
                            })}
                        />
                        {errors.dob && <p className={styles["form-field__error"]}>{errors.dob.message}</p>}
                    </label>
                </div>
                <div className={styles["form-field"]}>
                    <label className={styles["form-field__label"]} htmlFor="firstName-field">
                        Password:
                        <input
                            type="password"
                            id="password-field"
                            {...register("password",{
                                minLength:{
                                    value:8,
                                    message: "Password must be at least 8 characters long"
                                }})}
                        />
                        {errors.password && <p className={styles["form-field__error"]}>{errors.password.message}</p>}
                    </label>
                    {formError && <p className="error">{formError}</p>}
                </div>
                <Button type="submit" className={styles.btnUpdate} disabled={loading}>
                    {loading ? "Updating..." : "Update Profile"}
                </Button>
                {successMessage && (
                    <div className={styles["success-message"]}>
                        {successMessage}
                    </div>
                )}

                {formError && (
                    <div className={styles["error-message"]}>
                        {formError}
                    </div>
                )}
            </div>
        </form>

    )
}

export default EditMyProfile;





