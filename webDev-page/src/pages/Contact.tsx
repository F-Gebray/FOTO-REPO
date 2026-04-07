import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, MessageSquare, MapPin } from 'lucide-react';

export const Contact = () => {
  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans">
      <nav className="border-b border-white/10 glass sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center">
          <Link to="/" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium">
            <ArrowLeft size={16} /> Back to Home
          </Link>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <h1 className="text-5xl font-extrabold mb-6">Get in touch</h1>
            <p className="text-xl text-gray-400 mb-12">
              Have questions about pricing, features, or integrations? Our team is here to help you out.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                  <Mail className="text-cyan-400" size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-bold">Email Us</h4>
                  <p className="text-gray-400">support@stellar-platform.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                  <MessageSquare className="text-blue-500" size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-bold">Live Chat</h4>
                  <p className="text-gray-400">Available 24/7 on our dashboard.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                  <MapPin className="text-purple-500" size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-bold">Headquarters</h4>
                  <p className="text-gray-400">123 Cloud Avenue<br/>San Francisco, CA 94105</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert("Message sent!"); }}>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                <input type="text" className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-cyan-500" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                <input type="email" className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-cyan-500" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                <textarea rows={4} className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-cyan-500" required></textarea>
              </div>
              <button type="submit" className="w-full bg-cyan-500 text-black font-bold py-3 rounded-lg hover:bg-cyan-400 transition-colors">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
