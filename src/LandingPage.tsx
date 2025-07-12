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

export default function LandingPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    api.get('/post', { params: { limit: 5 } })
      .then(res => {
        const data = res.data?.data;
        setPosts(Array.isArray(data) ? data.slice(0, 5) : []);
      })
      .catch(() => setError('Failed to load posts'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-[#eff6ff] dark:bg-gray-900 flex flex-col overflow-x-hidden">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center flex-1 py-12 sm:py-20 px-2 sm:px-4 text-center animate-fade-in relative w-full overflow-hidden">
        <div className="absolute inset-0 pointer-events-none z-0">
          <svg className="w-full h-full opacity-30 animate-pulse-slow" viewBox="0 0 1440 320" fill="none"><path fill="#6366F1" fillOpacity="0.2" d="M0,160L60,170.7C120,181,240,203,360,197.3C480,192,600,160,720,133.3C840,107,960,85,1080,101.3C1200,117,1320,171,1380,197.3L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path></svg>
        </div>
        <div className="mb-8 z-10">
          <div className="flex flex-wrap min-w-0 items-center justify-center gap-2 sm:gap-3 animate-bounce-slow w-full">
            <svg className="w-12 h-12 sm:w-14 sm:h-14 text-[#2563eb] animate-hero-glow flex-shrink-0" fill="none" viewBox="0 0 48 48"><circle cx="24" cy="24" r="24" fill="#2563eb" /><text x="50%" y="55%" textAnchor="middle" fill="#fff" fontSize="2.2rem" fontWeight="bold" dy=".3em">Go</text></svg>
            <span className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white drop-shadow-lg animate-slide-in break-words">Go Boilerplate SaaS</span>
          </div>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-xs sm:max-w-2xl mx-auto mt-4 animate-fade-in-slow break-words">
            The fastest way to launch scalable, production-ready Go web APIs and microservices.<br />
            <span className="text-blue-600 dark:text-blue-400 font-bold">Clean Architecture</span>, <span className="text-purple-600 dark:text-purple-400 font-bold">REST & gRPC</span>, <span className="text-pink-600 dark:text-pink-400 font-bold">Circuit Breaker</span>, <span className="text-yellow-500 font-bold">Dockerized</span>, and <span className="text-green-500 font-bold">Observability</span> built-in.<br />
            <span className="inline-block mt-2 text-xs sm:text-base text-gray-500 dark:text-gray-400">Ship your SaaS backend in minutes, not months.</span>
          </p>
        </div>
        <div className="mt-6 sm:mt-10 animate-fade-in-slow z-10 w-full flex justify-center">
          <Link to="/signup" className="inline-block w-full sm:w-auto px-6 sm:px-10 py-3 sm:py-4 bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold rounded-xl shadow-xl transition text-lg sm:text-xl scale-100 hover:scale-105 duration-200">Get Started Free</Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto w-full py-10 sm:py-20 px-2 sm:px-4 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12 animate-features-fade-in">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-5 sm:p-10 flex flex-col items-center text-center hover:scale-105 transition-transform animate-feature-bounce">
          <svg className="w-14 h-14 mb-4 text-blue-500 animate-spin-slow" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Clean Architecture</h3>
          <p className="text-gray-600 dark:text-gray-300">Separation of concerns with domain, adapters, and infrastructure layers. Maintainable, testable, and scalable codebase.</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-5 sm:p-10 flex flex-col items-center text-center hover:scale-105 transition-transform animate-feature-fade-in-delay">
          <svg className="w-14 h-14 mb-4 text-purple-500 animate-pulse" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">REST & gRPC APIs</h3>
          <p className="text-gray-600 dark:text-gray-300">User CRUD, DTOs, controllers, and routing. Example gRPC service with protobuf and testable client/server.</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-5 sm:p-10 flex flex-col items-center text-center hover:scale-105 transition-transform animate-feature-fade-in-delay2">
          <svg className="w-14 h-14 mb-4 text-pink-500 animate-bounce" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Circuit Breaker</h3>
          <p className="text-gray-600 dark:text-gray-300">Built-in circuit breaker pattern for fault tolerance and resilience. Prevents cascading failures and improves system reliability.</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-5 sm:p-10 flex flex-col items-center text-center hover:scale-105 transition-transform animate-feature-fade-in-delay3">
          <svg className="w-14 h-14 mb-4 text-yellow-500 animate-pulse" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 12h18M12 3v18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Observability & Logging</h3>
          <p className="text-gray-600 dark:text-gray-300">Loki, Promtail, Grafana, and structured logging with Logrus. Built-in support for log aggregation and visualization.</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-5 sm:p-10 flex flex-col items-center text-center hover:scale-105 transition-transform animate-feature-fade-in-delay4">
          <svg className="w-14 h-14 mb-4 text-indigo-500 animate-spin-slow" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M8 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /></svg>
          <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Dockerized & Cloud Ready</h3>
          <p className="text-gray-600 dark:text-gray-300">Dockerfile, docker-compose, and cloud-native patterns for local development and production deployment.</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-5 sm:p-10 flex flex-col items-center text-center hover:scale-105 transition-transform animate-feature-fade-in-delay5 md:col-span-1">
          <svg className="w-14 h-14 mb-4 text-green-500 animate-spin-slow" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path d="M8 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Production Ready</h3>
          <p className="text-gray-600 dark:text-gray-300">PostgreSQL, Redis, migrations, error handling, API key auth, and more. Everything you need to launch your SaaS backend.</p>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="max-w-4xl mx-auto w-full py-8 sm:py-16 px-2 sm:px-4 animate-how-fade-in">
        <h2 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white text-center">How It Works</h2>
        <ol className="space-y-6 text-lg text-gray-700 dark:text-gray-200 mx-auto max-w-2xl">
          <li className="flex items-center gap-4 animate-step-slide-in">
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white font-bold text-xl shadow-lg">1</span>
            <span>Clone the Go Boilerplate and run <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-xs">docker-compose up</code>.</span>
          </li>
          <li className="flex items-center gap-4 animate-step-slide-in-delay">
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-purple-500 text-white font-bold text-xl shadow-lg">2</span>
            <span>Customize your domain, add endpoints, and connect your frontend.</span>
          </li>
          <li className="flex items-center gap-4 animate-step-slide-in-delay2">
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-pink-500 text-white font-bold text-xl shadow-lg">3</span>
            <span>Deploy to the cloud and scale with confidence.</span>
          </li>
        </ol>
      </section>

      {/* Posts Preview Section */}
      <section className="max-w-2xl mx-auto w-full mb-8 sm:mb-16 animate-fade-in-slow px-2 sm:px-4">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white text-center">Latest Blog Posts</h2>
        {loading ? (
          <div className="text-center text-gray-500">Loading posts...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : (
          <ul className="space-y-4">
            {posts.map(post => (
              <li key={post.id} className="bg-white dark:bg-gray-800 rounded-xl shadow p-5 border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition animate-card-fade-in">
                <Link to={`/post/${post.id}`} className="text-xl font-semibold text-blue-700 dark:text-blue-400 hover:underline">
                  {post.title}
                </Link>
                <p className="text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">{post.body}</p>
                <div className="text-xs text-gray-400 mt-2">
                  By: {post.user?.email || 'Unknown'} | {new Date(post.created_at).toLocaleString()}
                </div>
              </li>
            ))}
          </ul>
        )}
        <div className="flex justify-center mt-8">
          <Link to="/posts" className="px-6 py-2 bg-[#2563eb] hover:bg-[#1d4ed8] text-white rounded-lg font-semibold transition shadow scale-100 hover:scale-105 duration-200">View All Posts</Link>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="w-full py-8 sm:py-16 px-2 sm:px-4 bg-gradient-to-r from-purple-100 via-blue-50 to-pink-100 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 animate-cta-fade-in">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Ready to build your SaaS with Go?</h2>
          <p className="text-lg text-gray-700 dark:text-gray-200 mb-6">Start with the best Go boilerplate for modern web APIs and microservices. Join the community and launch your product today.</p>
          <Link to="/signup" className="inline-block px-8 py-3 bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-semibold rounded-lg shadow-lg transition text-lg scale-100 hover:scale-105 duration-200 animate-bounce-slow">Sign Up Free</Link>
        </div>
      </section>

      {/* Animations */}
      <style>{`
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fade-in-slow { from { opacity: 0; transform: translateY(30px);} to { opacity: 1; transform: none; } }
        @keyframes slide-in { from { opacity: 0; transform: translateY(-40px);} to { opacity: 1; transform: none; } }
        @keyframes bg-gradient-move {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes bounce-slow { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-18px); } }
        @keyframes hero-glow { 0%, 100% { filter: drop-shadow(0 0 0 #a21caf88); } 50% { filter: drop-shadow(0 0 32px #a21caf88); } }
        @keyframes card-fade-in { from { opacity: 0; transform: translateY(40px);} to { opacity: 1; transform: none; } }
        @keyframes features-fade-in { from { opacity: 0; transform: scale(0.95);} to { opacity: 1; transform: none; } }
        @keyframes feature-bounce { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.08); } }
        @keyframes feature-fade-in-delay { from { opacity: 0; transform: scale(0.95);} 50% { opacity: 0.5; } to { opacity: 1; transform: none; } }
        @keyframes feature-fade-in-delay2 { from { opacity: 0; transform: scale(0.95);} 70% { opacity: 0.5; } to { opacity: 1; transform: none; } }
        @keyframes feature-fade-in-delay3 { from { opacity: 0; transform: scale(0.95);} 80% { opacity: 0.5; } to { opacity: 1; transform: none; } }
        @keyframes feature-fade-in-delay4 { from { opacity: 0; transform: scale(0.95);} 90% { opacity: 0.5; } to { opacity: 1; transform: none; } }
        @keyframes feature-fade-in-delay5 { from { opacity: 0; transform: scale(0.95);} 95% { opacity: 0.5; } to { opacity: 1; transform: none; } }
        @keyframes how-fade-in { from { opacity: 0; transform: translateY(60px);} to { opacity: 1; transform: none; } }
        @keyframes step-slide-in { from { opacity: 0; transform: translateX(-40px);} to { opacity: 1; transform: none; } }
        @keyframes step-slide-in-delay { from { opacity: 0; transform: translateX(-40px);} 60% { opacity: 0.5; } to { opacity: 1; transform: none; } }
        @keyframes step-slide-in-delay2 { from { opacity: 0; transform: translateX(-40px);} 80% { opacity: 0.5; } to { opacity: 1; transform: none; } }
        @keyframes cta-fade-in { from { opacity: 0; transform: scale(0.95);} to { opacity: 1; transform: none; } }
        @keyframes pulse { 0%, 100% { filter: drop-shadow(0 0 0 #a21caf88); } 50% { filter: drop-shadow(0 0 32px #a21caf88); } }
        .animate-fade-in { animation: fade-in 1s ease; }
        .animate-fade-in-slow { animation: fade-in-slow 1.2s cubic-bezier(.4,0,.2,1); }
        .animate-slide-in { animation: slide-in 1s cubic-bezier(.4,0,.2,1); }
        .animate-bg-gradient { background-size: 200% 200%; animation: bg-gradient-move 8s ease-in-out infinite; }
        .animate-bounce-slow { animation: bounce-slow 2.2s infinite; }
        .animate-hero-glow { animation: hero-glow 2.5s infinite; }
        .animate-card-fade-in { animation: card-fade-in 1.1s cubic-bezier(.4,0,.2,1); }
        .animate-features-fade-in { animation: features-fade-in 1.2s cubic-bezier(.4,0,.2,1); }
        .animate-feature-bounce { animation: feature-bounce 2.5s infinite; }
        .animate-feature-fade-in-delay { animation: feature-fade-in-delay 1.7s cubic-bezier(.4,0,.2,1); }
        .animate-feature-fade-in-delay2 { animation: feature-fade-in-delay2 2.2s cubic-bezier(.4,0,.2,1); }
        .animate-feature-fade-in-delay3 { animation: feature-fade-in-delay3 2.7s cubic-bezier(.4,0,.2,1); }
        .animate-feature-fade-in-delay4 { animation: feature-fade-in-delay4 3.2s cubic-bezier(.4,0,.2,1); }
        .animate-feature-fade-in-delay5 { animation: feature-fade-in-delay5 3.7s cubic-bezier(.4,0,.2,1); }
        .animate-how-fade-in { animation: how-fade-in 1.3s cubic-bezier(.4,0,.2,1); }
        .animate-step-slide-in { animation: step-slide-in 1.2s cubic-bezier(.4,0,.2,1); }
        .animate-step-slide-in-delay { animation: step-slide-in-delay 1.7s cubic-bezier(.4,0,.2,1); }
        .animate-step-slide-in-delay2 { animation: step-slide-in-delay2 2.2s cubic-bezier(.4,0,.2,1); }
        .animate-cta-fade-in { animation: cta-fade-in 1.5s cubic-bezier(.4,0,.2,1); }
        .animate-pulse-slow { animation: pulse 4s cubic-bezier(.4,0,.2,1) infinite; }
      `}</style>
    </div>
  );
} 