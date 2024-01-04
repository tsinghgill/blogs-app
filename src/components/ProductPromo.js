import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './ProductPromo.module.css';

const ProductPromo = ({ token }) => {
    const [promos, setPromos] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!token) return;

        const fetchProductPromos = async () => {
            try {
                const PROMO_QUERY = `
                  query {
                    ProductCollection(limit: 10) {
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
                    `https://demo.dotcms.com/api/v1/graphql`,
                    { query: PROMO_QUERY },
                    { headers: { Authorization: `Bearer ${token}` } }
                );

                const updatedPromos = response.data.data.ProductCollection.map(promo => {
                    // Extracting UUID
                    const parts = promo.image.path.split('/');
                    const uuid = parts[2];
        
                    // Constructing new URL
                    const newImageUrl = `https://demo.dotcms.com/contentAsset/image/${uuid}/image/quality_q/1`;
        
                    return {
                        ...promo,
                        image: { ...promo.image, path: newImageUrl }
                    };
                });
                
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
                    <div
                        className={styles['promo-description']}
                        dangerouslySetInnerHTML={{ __html: promo.description }}
                    />
                    <p className={styles['promo-price']}>Price: {promo.retailPrice}</p>
                    {promo.salePrice && (
                        <p className={styles['promo-sale-price']}>Sale Price: {promo.salePrice}</p>
                    )}
                </div>
            ))}
        </div>
    );
};

export default ProductPromo;