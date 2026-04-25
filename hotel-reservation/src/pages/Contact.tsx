import React, { useState } from "react";
import { CheckCircle, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";

export default function Contact() {
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
  };

  return (
    <div className="w-full flex flex-col items-center py-16 px-4">
      <div className="max-w-3xl w-full text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Get in Touch</h1>
        <p className="text-lg text-muted-foreground">
          Have questions about a booking, our services, or want to partner with
          us? We'd love to hear from you.
        </p>
      </div>

      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="bg-card border border-border rounded-2xl p-6 flex flex-col items-center text-center shadow-sm">
          <div className="h-12 w-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4">
            <Phone className="h-5 w-5" />
          </div>
          <h3 className="font-bold text-lg mb-2">Phone</h3>
          <p className="text-muted-foreground text-sm">
            +1 (800) 123-4567
            <br />
            Mon-Fri, 9am - 6pm EST
          </p>
        </div>
        <div className="bg-card border border-border rounded-2xl p-6 flex flex-col items-center text-center shadow-sm">
          <div className="h-12 w-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4">
            <Mail className="h-5 w-5" />
          </div>
          <h3 className="font-bold text-lg mb-2">Email</h3>
          <p className="text-muted-foreground text-sm">
            support@stayscout.com
            <br />
            We reply within 24 hours
          </p>
        </div>
        <div className="bg-card border border-border rounded-2xl p-6 flex flex-col items-center text-center shadow-sm">
          <div className="h-12 w-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4">
            <MapPin className="h-5 w-5" />
          </div>
          <h3 className="font-bold text-lg mb-2">Office</h3>
          <p className="text-muted-foreground text-sm">
            10 Sint-Michielgestel
            <br />
            nOORD-Brabant, NB 10001
          </p>
        </div>
      </div>

      <div className="w-full max-w-3xl bg-card border border-border rounded-3xl p-8 shadow-xl">
        {success ? (
          <div className="flex flex-col items-center py-12 text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mb-6" />
            <h2 className="text-2xl font-bold mb-2">Message Sent!</h2>
            <p className="text-muted-foreground mb-8">
              We've received your request and will get back to you shortly.
            </p>
            <Button onClick={() => setSuccess(false)}>
              Send another message
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  First Name
                </label>
                <Input required placeholder="John" />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Last Name
                </label>
                <Input required placeholder="Doe" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">
                Email Address
              </label>
              <Input type="email" required placeholder="john@example.com" />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Message</label>
              <textarea
                required
                className="w-full min-h-[150px] p-3 rounded-xl border border-input bg-background focus:ring-2 focus:ring-primary focus:outline-none resize-y"
                placeholder="How can we help you?"
              />
            </div>
            <Button type="submit" size="lg" className="h-12 text-lg">
              Send Message
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
