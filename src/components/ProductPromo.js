import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './ProductPromo.module.css'; // Import the CSS Modules styles

const ProductPromo = ({ token }) => {
    const [promos, setPromos] = useState([]);
    const [error, setError] = useState(null);
    const baseURL = 'https://demo.dotcms.com'; // Define the base URL

    useEffect(() => {
        if (!token) return;

        const fetchProductPromos = async () => {
            try {
                const PROMO_QUERY = `
                  query {
                    ProductCollection {
                      title
                      description
                      image {
                        path
                      }
                      retailPrice
                      salePrice
                    }
                  }
                `;

                const response = await axios.post(
                    `${baseURL}/api/v1/graphql`,
                    { query: PROMO_QUERY },
                    { headers: { Authorization: `Bearer ${token}` } }
                );

                const updatedPromos = response.data.data.ProductCollection.map(promo => ({
                    ...promo,
                    image: { ...promo.image, path: baseURL + promo.image.path }
                }));

                setPromos(updatedPromos);
            } catch (err) {
                console.error('Error fetching product promos:', err);
                setError(err);
            }
        };

        fetchProductPromos();
    }, [token]);

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className={styles['product-promo-container']}>
            {promos.map((promo, index) => (
                <div key={index} className={styles['promo-item']}>
                    <img src={promo.image.path} alt={promo.title} />
                    <h3 className={styles['promo-title']}>{promo.title}</h3>
                    <p className={styles['promo-description']}>{promo.description}</p>
                    <p className={styles['promo-price']}>Price: {promo.retailPrice}</p>
                    <p className={styles['promo-sale-price']}>Sale Price: {promo.salePrice}</p>
                </div>
            ))}
        </div>
    );
};

export default ProductPromo;
