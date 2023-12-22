import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { getApiToken } from '../../services/dotcms';

const BlogDetail = () => {
    const [blog, setBlog] = useState(null);
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        const fetchBlogDetail = async () => {
            const token = await getApiToken();
            // Use actual GraphQL query for blog details
            const BLOG_DETAIL_QUERY = `{
                blogDetailCollection(query: "identifier:${id}") {
                    title
                    bodyField
                }
            }`;

            const response = await axios.post(
                'https://demo.dotcms.com/api/v1/graphql',
                { query: BLOG_DETAIL_QUERY },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setBlog(response.data.data.blogDetailCollection[0]);
        };

        if (id) {
            fetchBlogDetail();
        }
    }, [id]);

    return (
        <div>
            {blog ? (
                <>
                    <h1>{blog.title}</h1>
                    <div dangerouslySetInnerHTML={{ __html: blog.bodyField }} />
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default BlogDetail;
