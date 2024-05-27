import { useEffect, useState } from 'react';

import type Product from '../../interfaces/Product.ts';
import Buttons from '../button/Buttons.tsx';

import { getDefaultCards } from './defaultCards.ts';

import styles from './products.module.css';

interface ProductsProps {
    onAddToCart: (newCartCount: number) => void;
}

export const Products: React.FC<ProductsProps> = ({ onAddToCart }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setLoading] = useState(true);
    const [cartCounts, setCartCounts] = useState<{ [key: number]: number }>({});

    useEffect(() => {
        fetch('http://localhost:3000/cards')
            .then((response) => response.json())
            .then((data) => {
                setProducts(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                const defaultCards = getDefaultCards();
                setProducts(defaultCards);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        const savedCartCounts: { [key: number]: number } = {};
        products.forEach((product) => {
            const count = localStorage.getItem(`cartCount_${product.id}`);
            if (count) {
                savedCartCounts[product.id] = Number.parseInt(count, 10);
            }
        });
        setCartCounts(savedCartCounts);
    }, [products]);

    const handleAddToCart = (productId: number) => {
        const newCartCount = (cartCounts[productId] || 0) + 1;
        const newCartCounts = { ...cartCounts, [productId]: newCartCount };
        setCartCounts(newCartCounts);
        onAddToCart(Object.values(newCartCounts).reduce((a, b) => a + b, 0));
        localStorage.setItem(`cartCount_${productId}`, newCartCount.toString());
    };

    return (
        <section className={styles['products']}>
            {isLoading && (
                <div className={styles['products-loading']}>
                    <i className="bx bx-loader-alt"></i>
                </div>
            )}
            <div className={styles['products__cards']}>
                {products.map((product: Product) => (
                    <div key={product.id} className={styles['products__card']}>
                        <img className={styles['products__card-img']} src={product.images[0]} alt={product.title} />
                        <div className={styles['products__card-info']}>
                            <h3 className={styles['card-title']}>{product.title}</h3>
                            <div className={styles['card__descr']}>
                                <p className={styles['card__descr-price']}>
                                    {product.price}
                                    <span>₴</span>
                                </p>
                                <Buttons className={styles['card__descr--button']} onClick={() => handleAddToCart(product.id)}>
                                    <i className="bx bx-cart"></i>
                                    {cartCounts[product.id] && <span className={styles['cart__count']}>{cartCounts[product.id]}</span>}
                                </Buttons>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};
