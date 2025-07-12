import { Link } from 'react-router-dom';
import PostList from './PostList';

export default function Dashboard({ token }: { token: string | null }) {
  return (
    <div className="max-w-3xl w-full mx-auto bg-[#dbeafe] dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-10 mt-8 sm:mt-16 flex flex-col gap-4 sm:gap-8 border border-blue-200 dark:border-gray-700">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-2 w-full">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-1">Welcome to your Dashboard</h2>
          <p className="text-gray-600 dark:text-gray-300">You are logged in. You can create, edit, and view your posts.</p>
        </div>
        <Link to="/create">
          <button className="px-4 sm:px-6 py-2 sm:py-3 bg-[#2563eb] hover:bg-[#1d4ed8] text-white rounded-lg font-semibold shadow transition text-base w-full md:w-auto mt-2 md:mt-0">Create New Post</button>
        </Link>
      </div>
      <PostList token={token} />
    </div>
  );
} 