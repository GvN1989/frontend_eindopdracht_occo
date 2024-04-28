import { useState } from 'react';
import { ReactComponent as Openeye } from '../../assets/svg/eye.svg';
import { ReactComponent as Closedeye } from '../../assets/svg/eye-closed.svg';
import styles from './PasswordInput.module.css';

function PasswordInput({ value, onChange }) {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    return (
        <div className={styles.passwordContainer}>
            <input
                type={isVisible ? 'text' : 'password'}
                className={styles.passwordInput}
                value={value}
                onChange={onChange}
                placeholder="Enter password"
            />
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
        </div>
    );
}

export default PasswordInput;