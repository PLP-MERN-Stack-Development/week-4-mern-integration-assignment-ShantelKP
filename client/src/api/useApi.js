
import axios from 'axios';

const API = axios.create({
  baseURL: '/api'
});

export const useApi = () => {
  const getPosts = () => API.get('/posts');
  const getPost = (id) => API.get(`/posts/${id}`);
  const createPost = (data) => API.post('/posts', data);
  const updatePost = (id, data) => API.put(`/posts/${id}`, data);
  const deletePost = (id) => API.delete(`/posts/${id}`);

  return { getPosts, getPost, createPost, updatePost, deletePost };
};
