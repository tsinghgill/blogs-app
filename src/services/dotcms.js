import axios from 'axios';

const API_URL = 'https://demo.dotcms.com/api/v1/authentication/api-token';
const credentials = {
    user: 'admin@dotcms.com',
    password: 'admin',
    expirationDays: 10
};

export const getApiToken = async () => {
    try {
        const response = await axios.post(API_URL, credentials, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data.entity.token;
    } catch (error) {
        console.error('Error fetching API token:', error);
        return null;
    }
};
