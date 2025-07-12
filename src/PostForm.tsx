// PostForm.tsx - Create or edit a post, requires authentication
import { useState, useEffect } from 'react';
import api from './api';
import { useNavigate, useParams } from 'react-router-dom';
// REMOVE: import { RichTextEditor } from '@mantine/rte';

interface PostFormProps {
  token: string;
  editMode?: boolean;
}

export default function PostForm({ token, editMode }: PostFormProps) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [titleTouched, setTitleTouched] = useState(false);
  const [bodyTouched, setBodyTouched] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (editMode && id) {
      api.get(`/post/${id}`)
        .then(res => {
          setTitle(res.data.title);
          setBody(res.data.body);
        })
        .catch(() => setError('Failed to load post'));
    }
  }, [editMode, id]);

  const isTitleValid = (t: string) => t.trim().length > 0;
  const isBodyValid = (b: string) => b.trim().length > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (editMode && id) {
        await api.put(`/post/${id}`, { title, body }, { headers: { Authorization: `Bearer ${token}` } });
      } else {
        const author_id = localStorage.getItem('user_id');
        await api.post('/post', { title, body, author_id }, { headers: { Authorization: `Bearer ${token}` } });
      }
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to save post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg w-full mx-auto bg-[#dbeafe] dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-10 mt-8 sm:mt-16 flex flex-col gap-4 sm:gap-6 border border-blue-200 dark:border-gray-700"
      autoComplete="off"
    >
      <h2 className="text-2xl sm:text-3xl font-extrabold mb-2 text-center text-gray-900 dark:text-white tracking-tight">{editMode ? 'Edit Post' : 'Create Post'}</h2>
      {error && (
        <div className="flex items-center gap-2 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-2 animate-shake">
          <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12A9 9 0 1 1 3 12a9 9 0 0 1 18 0Z" /></svg>
          <span>{error}</span>
        </div>
      )}
      <div className="flex flex-col gap-1">
        <label htmlFor="title" className="text-sm font-medium text-gray-700 dark:text-gray-200">Title</label>
        <input
          id="title"
          type="text"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          onBlur={() => setTitleTouched(true)}
          required
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition dark:bg-gray-700 dark:text-white dark:border-gray-600 ${titleTouched && !isTitleValid(title) ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-blue-500'}`}
          aria-invalid={titleTouched && !isTitleValid(title)}
          aria-describedby="title-error"
        />
        {titleTouched && !isTitleValid(title) && (
          <span id="title-error" className="text-xs text-red-500 mt-1">Title is required.</span>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="body" className="text-sm font-medium text-gray-700 dark:text-gray-200">Body</label>
        <textarea
          id="body"
          placeholder="Body"
          value={body}
          onChange={e => setBody(e.target.value)}
          onBlur={() => setBodyTouched(true)}
          required
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition dark:bg-gray-700 dark:text-white dark:border-gray-600 min-h-[120px] ${bodyTouched && !isBodyValid(body) ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-blue-500'}`}
          aria-invalid={bodyTouched && !isBodyValid(body)}
          aria-describedby="body-error"
        />
        {bodyTouched && !isBodyValid(body) && (
          <span id="body-error" className="text-xs text-red-500 mt-1">Body is required.</span>
        )}
      </div>
      <button
        type="submit"
        className="w-full px-4 py-2 bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-semibold rounded-lg transition flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
        disabled={loading || !isTitleValid(title) || !isBodyValid(body)}
      >
        {loading && (
          <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg>
        )}
        {loading ? (editMode ? 'Updating...' : 'Creating...') : (editMode ? 'Update' : 'Create')}
      </button>
    </form>
  );
} 