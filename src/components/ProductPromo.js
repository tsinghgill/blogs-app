import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getApiToken } from '../services/dotcms';

const ProductPromo = () => {
    const [promos, setPromos] = useState([]);

    useEffect(() => {
        const fetchProductPromos = async () => {
            const token = await getApiToken();
            // Use actual GraphQL query to fetch product promos
            const PROMO_QUERY = `{ productPromoCollection { title, description, imageUrl } }`;

            const response = await axios.post(
                'https://demo.dotcms.com/api/v1/graphql',
                { query: PROMO_QUERY },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setPromos(response.data.data.productPromoCollection);
        };

        fetchProductPromos();
    }, []);

    return (
        <div className="product-promo">
            {promos.map((promo, index) => (
                <div key={index} className="promo">
                    <img src={promo.imageUrl} alt={promo.title} />
                    <h3>{promo.title}</h3>
                    <p>{promo.description}</p>
                </div>
            ))}
        </div>
    );
};

export default ProductPromo;
