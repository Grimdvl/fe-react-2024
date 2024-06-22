import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import type Product from '../../interfaces/Product';
import Button from '../button/Button';
import Loading from '../loading/Loading';
import PageNotFound from '../page-not-found/PageNotFound';
import { fetchData } from '../products/dataFetcher';

import styles from './productPage.module.css';

interface ProductPageProps {
    onAddToCart: (productId: number) => void;
}

const ProductPage: React.FC<ProductPageProps> = ({ onAddToCart }) => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [isLoading, setLoading] = useState(true);
    const [mainImage, setMainImage] = useState<string>('');

    useEffect(() => {
        setLoading(true);
        fetchData(`http://localhost:3000/products/${id}`).then((data) => {
            const products = data.find((p) => p.id === Number(id)) || null;
            setProduct(products);
            if (products && products.images.length > 0) {
                setMainImage(products.images[0]);
            }
            setLoading(false);
        });
    }, [id]);

    const handleAddToCart = () => {
        if (product) {
            onAddToCart(product.id);
        }
    };

    const handleImageClick = (image: string) => {
        setMainImage(image);
    };

    if (isLoading) {
        return <Loading />;
    }

    if (!product) {
        return <PageNotFound />;
    }

    return (
        <div className={styles['product']}>
            <div className={styles['product__img']}>
                <div className={styles['product__img-wrapper']}>
                    {product.images.map((image, index) => (
                        <img
                            key={index}
                            className={styles['img-secondary']}
                            src={image}
                            alt={product.title}
                            onClick={() => handleImageClick(image)}
                        />
                    ))}
                </div>
                <img className={styles['product__img-primary']} src={mainImage} alt={product.title} />
            </div>
            <div className={styles['product__descr']}>
                <Button className={styles['product__descr--back']} onClick={() => window.history.back()}>
                    <i className="bx bx-chevron-left"></i>
                    Back
                </Button>
                <h2 className={styles['product__descr-title']}>{product.title}</h2>
                <Button className={styles['product__descr--category']} onClick={() => {}}>
                    {product.category.name}
                </Button>
                <p className={styles['product__descr-text']}>{product.description}</p>
                <div className={styles['product__descr-price']}>
                    <p className={styles['price__number']}>
                        {product.price} <span className={styles['price__num-sumbol']}>₴</span>
                    </p>
                    <Button className={styles['price--add']} onClick={handleAddToCart}>
                        <i className="bx bx-cart"></i>
                        Add to Cart
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;
