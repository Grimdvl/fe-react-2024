import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import type Product from '../../interfaces/Product';
import Button from '../button/Button';
import Loading from '../loading/Loading';
import PageNotFound from '../page-not-found/PageNotFound';
import { fetchData } from '../products/dataFetcher';

import styles from './productPage.module.css';

interface ProductPageProps {
    onAddToCart: (newCartCount: number) => void;
}

const ProductPage: React.FC<ProductPageProps> = ({ onAddToCart }) => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetchData(`http://localhost:3000/products/${id}`).then((data) => {
            const products = data.find((p) => p.id === Number(id)) || null;
            setProduct(products);
            setLoading(false);
        });
    }, [id]);

    const handleAddToCart = () => {
        if (product) {
            const newCartCount = 1;
            onAddToCart(newCartCount);
            localStorage.setItem(`cartCount_${product.id}`, newCartCount.toString());
        }
    };

    if (isLoading) {
        return <Loading />;
    }

    if (!product) {
        return <PageNotFound />;
    }

    return (
        <div className={styles.product}>
            <img className={styles.productImage} src={product.images[0]} alt={product.title} />
            <div className={styles.productDetails}>
                <h1 className={styles.productTitle}>{product.title}</h1>
                <p className={styles.productDescription}>{product.description}</p>
                <p className={styles.productPrice}>{product.price} ₴</p>
                <Button className={styles.addToCartButton} onClick={handleAddToCart}>
                    Add to Cart
                </Button>
            </div>
        </div>
    );
};

export default ProductPage;
