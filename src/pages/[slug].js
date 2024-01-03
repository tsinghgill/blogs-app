import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const DynamicPage = ({ token }) => {
  const router = useRouter();
  const { slug } = router.query;
  const [pageHtml, setPageHtml] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) return;

    const fetchPageHtml = async () => {
      const apiUrl = `https://demo.dotcms.com/api/v1/page/render/${slug}`;
      try {
        const response = await axios.get(apiUrl,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        // console.log(`[DEBUG] [DynamicPage] [fetchPageHtml] response: ${JSON.stringify(response)}`)
        setPageHtml(response.data.entity.page.rendered);
      } catch (error) {
        console.error('Error fetching page:', error);
        setError(error);
      }
    };

    fetchPageHtml();
  }, [slug]);

  if (error) {
    return <div>Error loading page.</div>;
  } else if (!pageHtml) {
    return <div>Loading...</div>;
  }

  return (
    <div dangerouslySetInnerHTML={{ __html: pageHtml }} />
  );
};

export default DynamicPage;
