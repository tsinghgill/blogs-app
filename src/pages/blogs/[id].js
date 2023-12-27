import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const BlogDetail = ({ token }) => {
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState(null);

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    // Ensure token is available before making requests
    if (!token) return;

    const fetchBlogDetail = async () => {
      if (!id) return; // Ensure id is present

      try {
        const query = `
          query BlogDetail {
            BlogCollection(query: "identifier:$id") {
              title
              teaser
              postingDate
              tags
              urlTitle
              image {
                versionPath
              }
              blogContent {
                json
              }
            }
          }
        `;

        const response = await axios.post(
          'https://demo.dotcms.com/api/v1/graphql',
          {
            query,
            variables: { id }
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        console.log("BlogDetail response:", response)

        const blogData = response.data.data.BlogCollection;
        if (blogData.length > 0) {
          setBlog(blogData[0]);
        } else {
          setError(new Error('Blog not found'));
        }
      } catch (err) {
        console.error('Error fetching blog details:', err);
        setError(err);
      }
    };

    fetchBlogDetail();
  }, [id, token]); // Depend on id to re-run the effect when it changes

  return (
    <div>
      {error && <p>Error: {error.message}</p>}
      {blog ? (
        <>
          <h1>{blog.title}</h1>
          <p>{blog.teaser}</p>
          {/* Render other blog details as needed */}
          {/* Safely rendering blogContent.json depends on its structure */}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default BlogDetail;
