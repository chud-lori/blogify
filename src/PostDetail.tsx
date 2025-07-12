import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from './api';

interface Author {
  id: string;
  email: string;
  created_at: string;
}

interface PostDetailData {
  id: string;
  title: string;
  body: string;
  author: Author;
  created_at: string;
  updated_at: string;
}

export default function PostDetail() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<PostDetailData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    api.get(`/post/${id}`)
      .then(res => {
        setPost(res.data.data);
        setError('');
      })
      .catch(() => setError('Failed to load post'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <div className="max-w-xl mx-auto mt-16 text-center text-gray-500">Loading post...</div>;
  }
  if (error) {
    return <div className="max-w-xl mx-auto mt-16 text-center text-red-500">{error}</div>;
  }
  if (!post) {
    return <div className="max-w-xl mx-auto mt-16 text-center text-gray-500">No post found.</div>;
  }

  return (
    <div className="max-w-xl w-full mx-auto mt-8 sm:mt-16 bg-[#dbeafe] dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-10 border border-blue-200 dark:border-gray-700">
      <Link to="/" className="text-[#2563eb] hover:text-[#1d4ed8] hover:underline text-sm mb-4 inline-block">&larr; Back to Posts</Link>
      <h1 className="text-2xl sm:text-3xl font-extrabold mb-2 text-gray-900 dark:text-white">{post.title}</h1>
      <div className="text-gray-500 dark:text-gray-300 text-sm mb-4">
        By <span className="font-semibold">{post.author.email}</span> &middot; {new Date(post.created_at).toLocaleString()}
      </div>
      <div className="prose dark:prose-invert max-w-none mb-6">
        <p>{post.body}</p>
      </div>
      <div className="text-xs text-gray-400 mt-6">
        Post ID: {post.id}<br />
        Created: {new Date(post.created_at).toLocaleString()}<br />
        Updated: {post.updated_at !== '0001-01-01T00:00:00Z' ? new Date(post.updated_at).toLocaleString() : 'Never'}
      </div>
    </div>
  );
} 