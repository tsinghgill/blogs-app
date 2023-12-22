import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getApiToken } from '../services/dotcms';

// Example Query
// const BLOG_QUERY = `{
//     blogCollection(limit: 10) {
//       title
//       summaryField
//     }
//   }`;  

const BlogList = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            const token = await getApiToken();
            const response = await axios.post(
                'https://demo.dotcms.com/api/v1/graphql',
                { query: BLOG_QUERY },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setBlogs(response.data.data.blogCollection);
        };

        fetchBlogs();
    }, []);

    return (
        <div>
            {blogs.map(blog => (
                <div key={blog.title}>
                    <h2>{blog.title}</h2>
                    <p>{blog.summaryField}</p>
                </div>
            ))}
        </div>
    );
};

export default BlogList;
