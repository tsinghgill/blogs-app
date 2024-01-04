import axios from 'axios';

export default async function handler(req, res) {
    try {
        const apiUrl = process.env.DOTCMS_API_URL;
        const username = process.env.DOTCMS_USERNAME;
        const password = process.env.DOTCMS_PASSWORD;
        const expirationDays = process.env.DOTCMS_EXPIRATION_DAYS;

        const response = await axios.post(apiUrl, {
            user: username,
            password: password,
            expirationDays: parseInt(expirationDays)
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
