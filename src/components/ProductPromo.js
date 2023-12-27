import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
        <div className="product-promo-container">
            {/* Map over promos and display them */}
            {promos.map((promo, index) => (
                <div key={index} className="promo-item">
                    <img src={promo.image.path} alt={promo.title} />
                    <h3>{promo.title}</h3>
                    <p>{promo.description}</p>
                    <p>Price: {promo.retailPrice}</p>
                    <p>Sale Price: {promo.salePrice}</p>
                    {/* Add more fields as needed */}
                </div>
            ))}
        </div>
    );
};

export default ProductPromo;
