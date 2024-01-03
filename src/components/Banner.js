import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Banner.module.css';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Banner = ({ token }) => {
    const [banners, setBanners] = useState([]);
    const [error, setError] = useState(null);
    const baseURL = 'https://demo.dotcms.com';

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 450,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        adaptiveHeight: true
    };

    useEffect(() => {
        if (!token) return;

        const fetchBanners = async () => {
            try {
                const BANNER_QUERY = `
                  query {
                    BannerCollection {
                      title
                      image {
                        path
                      }
                      caption
                    }
                  }
                `;

                const response = await axios.post(
                    `${baseURL}/api/v1/graphql`,
                    { query: BANNER_QUERY },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                // console.log(`[DEBUG] [Banner] [fetchBanners] response: ${JSON.stringify(response)}`)

                const updatedBanners = response.data.data.BannerCollection.map(banner => ({
                    ...banner,
                    image: { ...banner.image, path: baseURL + "/" + banner.image.path }
                }));

                setBanners(updatedBanners);
            } catch (error) {
                console.error('Error fetching banners:', error);
                setError(error);
            }
        };

        fetchBanners();
    }, [token]);

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className={styles['banner-container']}>
            <Slider {...sliderSettings}>
                {banners.map((banner, index) => (
                    <div key={index} className={styles['banner-item']}>
                        <img src={banner.image.path} alt={banner.title} />
                        <div className={styles['caption']}>{banner.caption}</div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default Banner;
