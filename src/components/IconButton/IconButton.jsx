import { ReactComponent as LogoutIcon } from "../../assets/svg/sign-out.svg";
import { ReactComponent as SearchIcon } from "../../assets/svg/magnifying-glass.svg";
import {ReactComponent as IconLeft} from "../../assets/svg/caret-circle-left.svg";
import {ReactComponent as IconRight} from "../../assets/svg/caret-circle-right.svg";
import styles from "../IconButton/IconButton.module.css"

export const IconButton = ({ icon, onClick, ariaLabel, svgClassName, className, disabled }) => {
    let Icon;
    switch (icon) {
        case 'logout':
            Icon = LogoutIcon;
            break;
        case 'search':
            Icon = SearchIcon;
            break;
        case 'icon-left':
            Icon = IconLeft;
            break;
        case 'icon-right':
            Icon = IconRight;
            break;
        default:
            return null;  // or handle the default case as needed
    }

    return (
        <button onClick={onClick}
                aria-label={ariaLabel}
                className={`${styles['icon-button']} ${className || ''}`}
                disabled={disabled}
        >
            <Icon className={`${styles['icon-svg']} ${svgClassName || ''}`} />
        </button>
    );
};

export default IconButton;