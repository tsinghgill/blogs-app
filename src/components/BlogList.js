import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

const BLOG_QUERY = `{
    blogCollection(limit: 5) {
        identifier
        title
    }
}`;


const BlogList = ({ token }) => {
    const [blogs, setBlogs] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Ensure token is available before making requests
        if (!token) return;

        const fetchBlogs = async () => {
            try {
                const response = await axios.post(
                    'https://demo.dotcms.com/api/v1/graphql',
                    { query: BLOG_QUERY },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                console.log("fetchBlogs response:", response)
                setBlogs(response.data.data.blogCollection);
            } catch (err) {
                console.error('Error fetching blogs:', err);
                setError(err);
            }
        };
        
        fetchBlogs();
    }, [token]);

    return (
        <div>
            {error && <p>Error: {error.message}</p>} {/* Display error message */}
            {blogs.map(blog => (
                <div key={blog.identifier}>
                    <h2>
                      <Link href={`/blogs/${blog.identifier}`}>
                        {blog.title}
                      </Link>
                    </h2>
                </div>
            ))}
        </div>
    );
};

export default BlogList;
