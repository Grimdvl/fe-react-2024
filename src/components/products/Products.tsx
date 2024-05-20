import React, { useEffect, useState } from 'react';

import type Product from '../../interfaces/Product.ts';
import Buttons from '../button/Buttons.tsx';

import { getDefaultCards } from './defaultCards.ts';

import './products.css';

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
        <section className="products">
            {isLoading && (
                <div className="products-loading">
                    <i className="bx bx-loader-alt"></i>
                </div>
            )}
            <form className="filters__search">
                <input className="filters__search-input" placeholder="Search..." type="search" id="search" name="search" />
                <label className="filters__search-icon" htmlFor="search">
                    <i className="bx bx-search"></i>
                </label>
            </form>
            <form className="products__filters"></form>
            <div className="products__cards">
                {products.map((product: Product) => (
                    <div key={product.id} className="products__card">
                        <img className="products__card-img" src={product.images[0]} alt={product.title} />
                        <div className="products__card-info">
                            <h3 className="card-title">{product.title}</h3>
                            <div className="card__descr">
                                <p className="card__descr-price">
                                    {product.price}
                                    <span>₴</span>
                                </p>
                                <Buttons className="card__descr--button" onClick={() => handleAddToCart(product.id)}>
                                    <i className="bx bx-cart"></i>
                                    {cartCounts[product.id] && <span className="cart__count">{cartCounts[product.id]}</span>}
                                </Buttons>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};
