import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './ProductPromo.module.css'; // Import the CSS Modules styles

const ProductPromo = ({ token }) => {
    // State for promos and error
    const [promos, setPromos] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Ensure token is available before making requests
        if (!token) return;
        // Async function to fetch product promos
        const fetchProductPromos = async () => {
            try {
                // GraphQL query to fetch product promos
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

                // Fetch product promos using axios
                const response = await axios.post(
                    'https://demo.dotcms.com/api/v1/graphql',
                    { query: PROMO_QUERY },
                    { headers: { Authorization: `Bearer ${token}` } }
                );

                // Set promos data
                setPromos(response.data.data.ProductCollection);
            } catch (err) {
                // Handle errors
                console.error('Error fetching product promos:', err);
                setError(err);
            }
        };

        // Invoke the fetch function
        fetchProductPromos();
    }, [token]);

    return (
        <div className={styles['product-promo-container']}>
            {/* Map over promos and display them */}
            {promos.map((promo, index) => (
                <div key={index} className={styles['promo-item']}>
                    <img src={promo.image.path} alt={promo.title} />
                    <h3 className={styles['promo-title']}>{promo.title}</h3>
                    <p className={styles['promo-description']}>{promo.description}</p>
                    <p className={styles['promo-price']}>Price: {promo.retailPrice}</p>
                    <p className={styles['promo-price']}>Sale Price: {promo.salePrice}</p>
                    {/* Add more fields as needed */}
                </div>
            ))}
        </div>
    );
};

export default ProductPromo;
