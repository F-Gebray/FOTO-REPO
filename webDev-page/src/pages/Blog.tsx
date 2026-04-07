import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const posts = [
  { title: "Announcing Stellar 2.0", date: "April 7, 2026", excerpt: "The next generation platform is finally here. See what's new." },
  { title: "Building for Edge Networks", date: "March 14, 2026", excerpt: "How we achieved sub-millisecond latencies across the globe." },
  { title: "The Future of Web Interactivity", date: "February 28, 2026", excerpt: "Exploring modern frontend patterns and framer motion capabilities." },
];

export const Blog = () => {
  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans">
      <nav className="border-b border-white/10 glass sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center">
          <Link to="/" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium">
            <ArrowLeft size={16} /> Back to Home
          </Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-20">
        <h1 className="text-5xl font-extrabold mb-4">Latest Updates</h1>
        <p className="text-xl text-gray-400 mb-12">Product announcements, engineering deep-dives, and community stories.</p>

        <div className="space-y-8">
          {posts.map((post, i) => (
            <div key={i} className="group block bg-white/5 border border-white/10 p-8 rounded-2xl hover:border-cyan-500/50 transition-colors cursor-pointer">
              <span className="text-cyan-400 text-sm font-semibold tracking-wide">{post.date}</span>
              <h2 className="text-2xl font-bold mt-2 mb-3 group-hover:text-cyan-300 transition-colors">{post.title}</h2>
              <p className="text-gray-400">{post.excerpt}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
