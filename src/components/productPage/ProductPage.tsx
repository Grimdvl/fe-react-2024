import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import type Product from '../../interfaces/Product';
import Button from '../button/Button';
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
        return (
            <div className={styles['product-loading']}>
                <i className="bx bx-loader-alt"></i>
            </div>
        );
    }

    if (!product) {
        return <div className={styles.error}>Product not found.</div>;
    }

    return (
        <div className={styles['product']}>
            <img className={styles['product-img']} src={product.images[0]} alt={product.title} />
            <div className={styles['product__descr']}>
                <h2 className={styles['product__descr-title']}>{product.title}</h2>
                <p className={styles['product__descr-text']}>{product.description}</p>
                <p className={styles['product__descr-price']}>{product.price} ₴</p>
                <Button className={styles['product__descr--button']} onClick={handleAddToCart}>
                    <i className="bx bx-cart"></i> Add to Cart
                </Button>
            </div>
        </div>
    );
};

export default ProductPage;
