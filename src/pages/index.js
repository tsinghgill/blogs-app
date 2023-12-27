import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import BlogList from '../components/BlogList';
import Banner from '../components/Banner';
import ProductPromo from '../components/ProductPromo';
import styles from './index.module.css'; // Import the CSS Modules styles

const HomePage = () => {
    const [token, setToken] = useState('');

    useEffect(() => {
        const fetchToken = async () => {
            const response = await fetch('/api/getToken');
            const data = await response.json();
            if (response.ok) {
                setToken(data.token);
            } else {
                console.error('Error fetching token');
            }
        };
    
        fetchToken();
    }, []);

    return (
        <div className={styles['main-container']}>
            <Navbar token={token} />
            <div className={styles['banner-section']}>
                <Banner token={token} />
            </div>
            <h1 className={styles['main-heading']}>Blogs</h1>
            <div className={styles['section']}>
                <BlogList token={token} />
            </div>
            <h1 className={styles['main-heading']}>Product Promos</h1>
            <div className={`${styles['section']} ${styles['product-promo-section']}`}>
                <ProductPromo token={token} />
            </div>
        </div>
    );
};

export default HomePage;
