import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Terminal, Code, Shield, Cpu, Zap, Database } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const sidebarSections = [
  {
    title: 'Getting Started',
    items: [
      { id: 'introduction', label: 'Introduction' },
      { id: 'quick-start', label: 'Quick Start' },
      { id: 'cli-reference', label: 'CLI Reference' },
    ]
  },
  {
    title: 'Core Concepts',
    items: [
      { id: 'architecture', label: 'Architecture' },
      { id: 'data-fetching', label: 'Data Fetching' },
      { id: 'edge-functions', label: 'Edge Functions' },
      { id: 'security', label: 'Security' },
    ]
  }
];

export const Documentation = () => {
  const [activeTab, setActiveTab] = useState('introduction');

  const contentMap: Record<string, React.ReactNode> = {
    'introduction': (
      <div className="prose prose-invert max-w-none">
        <h1 className="text-4xl font-extrabold tracking-tight mb-4">Introduction to Stellar</h1>
        <p className="text-xl text-gray-400 mb-8 leading-relaxed">
          Stellar is the modern digital platform engineered for speed, scalability, and an unrivaled developer experience. 
          Learn how to unleash its full potential.
        </p>
        <h2 className="text-2xl font-bold mb-4 mt-12 pb-2 border-b border-white/10">Why Stellar?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
          <div className="bg-white/5 border border-white/10 p-6 rounded-xl hover:bg-white/10 transition-colors">
            <Code className="text-cyan-400 mb-3" size={24} />
            <h3 className="text-lg font-bold mb-2">Developer First</h3>
            <p className="text-sm text-gray-400">Everything is built with DX in mind. Less config, more shipping.</p>
          </div>
          <div className="bg-white/5 border border-white/10 p-6 rounded-xl hover:bg-white/10 transition-colors">
            <BookOpen className="text-blue-500 mb-3" size={24} />
            <h3 className="text-lg font-bold mb-2">Extensive APIs</h3>
            <p className="text-sm text-gray-400">Hooks and APIs that cover exactly what modern apps need.</p>
          </div>
        </div>
      </div>
    ),
    'quick-start': (
      <div className="prose prose-invert max-w-none">
        <h1 className="text-4xl font-extrabold tracking-tight mb-4">Quick Start</h1>
        <p className="text-xl text-gray-400 mb-8">Get up and running in less than a minute.</p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4 border-b border-white/10 pb-2">Installation</h2>
        <p className="text-gray-300 mb-4">Install our CLI and initialize your first project in seconds.</p>
        <div className="bg-[#0a0a0a] border border-white/10 rounded-lg p-4 font-mono text-sm mb-8 flex items-center gap-3">
          <Terminal size={16} className="text-green-500" />
          <span className="text-gray-300">npx create-stellar-app@latest my-app</span>
        </div>
        
        <h2 className="text-2xl font-bold mt-8 mb-4 border-b border-white/10 pb-2">Starting the Dev Server</h2>
        <div className="bg-[#0a0a0a] border border-white/10 rounded-lg p-4 font-mono text-sm my-6">
          <div className="flex flex-col space-y-2">
            <div className="flex items-center gap-2"><Terminal size={16} className="text-gray-500" /><span className="text-gray-300">cd my-app</span></div>
            <div className="flex items-center gap-2"><Terminal size={16} className="text-gray-500" /><span className="text-gray-300">npm run dev</span></div>
          </div>
        </div>
      </div>
    ),
    'cli-reference': (
      <div className="prose prose-invert max-w-none">
        <h1 className="text-4xl font-extrabold tracking-tight mb-4">CLI Reference</h1>
        <p className="text-xl text-gray-400 mb-8">Master the command line tools.</p>
        <div className="space-y-4">
          <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
            <h4 className="font-mono text-cyan-400 font-bold mb-1">stellar init [dir]</h4>
            <p className="text-sm text-gray-400">Scaffolds a new project locally.</p>
          </div>
          <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
            <h4 className="font-mono text-blue-400 font-bold mb-1">stellar dev</h4>
            <p className="text-sm text-gray-400">Starts a local development server with HMR.</p>
          </div>
          <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
            <h4 className="font-mono text-purple-400 font-bold mb-1">stellar deploy --prod</h4>
            <p className="text-sm text-gray-400">Deploys your application to our global edge network.</p>
          </div>
        </div>
      </div>
    ),
    'architecture': (
      <div className="prose prose-invert max-w-none">
        <h1 className="text-4xl font-extrabold tracking-tight mb-4">Architecture</h1>
        <p className="text-xl text-gray-400 mb-8">How Stellar works under the hood.</p>
        <div className="flex flex-col gap-6 mt-6">
          <div className="bg-gradient-to-r from-blue-900/20 to-transparent p-6 rounded-xl border border-blue-500/20">
            <Cpu className="text-blue-400 mb-3" size={24} />
            <h3 className="text-lg font-bold mb-2">Micro-frontend Composability</h3>
            <p className="text-sm text-gray-400">Stellar isolates components and resolves them asynchronously at the edge.</p>
          </div>
        </div>
      </div>
    ),
    'data-fetching': (
      <div className="prose prose-invert max-w-none">
        <h1 className="text-4xl font-extrabold tracking-tight mb-4">Data Fetching</h1>
        <p className="text-xl text-gray-400 mb-8">Seamlessly handle server state.</p>
        <div className="bg-black border border-white/10 rounded-lg p-6 font-mono text-sm text-green-400 shadow-inner">
          <p className="text-gray-500 mb-2">// Server-side direct fetch example</p>
          <p>export const getStaticProps = async () =&gt; {'{'}</p>
          <p className="ml-4">const data = await db.query('SELECT * FROM users');</p>
          <p className="ml-4">return {'{'} props: {'{'} users: data {'}'} {'}'};</p>
          <p>{'}'}</p>
        </div>
      </div>
    ),
    'edge-functions': (
      <div className="prose prose-invert max-w-none">
        <h1 className="text-4xl font-extrabold tracking-tight mb-4">Edge Functions</h1>
        <p className="text-xl text-gray-400 mb-8">Run logic close to your users.</p>
        <div className="flex items-center gap-4 bg-white/5 border border-white/10 p-6 rounded-xl">
          <Zap className="text-yellow-400 shrink-0" size={32} />
          <p className="text-gray-300 text-sm">
            Deploy serverless functions with zero cold starts. They execute in V8 isolates directly on CDN nodes.
          </p>
        </div>
      </div>
    ),
    'security': (
      <div className="prose prose-invert max-w-none">
        <h1 className="text-4xl font-extrabold tracking-tight mb-4">Security</h1>
        <p className="text-xl text-gray-400 mb-8">Bank-grade protection included.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white/5 border border-white/10 p-6 rounded-xl flex flex-col items-center text-center">
            <Shield className="text-green-400 mb-3" size={32} />
            <h3 className="font-bold mb-2">Automated DDoS Mitigation</h3>
            <p className="text-xs text-gray-400">Our edge network absorbs L3/L4/L7 attacks without passing bandwidth costs to you.</p>
          </div>
          <div className="bg-white/5 border border-white/10 p-6 rounded-xl flex flex-col items-center text-center">
            <Database className="text-cyan-400 mb-3" size={32} />
            <h3 className="font-bold mb-2">Encrypted at Rest</h3>
            <p className="text-xs text-gray-400">All data stores use AES-256 for physical hardware level encryption.</p>
          </div>
        </div>
      </div>
    ),
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-cyan-500/30">
      <nav className="border-b border-white/10 glass sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium">
              <ArrowLeft size={16} /> Back to Home
            </Link>
            <div className="h-4 w-px bg-white/20"></div>
            <div className="flex items-center gap-2 text-cyan-400 font-semibold">
              <BookOpen size={18} /> Documentation
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col md:flex-row gap-12">
        {/* Sidebar */}
        <div className="w-full md:w-64 shrink-0">
          <div className="sticky top-24 space-y-8">
            {sidebarSections.map((section, idx) => (
              <div key={idx}>
                <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">{section.title}</h4>
                <ul className="space-y-2">
                  {section.items.map((item) => (
                    <li key={item.id}>
                      <button 
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-all text-sm font-medium ${
                          activeTab === item.id 
                            ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' 
                            : 'text-gray-400 hover:bg-white/5 hover:text-white border border-transparent'
                        }`}
                      >
                        {item.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 max-w-3xl overflow-hidden min-h-[500px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              {contentMap[activeTab]}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
