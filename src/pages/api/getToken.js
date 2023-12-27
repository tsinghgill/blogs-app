import axios from 'axios';

export default async function handler(req, res) {
    try {
        const apiUrl = 'https://demo.dotcms.com/api/v1/authentication/api-token';
        const response = await axios.post(apiUrl, {
            user: 'admin@dotcms.com',
            password: 'admin',
            expirationDays: 10
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        res.status(200).json({ token: response.data.entity.token });
    } catch (error) {
        console.error('Error fetching API token:', error);
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error("Data:", error.response.data);
            console.error("Status:", error.response.status);
            console.error("Headers:", error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            console.error("Request:", error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error', error.message);
        }
        res.status(500).json({ error: 'Internal Server Error' });
    }

}
