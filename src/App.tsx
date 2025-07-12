import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { useState, useEffect, createContext, useContext, type ReactNode } from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Dashboard from './Dashboard';
import PostForm from './PostForm';
import PostDetail from './PostDetail';
import LandingPage from './LandingPage';
import AllPostsPage from './AllPostsPage';
import './App.css';

interface AuthContextType {
  token: string | null;
  setToken: (token: string | null) => void;
}

const AuthContext = createContext<AuthContextType>({ token: null, setToken: () => {} });
export function useAuth() {
  return useContext(AuthContext);
}

function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setTokenState] = useState<string | null>(() => localStorage.getItem('token'));

  const setToken = (jwt: string | null) => {
    setTokenState(jwt);
    if (jwt) {
      localStorage.setItem('token', jwt);
    } else {
      localStorage.removeItem('token');
    }
  };

  // Listen for localStorage changes in other tabs
  useEffect(() => {
    const handler = () => {
      setTokenState(localStorage.getItem('token'));
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
}

function HomeRedirect() {
  const { token } = useAuth();
  if (token) return <Navigate to="/dashboard" replace />;
  return <Navigate to="/signin" replace />;
}

function RequireNoAuth({ children }: { children: ReactNode }) {
  const { token } = useAuth();
  console.log('RequireNoAuth: token is', token);
  if (token) return <Navigate to="/dashboard" replace />;
  return <>{children}</>;
}

function RequireAuth({ children }: { children: ReactNode }) {
  const { token } = useAuth();
  if (!token) return <Navigate to="/signin" replace />;
  return <>{children}</>;
}

function App() {
  const { token, setToken } = useAuth();
  const [dark, setDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [dark]);

  return (
    <div className="min-h-screen flex flex-col bg-[#eff6ff] dark:bg-gray-900">
      <Router>
        <nav className="w-full gap-4 sm:gap-6 mb-12 items-center justify-center bg-[#2563eb] shadow-xl p-4 sm:p-6 animate-header-fade text-base md:text-lg flex flex-wrap fixed top-0 left-0 z-50 border-b border-blue-700/20">
          <div className="flex-1 flex items-center gap-4 sm:gap-6 min-w-0 flex-wrap">
            <Link className="text-white font-extrabold tracking-wide text-2xl drop-shadow-lg hover:scale-105 transition-transform whitespace-nowrap" to="/">Blogify</Link>
            <Link className="text-white/90 hover:text-[#60a5fa] font-semibold transition" to="/">Home</Link>
            <Link className="text-white/90 hover:text-[#60a5fa] font-semibold transition" to="/posts">List Posts</Link>
          </div>
          <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0 flex-wrap">
            <button
              className={`rounded-full p-2 transition border-2 border-white/30 hover:border-[#60a5fa] ${dark ? 'bg-[#1d4ed8]/80' : 'bg-white/20'}`}
              aria-label="Toggle dark mode"
              onClick={() => setDark(d => !d)}
            >
              {dark ? (
                <svg className="w-6 h-6 text-yellow-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 1 0 9.79 9.79Z" /></svg>
              ) : (
                <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 1v2m0 18v2m11-11h-2M3 12H1m16.95 6.95-1.414-1.414M6.464 6.464 5.05 5.05m12.02 0-1.414 1.414M6.464 17.536l-1.414 1.414" /></svg>
              )}
            </button>
            {token ? (
              <>
                <Link className="text-white/90 hover:text-[#60a5fa] font-semibold transition" to="/dashboard">Dashboard</Link>
                <Link className="text-white/90 hover:text-[#60a5fa] font-semibold transition" to="/create">Create Post</Link>
                <button className="ml-4 px-4 py-2 bg-white hover:bg-[#1d4ed8] text-[#2563eb] hover:text-white rounded-lg font-semibold transition shadow border border-blue-100" onClick={() => setToken(null)}>Logout</button>
              </>
            ) : (
              <>
                <Link className="text-white/90 hover:text-[#60a5fa] font-semibold transition" to="/signin">Sign In</Link>
                <Link className="text-white/90 hover:text-[#60a5fa] font-semibold transition" to="/signup">Sign Up</Link>
              </>
            )}
          </div>
        </nav>
        <div className="h-[84px] w-full" />
        <style>{`
          @keyframes header-fade { from { opacity: 0; transform: translateY(-30px);} to { opacity: 1; transform: none; } }
          .animate-header-fade { animation: header-fade 1.2s cubic-bezier(.4,0,.2,1); }
        `}</style>
        <main className="flex-1 flex flex-col px-2 sm:px-4 md:px-8 w-full max-w-full">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/posts" element={<AllPostsPage />} />
            <Route path="/dashboard" element={<RequireAuth><Dashboard token={token} /></RequireAuth>} />
            <Route path="/signin" element={<RequireNoAuth><SignIn /></RequireNoAuth>} />
            <Route path="/signup" element={<RequireNoAuth><SignUp /></RequireNoAuth>} />
            <Route path="/create" element={<RequireAuth><PostForm token={token!} /></RequireAuth>} />
            <Route path="/edit/:id" element={<RequireAuth><PostForm token={token!} editMode /></RequireAuth>} />
            <Route path="/post/:id" element={<PostDetail />} />
          </Routes>
        </main>
        <footer className="w-full bg-[#2563eb] text-white py-8 mt-auto shadow-inner animate-header-fade text-center border-t border-blue-700/20 px-2 sm:px-4">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 px-0 sm:px-4">
            <div className="flex flex-col items-center md:items-start gap-1">
              <span className="font-semibold tracking-wide">&copy; {new Date().getFullYear()} Blogify. All rights reserved.</span>
              <span className="text-sm">Crafted with <span className="text-blue-200">♥</span> by Blogify Team</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <a href="https://github.com/chud-lori/go-boilerplate" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:underline text-white/90 hover:text-blue-200 transition">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.091-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.987 1.029-2.687-.103-.254-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.396.1 2.65.64.7 1.028 1.594 1.028 2.687 0 3.847-2.337 4.695-4.566 4.944.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .268.18.579.688.481C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2Z"/></svg>
                <span>Contribute on GitHub</span>
              </a>
              <div className="flex gap-2 sm:gap-3 mt-1 flex-wrap justify-center">
                <a href="https://lori.my.id" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline text-white/90 hover:text-blue-200 transition">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a8 8 0 1 0 0 15.292a8 8 0 0 0 0-15.292Zm0 0V12l4 2"/></svg>
                  <span>lori.my.id</span>
                </a>
                <a href="https://www.linkedin.com/in/chud-lori" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline text-white/90 hover:text-blue-200 transition">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.27c-.966 0-1.75-.79-1.75-1.76c0-.97.784-1.76 1.75-1.76s1.75.79 1.75 1.76c0 .97-.784 1.76-1.75 1.76zm15.5 11.27h-3v-5.6c0-1.34-.03-3.07-1.87-3.07c-1.87 0-2.16 1.46-2.16 2.97v5.7h-3v-10h2.89v1.36h.04c.4-.75 1.38-1.54 2.84-1.54c3.04 0 3.6 2 3.6 4.59v5.59z"/></svg>
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
        </footer>
      </Router>
    </div>
  );
}

export default function RootApp() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}
