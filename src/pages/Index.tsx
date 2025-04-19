import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EventCard } from "@/components/events/EventCard";
import { getRecommendedEvents } from "@/data/mockEvents";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { LoginForm } from "@/components/ui/login-form";
import { Search, TrendingUp, Tag, Map } from "lucide-react";

export default function Index() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  
  // Get top 4 recommended events
  const topEvents = getRecommendedEvents("user1").slice(0, 4);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setShowLoginModal(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 text-white py-20 md:py-32">
          <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=2940&q=80')] bg-cover bg-center mix-blend-overlay"></div>
          <div className="container relative z-10 mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Find Tech Events <span className="text-purple-300">That Truly Match</span> Your Interests
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-purple-100">
              Our AI-powered recommendation engine analyzes your preferences to find tech events you'll love.
            </p>
            <div className="max-w-xl mx-auto mb-10">
              <div className="flex flex-col sm:flex-row gap-4">
                <Input 
                  placeholder="Search events..." 
                  className="bg-white/10 border-purple-400/30 placeholder:text-purple-200 text-white"
                />
                <Button size="lg" className="bg-white text-purple-900 hover:bg-purple-100">
                  Find Events
                </Button>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-white/10">
                <TrendingUp className="h-4 w-4" /> Personalized Recommendations
              </span>
              <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-white/10">
                <Tag className="h-4 w-4" /> Interest-Based Matching
              </span>
              <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-white/10">
                <Map className="h-4 w-4" /> Location-Aware Suggestions
              </span>
              <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-white/10">
                <Search className="h-4 w-4" /> Smart Search
              </span>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 bg-purple-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">How TechEvent Hub Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-purple-600">
                    <circle cx="12" cy="12" r="10" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-2">Profile Your Interests</h3>
                <p className="text-gray-600">We learn about your preferences by tracking what events you view, like, and attend.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-purple-600">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-2">AI-Powered Matching</h3>
                <p className="text-gray-600">Our algorithms analyze your profile and match you with events you're most likely to enjoy.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-purple-600">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-2">Continuous Learning</h3>
                <p className="text-gray-600">The more you use TechEvent Hub, the better it gets at recommending events you'll love.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Recommended Events Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">Recommended For You</h2>
              <Link to="/recommended">
                <Button variant="outline">View All</Button>
              </Link>
            </div>
            
            {isLoggedIn ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {topEvents.map(event => (
                  <EventCard key={event.id} event={event} showRelevance={true} />
                ))}
              </div>
            ) : (
              <div className="bg-purple-50 rounded-xl p-8 text-center">
                <h3 className="text-2xl font-semibold mb-4">Get Personalized Recommendations</h3>
                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                  Sign in to see event recommendations tailored specifically to your interests and preferences.
                </p>
                <Button 
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white" 
                  size="lg"
                  onClick={() => setShowLoginModal(true)}
                >
                  Sign In to Get Started
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Discover Tech Events You'll Love?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Create an account and start exploring events curated just for you.
            </p>
            <Button 
              size="lg" 
              variant="secondary"
              onClick={() => setShowLoginModal(true)}
            >
              Get Started Now
            </Button>
          </div>
        </section>
      </main>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-md">
            <LoginForm onSuccess={handleLoginSuccess} />
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
