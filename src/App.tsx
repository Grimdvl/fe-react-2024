import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';

import { About } from './components/about/About';
import { Footer } from './components/footer/Footer';
import { Header } from './components/header/Header';
import LayoutComponent from './components/layout-component/LayoutComponent';
import PageNotFound from './components/page-not-found/PageNotFound';
import { Products } from './components/products/Products';

import './App.css';

function App() {
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

    const handleAddToCart = (newCartCount: number) => {
        setCartCount(newCartCount);
        localStorage.setItem('cartCount', newCartCount.toString());
    };

    const handleFiltersChange = (newFilters: { search: string; category: string; sort: string }) => {
        setFilters(newFilters);
    };

    const handleLinkPage = (link: string) => {};

    return (
        <Router>
            <header>
                <Header cartCount={cartCount} onFiltersChange={handleFiltersChange} onLinkPage={handleLinkPage} />
            </header>
            <LayoutComponent>
                <Routes>
                    <Route path="/fe-react-2024/" element={<About />} index />
                    <Route path="/fe-react-2024/products" element={<Products onAddToCart={handleAddToCart} filters={filters} />} />
                    <Route path="/404" element={<PageNotFound />} />
                    <Route path="*" element={<Navigate to="/404" />} />
                </Routes>
            </LayoutComponent>
            <footer>
                <Footer />
            </footer>
        </Router>
    );
}

export default App;
