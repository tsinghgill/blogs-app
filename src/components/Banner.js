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
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        adaptiveHeight: true
    };

    useEffect(() => {
        // Ensure token is available before making requests
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
                      link
                      caption
                    }
                  }
                `;

                const response = await axios.post(
                    'https://demo.dotcms.com/api/v1/graphql',
                    { query: BANNER_QUERY },
                    { headers: { Authorization: `Bearer ${token}` } }
                );

                console.log("banner response:", response);

                setBanners(response.data.data.BannerCollection);
            } catch (error) {
                console.error('Error fetching banners:', error);
                setError(error);
            }
        };

        fetchBanners();
    }, [token]);

    return (
        <div className={styles['banner-container']}>
            <Slider {...sliderSettings}>
                {banners.map((banner, index) => (
                    <div key={index} className={styles['banner-item']}>
                        <a href={banner.link}>
                            <img src={banner.image.path} alt={banner.title} />
                            <div className={styles['caption']}>{banner.caption}</div>
                        </a>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default Banner;
