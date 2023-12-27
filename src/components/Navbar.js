import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Navbar = ({ token }) => {
    const [navItems, setNavItems] = useState([]);
    const [error, setError] = useState(null);
    const navItemPaths = ["blog", "contact-us"]; // List of nav item paths

    useEffect(() => {
        // Ensure token is available before making requests
        if (!token) return;

        const fetchNavItems = async () => {
            try {
                const navData = [];

                for (const path of navItemPaths) {
                    const response = await axios.get(`https://demo.dotcms.com/api/v1/nav/${path}`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });

                    if (response.data && response.data.entity) {
                        navData.push({
                            title: response.data.entity.title,
                            href: response.data.entity.href
                        });
                    }
                }

                setNavItems(navData);
            } catch (err) {
                console.error('Error fetching navigation items:', err);
                setError(err);
            }
        };

        fetchNavItems();
    }, [token]); // Add token as a dependency

    if (error) {
        return <div>Error loading navigation data.</div>;
    }

    return (
        <nav>
            <ul>
                {navItems.map((item, index) => (
                    <li key={index}>
                        <a href={item.href}>{item.title}</a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Navbar;
