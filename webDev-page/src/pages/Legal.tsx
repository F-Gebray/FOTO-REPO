import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const LegalPageTemplate = ({ title, lastUpdated, children }: { title: string, lastUpdated: string, children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans">
      <nav className="border-b border-white/10 glass sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center">
          <Link to="/" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium">
            <ArrowLeft size={16} /> Back to Home
          </Link>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-4 py-20">
        <h1 className="text-5xl font-extrabold mb-4">{title}</h1>
        <p className="text-gray-400 mb-12 border-b border-white/10 pb-8">Last Updated: {lastUpdated}</p>
        <div className="prose prose-invert prose-cyan max-w-none">
          {children}
        </div>
      </div>
    </div>
  );
};

export const PrivacyPolicy = () => (
  <LegalPageTemplate title="Privacy Policy" lastUpdated="January 1, 2026">
    <h2>1. Information We Collect</h2>
    <p>We only collect information about you if we have a reason to do so—for example, to provide our Services, to communicate with you, or to make our Services better.</p>
    <h2>2. How We Use Information</h2>
    <p>We use information about you solely for the purpose of operating, evaluating, and improving our products and services.</p>
    <h2>3. Sharing Information</h2>
    <p>We do not sell our users' private personal information.</p>
  </LegalPageTemplate>
);

export const TermsOfService = () => (
  <LegalPageTemplate title="Terms of Service" lastUpdated="January 1, 2026">
    <h2>1. Terms</h2>
    <p>By accessing the website, you are agreeing to be bound by these terms of service, all applicable laws and regulations.</p>
    <h2>2. Use License</h2>
    <p>Permission is granted to temporarily download one copy of the materials on Stellar's website for personal, non-commercial transitory viewing only.</p>
  </LegalPageTemplate>
);

export const CookiePolicy = () => (
  <LegalPageTemplate title="Cookie Policy" lastUpdated="January 1, 2026">
    <h2>What Are Cookies</h2>
    <p>As is common practice with almost all professional websites this site uses cookies, which are tiny files that are downloaded to your computer, to improve your experience.</p>
    <h2>How We Use Cookies</h2>
    <p>We use cookies for a variety of reasons detailed below. Unfortunately in most cases there are no industry standard options for disabling cookies without completely disabling the functionality and features they add to this site.</p>
  </LegalPageTemplate>
);
