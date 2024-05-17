import {Link} from 'react-router-dom';
import styles from './ProductItem.module.css';

function ProductItem({id, title, image, alt, classname}) {
    return (
        <li className={"productItem"}>
            <Link to={`/productdetail/${id}`} className={"productLink"}>
                <img src={image} alt={alt} className={classname} />
                <div className={"productDetails"}>
                    <h2 className={styles.productTitle}>{title}</h2>
                    <p className={styles.productPrice}>€ 4.95</p>
                </div>
            </Link>
        </li>
    );
}

export default ProductItem;