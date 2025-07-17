import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useApi } from '../api/useApi';

export default function PostForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { getPost, createPost, updatePost } = useApi();

  useEffect(() => {
    if (id) {
      setLoading(true);
      setError(null);
      getPost(id)
        .then(res => {
          setTitle(res.data.title);
          setContent(res.data.content);
        })
        .catch(err => setError(err.message || 'Failed to load post'))
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const payload = { title, content };
    try {
      if (id) {
        await updatePost(id, payload);
      } else {
        // Optimistic UI: add post to UI immediately (could be improved with context/global state)
        await createPost(payload);
      }
      navigate('/');
    } catch (err) {
      setError(err.message || 'Failed to save post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h1 className="text-xl font-bold">{id ? 'Edit' : 'Create'} Post</h1>
      {error && <p className="text-red-600">{error}</p>}
      <input
        className="w-full p-2 border"
        type="text"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
        disabled={loading}
      />
      <textarea
        className="w-full p-2 border"
        placeholder="Content"
        rows="8"
        value={content}
        onChange={e => setContent(e.target.value)}
        required
        disabled={loading}
      ></textarea>
      <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit" disabled={loading}>
        {loading ? (id ? 'Updating...' : 'Creating...') : id ? 'Update' : 'Create'}
      </button>
    </form>
  );
}
