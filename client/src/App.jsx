import { Routes, Route, Link } from 'react-router-dom'
import AuthForm from './components/AuthForm';
import './App.css'

function Home() {
  return <h2>Home Page</h2>;
}
function Posts() {
  return <h2>Posts List (placeholder)</h2>;
}
function PostDetail() {
  return <h2>Post Detail (placeholder)</h2>;
}
function Categories() {
  return <h2>Categories (placeholder)</h2>;
}

function App() {
  return (
    <>
      <nav>
        <Link to="/">Home</Link> |{' '}
        <Link to="/posts">Posts</Link> |{' '}
        <Link to="/categories">Categories</Link> |{' '}
        <Link to="/login">Login</Link> |{' '}
        <Link to="/register">Register</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/posts/:id" element={<PostDetail />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/login" element={<AuthForm mode="login" />} />
        <Route path="/register" element={<AuthForm mode="register" />} />
      </Routes>
    </>
  );
}

export default App
