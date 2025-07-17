import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useApi } from '../api/useApi';

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { getPost } = useApi();

  useEffect(() => {
    setLoading(true);
    setError(null);
    getPost(id)
      .then(res => setPost(res.data))
      .catch(err => setError(err.message || 'Failed to load post'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Loading post...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (!post) return <p>Post not found.</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
      <p className="mb-4">{post.content}</p>
    </div>
  );
}