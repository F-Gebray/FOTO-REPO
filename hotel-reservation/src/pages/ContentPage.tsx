import { useParams } from 'react-router-dom';
import { Shield, Clock, Users, Map, Briefcase, FileText } from 'lucide-react';
import { Button } from '../components/ui/Button';

function AboutUs() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-16 flex flex-col gap-16">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-5xl font-extrabold mb-6">Redefining Luxury Travel</h1>
        <p className="text-xl text-muted-foreground">
          Founded in 2026, StayScout was created with a simple mission: to curate the world's most breathtaking architectural properties and give travelers an unforgettable experience.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
           <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80" alt="Office" className="rounded-3xl shadow-2xl" />
        </div>
        <div className="flex flex-col gap-8">
           <div>
             <div className="flex items-center gap-3 mb-3 text-primary">
                <Users className="h-6 w-6" />
                <h3 className="text-2xl font-bold text-foreground">Our Community</h3>
             </div>
             <p className="text-muted-foreground text-lg">We serve over 10 million adventurers annually, connecting them with bespoke hospitality networks worldwide.</p>
           </div>
           <div>
             <div className="flex items-center gap-3 mb-3 text-primary">
                <Map className="h-6 w-6" />
                <h3 className="text-2xl font-bold text-foreground">Global Reach</h3>
             </div>
             <p className="text-muted-foreground text-lg">Operating across 50+ countries, our localized teams ensure every stay meets our rigorous quality standards.</p>
           </div>
        </div>
      </div>
    </div>
  );
}

function Careers() {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-16">
       <div className="text-center mb-16">
         <h1 className="text-5xl font-extrabold mb-6">Join Our Engineering Team</h1>
         <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
           Build the future of travel tech. We are always looking for passionate engineers, designers, and visionaries.
         </p>
       </div>

       <div className="grid md:grid-cols-3 gap-8 mb-16">
         <div className="bg-card border border-border p-8 rounded-3xl text-center">
            <h3 className="font-bold text-xl mb-2">Remote First</h3>
            <p className="text-muted-foreground">Work from anywhere in the world.</p>
         </div>
         <div className="bg-card border border-border p-8 rounded-3xl text-center">
            <h3 className="font-bold text-xl mb-2">Health & Wellness</h3>
            <p className="text-muted-foreground">Premium healthcare and gym stipends.</p>
         </div>
         <div className="bg-card border border-border p-8 rounded-3xl text-center">
            <h3 className="font-bold text-xl mb-2">Annual Retreats</h3>
            <p className="text-muted-foreground">Yearly off-sites at our best resort locations.</p>
         </div>
       </div>

       <div className="bg-card border border-border rounded-3xl p-8">
         <h2 className="text-3xl font-bold mb-8">Open Positions</h2>
         <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center p-6 bg-background rounded-2xl border border-border">
               <div>
                  <h4 className="text-lg font-bold">Senior Frontend Engineer</h4>
                  <p className="text-muted-foreground">React, TypeScript, Tailwind • Remote</p>
               </div>
               <Button onClick={() => alert("Application submitted successfully! We will be in touch.")}>Apply</Button>
            </div>
            <div className="flex justify-between items-center p-6 bg-background rounded-2xl border border-border">
               <div>
                  <h4 className="text-lg font-bold">Backend Developer</h4>
                  <p className="text-muted-foreground">Node.js, PostgreSQL • New York</p>
               </div>
               <Button onClick={() => alert("Application submitted successfully! We will be in touch.")}>Apply</Button>
            </div>
         </div>
       </div>
    </div>
  );
}

function CancellationOptions() {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-16">
       <div className="mb-12">
         <h1 className="text-5xl font-extrabold mb-6">Cancellation Policies</h1>
         <p className="text-xl text-muted-foreground">
           Travel plans change. We offer multiple tiers of cancellation options to guarantee peace of mind.
         </p>
       </div>

       <div className="flex flex-col gap-8">
          <div className="flex gap-6 p-8 bg-card border border-border rounded-3xl items-start">
             <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-full text-green-600 dark:text-green-400">
               <Clock className="w-8 h-8" />
             </div>
             <div>
                <h3 className="text-2xl font-bold mb-3">Flexible</h3>
                <p className="text-muted-foreground text-lg mb-4">Full refund if canceled 24 hours prior to check-in. The first night is non-refundable if canceled within 24 hours.</p>
                <div className="text-sm font-semibold bg-background px-3 py-1 rounded inline-block border border-border">Most Popular</div>
             </div>
          </div>
          
          <div className="flex gap-6 p-8 bg-card border border-border rounded-3xl items-start">
             <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-full text-blue-600 dark:text-blue-400">
               <Shield className="w-8 h-8" />
             </div>
             <div>
                <h3 className="text-2xl font-bold mb-3">Moderate</h3>
                <p className="text-muted-foreground text-lg">Full refund up to 5 days prior to check-in. If canceled later, the first night and 50% of all subsequent nights are charged.</p>
             </div>
          </div>

          <div className="flex gap-6 p-8 bg-card border border-border rounded-3xl items-start">
             <div className="bg-red-100 dark:bg-red-900/30 p-4 rounded-full text-red-600 dark:text-red-400">
               <FileText className="w-8 h-8" />
             </div>
             <div>
                <h3 className="text-2xl font-bold mb-3">Strict</h3>
                <p className="text-muted-foreground text-lg">Full refund if canceled within 48 hours of booking and at least 14 days before check-in. 50% refund up to 7 days before check-in.</p>
             </div>
          </div>
       </div>
    </div>
  );
}

function GenericContent({ title }: { title: string }) {
   return (
    <div className="flex flex-col items-center justify-center p-8 lg:py-32 flex-1">
      <div className="max-w-3xl w-full bg-card border border-border p-12 rounded-3xl shadow-xl text-center">
        <Briefcase className="h-16 w-16 text-primary mx-auto mb-6 opacity-80" />
        <h1 className="text-4xl font-extrabold mb-6 capitalize">{title}</h1>
        <p className="text-muted-foreground text-xl leading-relaxed">
           Detailed regulatory and corporate information regarding our structural <strong>{title}</strong> framework.
           This serves as the official documentation directory.
        </p>
      </div>
    </div>
   );
}


export default function ContentPage() {
  const { page } = useParams<{ page: string }>();

  if (page === 'about-us') return <AboutUs />;
  if (page === 'careers') return <Careers />;
  if (page === 'cancellation-options') return <CancellationOptions />;

  const title = page ? page.split('-').map(word => word).join(' ') : 'Page Not Found';

  return <GenericContent title={title} />;
}
