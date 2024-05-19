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

    const handleAddToCart = () => {
        const newCartCount = cartCount + 1;
        setCartCount(newCartCount);
        localStorage.setItem('cartCount', newCartCount.toString());
    };

    return (
        <>
            <header>
                <Header cartCount={cartCount} onLinkPage={onLinkPage} />
            </header>
            <main>{linkState.about ? <About /> : <Products onAddToCart={handleAddToCart} />}</main>
            <footer>
                <Footer />
            </footer>
        </>
    );
}

export default App;
