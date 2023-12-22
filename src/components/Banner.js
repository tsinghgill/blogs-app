import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getApiToken } from '../services/dotcms';
import Swiper from 'react-id-swiper'; // or any other carousel library

const Banner = () => {
    const [banners, setBanners] = useState([]);

    useEffect(() => {
        const fetchBanners = async () => {
            const token = await getApiToken();
            // Replace with actual GraphQL query to fetch banners
            const BANNER_QUERY = `{ bannerCollection { imageUrl, link } }`;

            const response = await axios.post(
                'https://demo.dotcms.com/api/v1/graphql',
                { query: BANNER_QUERY },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setBanners(response.data.data.bannerCollection);
        };

        fetchBanners();
    }, []);

    const params = {
        // Parameters for the Swiper carousel
    };

    return (
        <Swiper {...params}>
            {banners.map((banner, index) => (
                <div key={index}>
                    <a href={banner.link}>
                        <img src={banner.imageUrl} alt="Banner" />
                    </a>
                </div>
            ))}
        </Swiper>
    );
};

export default Banner;
