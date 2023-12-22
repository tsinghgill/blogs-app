import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Navbar = () => {
    const [navItems, setNavItems] = useState([]);

    useEffect(() => {
        const fetchNavItems = async () => {
            const response = await axios.get('https://demo.dotcms.com/api/v1/nav');
            setNavItems(response.data.entity);
        };

        fetchNavItems();
    }, []);

    return (
        <nav>
            <ul>
                {navItems.map(item => (
                    <li key={item.href}>
                        <a href={item.href}>{item.title}</a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Navbar;
