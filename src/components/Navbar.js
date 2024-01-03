import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Navbar.module.css'; 
import Link from 'next/link';

const Navbar = ({ token }) => {
    const [navItems, setNavItems] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!token) return;

        const fetchNavItems = async () => {
            try {
                const response = await axios.get('https://demo.dotcms.com/api/v1/nav/', {
                    headers: { Authorization: `Bearer ${token}` },
                    params: { depth: 2 }
                });

                if (response.data && response.data.entity && response.data.entity.children) {
                    // console.log(`[DEBUG] [Navbar] [fetchNavItems] response: ${JSON.stringify(response)}`)
                    setNavItems(response.data.entity.children);
                }
            } catch (error) {
                console.error('Error fetching navigation items:', error);
                setError(error);
            }
        };

        fetchNavItems();
    }, [token]);

    if (error) {
        return <div>Error loading navigation data.</div>;
    }

    return (
        <nav className={styles['navbar']}>
            <ul className={styles['nav-list']}>
                {/* Use Link for internal navigation */}
                <li className={styles['nav-item']}>
                    <Link href="/" className={styles['nav-link']}>
                        Home
                    </Link>
                </li>
                {navItems.map((item, index) => (
                    <li key={index} className={styles['nav-item']}>
                        <Link href={item.href} className={styles['nav-link']}>
                            {item.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Navbar;
