import { Link } from "react-router-dom";
import { Plane, Globe, Camera, Briefcase, Code } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-secondary mt-20 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6 group">
              <div className="bg-primary/10 p-2 rounded-xl">
                <Plane className="h-6 w-6 text-primary group-hover:rotate-12 transition-transform duration-300" />
              </div>
              <span className="font-bold text-xl tracking-tight">
                Stay-Comfort
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Experience the world with Stay-Comfort. Premium hotel bookings for
              your next unforgettable journey. We make luxury accessible.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-6">Company</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link
                  to="/info/about-us"
                  className="hover:text-primary transition-colors inline-block"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/info/careers"
                  className="hover:text-primary transition-colors inline-block"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-primary transition-colors inline-block"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-6">Support</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link
                  to="/info/help-center"
                  className="hover:text-primary transition-colors inline-block"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  to="/info/cancellation-options"
                  className="hover:text-primary transition-colors inline-block"
                >
                  Cancellation Options
                </Link>
              </li>
              <li>
                <Link
                  to="/info/trust-and-safety"
                  className="hover:text-primary transition-colors inline-block"
                >
                  Trust & Safety
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-6">Follow Us</h3>
            <div className="flex gap-4">
              <a
                href="https://twitter.com"
                target="_blank"
                className="h-10 w-10 rounded-full bg-background flex items-center justify-center text-muted-foreground hover:text-primary hover:shadow-md transition-all"
              >
                <Globe className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                className="h-10 w-10 rounded-full bg-background flex items-center justify-center text-muted-foreground hover:text-primary hover:shadow-md transition-all"
              >
                <Camera className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                className="h-10 w-10 rounded-full bg-background flex items-center justify-center text-muted-foreground hover:text-primary hover:shadow-md transition-all"
              >
                <Briefcase className="h-5 w-5" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                className="h-10 w-10 rounded-full bg-background flex items-center justify-center text-muted-foreground hover:text-primary hover:shadow-md transition-all"
              >
                <Code className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-muted-foreground">
          <p>© 2026 Stay-Comfort. All rights reserved.</p>
          <div className="flex gap-6">
            <Link
              to="/info/privacy-policy"
              className="hover:text-foreground transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="/info/terms-of-service"
              className="hover:text-foreground transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
