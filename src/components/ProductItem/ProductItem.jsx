import {Link} from 'react-router-dom';
import styles from './ProductItem.module.css';

function ProductItem({id, title, image, alt, classname}) {
    return (
        <li className={styles.productItem || "productItem"}>
            <Link to={`/productdetail/${id}`} className={styles.productLink || "productLink"}>
                <img src={image} alt={alt} className={classname} />
                <div className={styles.productDetails || "productDetails"}>
                    <h2 className={styles.productTitle}>{title}</h2>
                    <p className={styles.productPrice}>€ 5.95</p>
                </div>
            </Link>
        </li>
    );
}

export default ProductItem;