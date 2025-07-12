// PostList.tsx - List and search posts, with edit links for authenticated users
import { useEffect, useState } from 'react';
import api from './api';
import { Link } from 'react-router-dom';

interface Post {
  id: string;
  title: string;
  body: string;
  user?: { email: string };
  created_at: string;
}

export default function PostList({ token }: { token: string | null }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    setLoading(true);
    api.get('/post', { params: { search } })
      .then(res => {
        const data = res.data?.data;
        setPosts(Array.isArray(data) ? data : []);
      })
      .catch(() => setError('Failed to load posts'))
      .finally(() => setLoading(false));
  }, [search]);

  return (
    <div className="max-w-xl w-full mx-auto mt-8 px-2 sm:px-4">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 text-gray-900 dark:text-white">Posts</h2>
      <input
        type="text"
        placeholder="Search posts..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="w-full mb-4 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
      />
      {loading ? <div className="text-gray-500">Loading...</div> : null}
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <ul className="list-none p-0">
        {posts.map(post => (
          <li key={post.id} className="border border-gray-200 dark:border-gray-700 mb-4 p-4 rounded-lg bg-white dark:bg-gray-900 shadow">
            <h3 className="text-lg font-semibold mb-1 text-gray-900 dark:text-white">
              <Link to={`/post/${post.id}`} className="hover:underline text-blue-700 dark:text-blue-400">
                {post.title}
              </Link>
            </h3>
            <p className="mb-2 text-gray-700 dark:text-gray-200">{post.body}</p>
            <div className="text-xs text-gray-400">
              By: {post.user?.email || 'Unknown'} | {new Date(post.created_at).toLocaleString()}
            </div>
            {token && (
              <div className="mt-2">
                <Link className="text-blue-500 hover:underline" to={`/edit/${post.id}`}>Edit</Link>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
} 