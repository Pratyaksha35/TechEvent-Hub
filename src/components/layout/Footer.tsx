
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t py-8 md:py-12">
      <div className="container flex flex-col md:flex-row justify-between gap-6">
        <div className="space-y-4 md:max-w-xs">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg p-1.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5 text-white"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            </div>
            <span className="font-bold text-xl">TechEvent Hub</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Discover events tailored specifically to your interests and preferences.
            Our AI-powered platform connects you with tech experiences you'll love.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <h3 className="font-medium">Product</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/events" className="text-muted-foreground hover:text-foreground">Events</Link></li>
              <li><Link to="/recommended" className="text-muted-foreground hover:text-foreground">Recommendations</Link></li>
              <li><Link to="/categories" className="text-muted-foreground hover:text-foreground">Categories</Link></li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="font-medium">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="text-muted-foreground hover:text-foreground">About</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-foreground">Contact</Link></li>
              <li><Link to="/careers" className="text-muted-foreground hover:text-foreground">Careers</Link></li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="font-medium">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/privacy" className="text-muted-foreground hover:text-foreground">Privacy</Link></li>
              <li><Link to="/terms" className="text-muted-foreground hover:text-foreground">Terms</Link></li>
              <li><Link to="/cookies" className="text-muted-foreground hover:text-foreground">Cookies</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="container mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} TechEvent Hub. All rights reserved.
      </div>
    </footer>
  );
}
