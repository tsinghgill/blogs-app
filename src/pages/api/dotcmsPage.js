import axios from 'axios';

export default async function handler(req, res) {
    const pagePath = req.query.pagePath;
    try {
        const apiUrl = `https://demo.dotcms.com/api/v1/page/json/${pagePath}`;
        const response = await axios.get(apiUrl, {
            headers: { Authorization: `Bearer YOUR_DOTCMS_API_TOKEN` } // Replace with actual token
        });
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error fetching page from dotCMS:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
