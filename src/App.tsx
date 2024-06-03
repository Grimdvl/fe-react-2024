import { useEffect, useState } from 'react';

import { About } from './components/about/About.tsx';
import { Footer } from './components/footer/Footer.tsx';
import { Header } from './components/header/Header.tsx';
import { Products } from './components/products/Products.tsx';

import './App.css';

function App() {
    const [linkState, setLinkState] = useState({
        about: true,
        products: false,
    });

    const [cartCount, setCartCount] = useState<number>(0);
    const [filters, setFilters] = useState<{ search: string; category: string; sort: string }>({
        search: '',
        category: '',
        sort: 'highestPrice',
    });

    useEffect(() => {
        const savedCartCount = localStorage.getItem('cartCount');
        if (savedCartCount) {
            setCartCount(Number(savedCartCount));
        }
    }, []);

    const onLinkPage = (link: string) => {
        setLinkState({
            ...linkState,
            [link]: true,
            [link === 'about' ? 'products' : 'about']: false,
        });
    };

    const handleAddToCart = (newCartCount: number) => {
        setCartCount(newCartCount);
        localStorage.setItem('cartCount', newCartCount.toString());
    };

    const handleFiltersChange = (newFilters: { search: string; category: string; sort: string }) => {
        setFilters(newFilters);
    };

    return (
        <>
            <header>
                <Header cartCount={cartCount} onLinkPage={onLinkPage} onFiltersChange={handleFiltersChange} />
            </header>
            <main>{linkState.about ? <About /> : <Products onAddToCart={handleAddToCart} filters={filters} />}</main>
            <footer>
                <Footer />
            </footer>
        </>
    );
}

export default App;
