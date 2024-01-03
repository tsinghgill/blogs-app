import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from './BlogDetail.module.css';

const BlogDetail = ({ token }) => {
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState(null);

  const router = useRouter();
  const { id } = router.query;
  // console.log(`[DEBUG] [BlogDetail] router.query: ${JSON.stringify(router.query)}`)


  useEffect(() => {
    const fetchBlogDetail = async () => {
      if (!id) return;

      try {
        const query = `
          query BlogDetail {
            BlogCollection(query: "identifier:$id") {
              identifier
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
        // console.log(`[DEBUG] [BlogDetail] [fetchBlogDetail] response: ${JSON.stringify(response)}`)

        const matchingBlog = response.data.data.BlogCollection.find(blog => blog.identifier === id);
        if (matchingBlog) {
          setBlog(matchingBlog);
        } else {
          setError(new Error('Blog not found'));
        }
      } catch (err) {
        console.error('Error fetching blog details:', err);
        setError(err);
      }
    };

    fetchBlogDetail();
  }, [id]);

  return (
    <div className={styles['blog-detail-container']}>
      {error && <p className={styles['error-message']}>Error: {error.message}</p>}
      {blog ? (
        <>
          <h1 className={styles['blog-title']}>{blog.title}</h1>
          <p className={styles['blog-teaser']}>{blog.teaser}</p>
          <p className={styles['blog-posting-date']}>Posting Date: {blog.postingDate}</p>
          <p className={styles['blog-tags']}>Tags: {blog.tags.join(', ')}</p>
          <p className={styles['blog-url-title']}>URL Title: {blog.urlTitle}</p>
          {/* Render other blog details as needed */}
          <div
            className={styles['blog-content']}
            dangerouslySetInnerHTML={{ __html: blog.blogContent.json }}
          />
        </>
      ) : (
        <p className={styles['loading-message']}>Loading...</p>
      )}
    </div>
  );
};

export default BlogDetail;
