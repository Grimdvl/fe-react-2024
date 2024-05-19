import React, { useEffect, useState } from 'react';

import type Product from '../../interfaces/Product.ts';
import Buttons from '../button/Buttons.tsx';

import { getDefaultCards } from './defaultCards.ts';

import './products.css';

interface ProductsProps {
    onAddToCart: () => void;
}

export const Products: React.FC<ProductsProps> = ({ onAddToCart }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setLoading] = useState(true);

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

    return (
        <section className="products">
            {isLoading && (
                <div className="products-loading">
                    <i className="bx bx-loader-alt"></i>
                </div>
            )}
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
                            <Buttons className="card__descr--button" onClick={onAddToCart}>
                                <i className="bx bx-cart"></i>
                            </Buttons>
                        </div>
                    </div>
                </div>
            ))}
        </section>
    );
};
