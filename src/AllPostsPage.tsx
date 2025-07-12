import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from './api';

interface Post {
  id: string;
  title: string;
  body: string;
  user?: { email: string };
  created_at: string;
}

export default function AllPostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState<number | null>(null); // total posts, if available
  const limit = 10;

  useEffect(() => {
    setLoading(true);
    api.get('/post', { params: { search, page, limit } })
      .then(res => {
        const data = res.data?.data;
        setPosts(Array.isArray(data) ? data : []);
        if (typeof res.data?.total === 'number') setTotal(res.data.total);
      })
      .catch(() => setError('Failed to load posts'))
      .finally(() => setLoading(false));
  }, [search, page]);

  const totalPages = total ? Math.ceil(total / limit) : null;

  return (
    <div className="max-w-2xl w-full mx-auto mt-8 sm:mt-16 bg-[#dbeafe] dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-10 border border-blue-200 dark:border-gray-700">
      <h2 className="text-2xl sm:text-3xl font-extrabold mb-6 text-gray-900 dark:text-white text-center">All Posts</h2>
      <input
        type="text"
        placeholder="Search posts..."
        value={search}
        onChange={e => { setSearch(e.target.value); setPage(1); }}
        className="w-full mb-6 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
      />
      {loading ? <div className="text-gray-500 text-center">Loading...</div> : null}
      {error && <div className="text-red-500 mb-2 text-center">{error}</div>}
      <ul className="list-none p-0 space-y-4">
        {posts.map(post => (
          <li key={post.id} className="border border-gray-200 dark:border-gray-700 p-4 rounded-lg bg-white dark:bg-gray-900 shadow">
            <h3 className="text-lg font-semibold mb-1 text-gray-900 dark:text-white">
              <Link to={`/post/${post.id}`} className="hover:underline text-[#2563eb] dark:text-blue-400 hover:text-[#1d4ed8]">
                {post.title}
              </Link>
            </h3>
            <p className="mb-2 text-gray-700 dark:text-gray-200 line-clamp-2">{post.body}</p>
            <div className="text-xs text-gray-400">
              By: {post.user?.email || 'Unknown'} | {new Date(post.created_at).toLocaleString()}
            </div>
          </li>
        ))}
      </ul>
      <div className="flex justify-center items-center gap-2 mt-8">
        <button
          className="px-3 py-1 rounded bg-[#2563eb] text-white font-semibold disabled:opacity-50"
          onClick={() => setPage(p => Math.max(1, p - 1))}
          disabled={page === 1 || loading}
        >
          Prev
        </button>
        {totalPages && (
          <span className="text-gray-700 dark:text-gray-200 text-sm">Page {page} of {totalPages}</span>
        )}
        {!totalPages && (
          <span className="text-gray-700 dark:text-gray-200 text-sm">Page {page}</span>
        )}
        <button
          className="px-3 py-1 rounded bg-[#2563eb] text-white font-semibold disabled:opacity-50"
          onClick={() => setPage(p => (totalPages ? Math.min(totalPages, p + 1) : p + 1))}
          disabled={loading || (totalPages ? page >= totalPages : posts.length < limit)}
        >
          Next
        </button>
      </div>
    </div>
  );
} 