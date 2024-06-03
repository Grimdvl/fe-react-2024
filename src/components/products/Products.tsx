import { useEffect, useState } from 'react';

import type Product from '../../interfaces/Product';
import Buttons from '../button/Buttons.tsx';
import Pagination from '../pagination/Pagination.tsx';

import { getDefaultCards } from './defaultCards.ts';

import styles from './products.module.css';

interface ProductsProps {
    onAddToCart: (newCartCount: number) => void;
    filters: { search: string; category: string; sort: string };
}

export const Products: React.FC<ProductsProps> = ({ onAddToCart, filters }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setLoading] = useState(true);
    const [cartCounts, setCartCounts] = useState<{ [key: number]: number }>({});
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 8;

    useEffect(() => {
        setLoading(true);
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

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const applyFilters = (productList: Product[]) => {
        let filteredProducts = productList;

        if (filters.search) {
            filteredProducts = filteredProducts.filter((product) => product.title.toLowerCase().includes(filters.search.toLowerCase()));
        }

        if (filters.category) {
            filteredProducts = filteredProducts.filter((product) => product.category.name === filters.category);
        }

        if (filters.sort) {
            switch (filters.sort) {
                case 'highestPrice': {
                    filteredProducts = filteredProducts.sort((a, b) => b.price - a.price);
                    break;
                }
                case 'lowestPrice': {
                    filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
                    break;
                }
                case 'newest': {
                    filteredProducts = filteredProducts.sort((a, b) => b.id - a.id);
                    break;
                }
                case 'oldest': {
                    filteredProducts = filteredProducts.sort((a, b) => a.id - b.id);
                    break;
                }
            }
        }

        return filteredProducts;
    };

    const filteredProducts = applyFilters(products);
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    let content;
    if (isLoading) {
        content = (
            <div className={styles['products-loading']}>
                <i className="bx bx-loader-alt"></i>
            </div>
        );
    } else if (currentProducts.length === 0) {
        content = <div className={styles['products-loading']}>No products found.</div>;
    } else {
        content = (
            <>
                <div className={styles['products__cards']}>
                    {currentProducts.map((product: Product) => (
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
                {filteredProducts.length > productsPerPage && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={Math.ceil(filteredProducts.length / productsPerPage)}
                        onPageChange={handlePageChange}
                    />
                )}
            </>
        );
    }

    return <section className={styles['products']}>{content}</section>;
};
