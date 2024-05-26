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
            <form className={styles['products__filters']}>
                <div className={styles['products__filters-search']}>
                    <input className={styles['filters__search-input']} placeholder="Search..." type="search" id="search" name="search" />
                    <label className={styles['filters__search-icon']} htmlFor="search">
                        <i className="bx bx-search"></i>
                    </label>
                </div>
                <Buttons className={styles['products__filters-electronics']}>Electronics</Buttons>
                <Buttons className={styles['products__filters-shoes']}>Shoes</Buttons>
                <Buttons className={styles['products__filters-clothes']}>Clothes</Buttons>
                <div className={styles['products__filters-sort']}>
                    <label htmlFor="sort">Sort by:</label>
                    <select data-type="select" title="type" name="sort" id="sort">
                        <option value="High" selected>
                            Price (High - Low)
                        </option>
                        <option value="Low">Price (Low - High)</option>
                        <option value="Newest">Newest</option>
                        <option value="Oldest">Oldest</option>
                    </select>
                </div>
            </form>
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
