// SignIn.tsx - User sign in form for authentication
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './api';
import { useAuth } from './App';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const navigate = useNavigate();
  const { setToken } = useAuth();

  const isEmailValid = (email: string) => /.+@.+\..+/.test(email);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await api.post('/signin', { email, password });
      setToken(res.data.data.token);
      localStorage.setItem('user_id', res.data.data.user.id);
      console.log('SignIn: token set to', res.data.data.token);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Sign in failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md w-full mx-auto bg-[#dbeafe] dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-10 mt-8 sm:mt-16 flex flex-col gap-4 sm:gap-6 border border-blue-200 dark:border-gray-700"
      autoComplete="off"
    >
      <h2 className="text-2xl sm:text-3xl font-extrabold mb-2 text-center text-gray-900 dark:text-white tracking-tight">Sign In</h2>
      <p className="text-gray-500 dark:text-gray-300 text-center mb-4">Welcome back! Please enter your credentials.</p>
      {error && (
        <div className="flex items-center gap-2 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-2 animate-shake">
          <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12A9 9 0 1 1 3 12a9 9 0 0 1 18 0Z" /></svg>
          <span>{error}</span>
        </div>
      )}
      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-200">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          onBlur={() => setEmailTouched(true)}
          placeholder="you@email.com"
          required
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition bg-white text-gray-900 border-gray-300 focus:ring-blue-500 placeholder-gray-400 dark:bg-gray-900 dark:text-white dark:border-gray-700 dark:focus:ring-blue-400 dark:placeholder-gray-400 ${emailTouched && !isEmailValid(email) ? 'border-red-500 focus:ring-red-400 dark:border-red-500 dark:focus:ring-red-400' : ''}`}
          aria-invalid={emailTouched && !isEmailValid(email)}
          aria-describedby="email-error"
        />
        {emailTouched && !isEmailValid(email) && (
          <span id="email-error" className="text-xs text-red-500 mt-1">Please enter a valid email address.</span>
        )}
      </div>
      <div className="flex flex-col gap-1 relative">
        <label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-200">Password</label>
        <input
          id="password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 bg-white text-gray-900 border-gray-300 focus:ring-blue-500 placeholder-gray-400 dark:bg-gray-900 dark:text-white dark:border-gray-700 dark:focus:ring-blue-400 dark:placeholder-gray-400 pr-12"
        />
        <button
          type="button"
          tabIndex={-1}
          className="absolute right-3 top-8 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 focus:outline-none"
          onClick={() => setShowPassword(v => !v)}
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0 1 12 19c-5 0-9-4-9-7s4-7 9-7c1.207 0 2.36.214 3.425.613M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18M10.477 10.477A3 3 0 0 0 12 15a3 3 0 0 0 2.828-2.123m1.087-2.91A3 3 0 0 0 12 9c-.512 0-.995.13-1.414.357" /><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 17.657A9.969 9.969 0 0 1 12 19c-5 0-9-4-9-7 0-1.657 1.02-3.156 2.657-4.343M6.343 6.343A9.969 9.969 0 0 1 12 5c5 0 9 4 9 7 0 1.657-1.02 3.156-2.657 4.343" /></svg>
          )}
        </button>
      </div>
      <button
        type="submit"
        className="w-full px-4 py-2 bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-semibold rounded-lg transition flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
        disabled={loading || !isEmailValid(email) || !password}
      >
        {loading && (
          <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg>
        )}
        {loading ? 'Signing In...' : 'Sign In'}
      </button>
      <div className="flex justify-between items-center mt-2">
        <label className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-300">
          <input type="checkbox" className="rounded" disabled />
          Remember me (coming soon)
        </label>
        <a href="#" className="text-sm text-blue-600 hover:underline dark:text-blue-400">Forgot password?</a>
      </div>
    </form>
  );
} 