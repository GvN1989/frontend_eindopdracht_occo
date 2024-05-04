import { ReactComponent as LogoutIcon } from "../../assets/svg/sign-out.svg";
import { ReactComponent as SearchIcon } from "../../assets/svg/magnifying-glass.svg";
import {ReactComponent as IconLeft} from "../../assets/svg/caret-circle-left.svg";
import {ReactComponent as IconRight} from "../../assets/svg/caret-circle-right.svg";
import {ReactComponent as Sort} from "../../assets/svg/sort-ascending.svg"
import {ReactComponent as Filter} from "../../assets/svg/sliders-horizontal.svg"
import {ReactComponent as Close} from "../../assets/svg/minus.svg"
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
        case 'sort':
            Icon= Sort;
            break;
        case 'filter':
            Icon= Filter;
            break;
        case 'close':
            Icon= Close;
            break;
        default:
            return null;
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