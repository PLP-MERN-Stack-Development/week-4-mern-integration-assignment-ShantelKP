import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useApi } from '../api/useApi';

export default function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { getPosts } = useApi();

  useEffect(() => {
    setLoading(true);
    setError(null);
    getPosts()
      .then(res => setPosts(res.data))
      .catch(err => setError(err.message || 'Failed to load posts'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">All Posts</h1>
      {posts.map(post => (
        <div key={post._id} className="border p-4 mb-4">
          <h2 className="text-xl font-semibold">{post.title}</h2>
          <p>{post.content.slice(0, 100)}...</p>
          <Link to={`/posts/${post._id}`} className="text-blue-500 hover:underline">Read more</Link>
        </div>
      ))}
    </div>
  );
}