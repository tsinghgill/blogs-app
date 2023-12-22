import React, { useEffect, useState } from 'react';
import { getApiToken } from '../services/dotcms';

const HomePage = () => {
    const [token, setToken] = useState('');

    useEffect(() => {
        const fetchToken = async () => {
            const apiToken = await getApiToken();
            setToken(apiToken);
        };

        fetchToken();
    }, []);

    // Use the token for authenticated requests

    return (
        <div>
            {/* Page content */}
        </div>
    );
};

export default HomePage;
