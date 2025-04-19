
import { useParams, Link } from "react-router-dom";
import { getEventById } from "@/data/mockEvents";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Share2, 
  Heart, 
  Users, 
  ExternalLink 
} from "lucide-react";
import { RecommendationEngine } from "@/components/recommendation/RecommendationEngine";
import { useState } from "react";
import { EventCard } from "@/components/events/EventCard";

export default function EventDetail() {
  const { id } = useParams<{ id: string }>();
  const [isSaved, setIsSaved] = useState(false);
  
  const event = getEventById(id || "");
  
  // Get related events - in a real app, this would use the recommendation engine
  const relatedEvents = getEventById("1") 
    ? [getEventById("1"), getEventById("2"), getEventById("3")].filter(e => e?.id !== id)
    : [];
  
  if (!event) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Event Not Found</h1>
            <p className="text-gray-600 mb-6">The event you're looking for doesn't exist or has been removed.</p>
            <Link to="/events">
              <Button>Browse All Events</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 bg-gray-50">
        {/* Hero Section */}
        <div className="w-full h-64 md:h-96 relative bg-gray-900">
          <img 
            src={event.image} 
            alt={event.title} 
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <div className="container mx-auto">
              <div className="flex flex-wrap gap-2 mb-3">
                {event.category.map((cat, index) => (
                  <Badge key={index} className="bg-purple-600">
                    {cat}
                  </Badge>
                ))}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{event.title}</h1>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-white/90">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{event.location}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto py-8 px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-8">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-semibold mb-4">About This Event</h2>
                <p className="text-gray-700 mb-6">
                  {event.description}
                </p>
                <p className="text-gray-700">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.
                </p>
                <hr className="my-6" />
                <h3 className="text-xl font-semibold mb-3">What You'll Learn</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>Understanding the fundamentals of the topic</li>
                  <li>Practical skills you can apply immediately</li>
                  <li>Advanced techniques for experienced practitioners</li>
                  <li>Networking opportunities with industry professionals</li>
                </ul>
                <hr className="my-6" />
                <h3 className="text-xl font-semibold mb-3">Who Should Attend</h3>
                <p className="text-gray-700">
                  This event is perfect for beginners and experienced practitioners alike. Whether you're just starting out or looking to enhance your skills, you'll find valuable content tailored to your level.
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-semibold mb-4">Event Location</h2>
                <div className="aspect-video w-full bg-gray-200 rounded-md mb-4">
                  {/* Map would go here in a real app */}
                  <div className="w-full h-full flex items-center justify-center text-gray-500">
                    Interactive Map
                  </div>
                </div>
                <p className="font-medium">{event.location}</p>
                <p className="text-gray-600">123 Event Street, City, State, 12345</p>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-semibold mb-4">Organizer</h2>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                    <Users className="h-8 w-8 text-gray-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">Event Organization Name</h3>
                    <p className="text-gray-600 mb-2">Organizer of 12 previous events</p>
                    <Button variant="outline" size="sm">
                      View Profile
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm p-6 border-t-4 border-purple-600">
                <div className="space-y-6">
                  <div className="text-center">
                    <span className="text-2xl font-bold">Free</span>
                  </div>
                  <div className="flex flex-col gap-3">
                    <Button className="w-full bg-purple-600 hover:bg-purple-700">
                      Register for Event
                    </Button>
                    <Button 
                      variant="outline" 
                      className={`w-full flex items-center justify-center gap-2 ${
                        isSaved ? "text-red-500 border-red-200" : ""
                      }`}
                      onClick={handleSave}
                    >
                      <Heart className="h-4 w-4" fill={isSaved ? "currentColor" : "none"} />
                      {isSaved ? "Saved" : "Save Event"}
                    </Button>
                    <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                      <Share2 className="h-4 w-4" />
                      Share Event
                    </Button>
                  </div>
                </div>
              </div>
              
              <RecommendationEngine 
                eventId={event.id} 
                metrics={{
                  contentBased: 0.85,
                  collaborative: 0.92,
                  recency: 0.78,
                  popularity: 0.65,
                  location: 0.70,
                  final: event.relevanceScore || 0.85
                }}
              />
              
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="font-semibold mb-4">Event Details</h3>
                <div className="space-y-4 text-sm">
                  <div className="flex gap-3">
                    <Calendar className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="font-medium">Date and Time</p>
                      <p className="text-gray-600">{event.date}</p>
                      <p className="text-gray-600">{event.time}</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <MapPin className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-gray-600">{event.location}</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <ExternalLink className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="font-medium">Refund Policy</p>
                      <p className="text-gray-600">Refundable up to 7 days before the event</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Related Events */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Similar Events You Might Like</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedEvents.map(event => event && (
                <EventCard key={event.id} event={event} showRelevance />
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
