import { EventType } from "@/components/events/EventCard";

// Get scraped events from localStorage or use fallback mock data
const getSavedEvents = (): EventType[] => {
  const savedEvents = localStorage.getItem('scraped_events');
  if (savedEvents) {
    return JSON.parse(savedEvents);
  }
  
  // Fallback to original mock data if no scraped data exists
  return [
    {
    id: "1",
    title: "AI Developer Summit 2025",
    description: "Join the largest gathering of AI engineers and researchers to discuss the latest advancements in artificial intelligence and machine learning.",
    date: "May 15, 2025",
    time: "9:00 AM - 6:00 PM",
    location: "Tech Conference Center, San Francisco",
    category: ["AI", "Development", "Conference"],
    image: "https://images.unsplash.com/photo-1591453089816-0fbb971b454c?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3",
    relevanceScore: 0.95,
  },
  {
    id: "2",
    title: "Flutter Workshop for Beginners",
    description: "Learn the basics of Flutter development in this hands-on workshop. Build your first cross-platform mobile app in just one day!",
    date: "June 2, 2025",
    time: "10:00 AM - 4:00 PM",
    location: "Digital Innovation Hub, New York",
    category: ["Flutter", "Mobile Dev", "Workshop"],
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3",
    relevanceScore: 0.88,
  },
  {
    id: "3",
    title: "Web Development Hackathon",
    description: "Put your web development skills to the test in this 48-hour hackathon. Compete for prizes and connect with fellow developers.",
    date: "July 10-12, 2025",
    time: "Starts at 6:00 PM",
    location: "TechSpace, Austin",
    category: ["Web Dev", "Hackathon", "Networking"],
    image: "https://images.unsplash.com/photo-1513128034602-7814ccaddd4e?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3",
    relevanceScore: 0.92,
  },
  {
    id: "4",
    title: "Cybersecurity Conference 2025",
    description: "Stay ahead of cyber threats with expert talks on the latest security practices, tools, and technologies.",
    date: "August 5, 2025",
    time: "8:30 AM - 5:30 PM",
    location: "Security Center, Chicago",
    category: ["Cybersecurity", "InfoSec", "Conference"],
    image: "https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3",
    relevanceScore: 0.75,
  },
  {
    id: "5",
    title: "Data Science Bootcamp",
    description: "Intensive 3-day bootcamp covering essential data science concepts, tools, and techniques for real-world applications.",
    date: "September 18-20, 2025",
    time: "9:00 AM - 5:00 PM",
    location: "Learning Center, Seattle",
    category: ["Data Science", "Analytics", "Bootcamp"],
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3",
    relevanceScore: 0.82,
  },
  {
    id: "6",
    title: "Robotics Innovation Expo",
    description: "Explore cutting-edge robotics technologies and innovations from leading companies and research institutions.",
    date: "October 7, 2025",
    time: "10:00 AM - 7:00 PM",
    location: "Exhibition Hall, Boston",
    category: ["Robotics", "AI", "Innovation"],
    image: "https://images.unsplash.com/photo-1518314916381-77a37c2a49ae?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3",
    relevanceScore: 0.68,
  },
  {
    id: "7",
    title: "Blockchain Development Workshop",
    description: "Hands-on workshop about building decentralized applications and smart contracts on popular blockchain platforms.",
    date: "November 12, 2025",
    time: "1:00 PM - 6:00 PM",
    location: "Crypto Hub, Miami",
    category: ["Blockchain", "Development", "Workshop"],
    image: "https://images.unsplash.com/photo-1622630998477-20aa696ecb05?auto=format&fit=crop&q=80&w=2924&ixlib=rb-4.0.3",
    relevanceScore: 0.65,
  },
  {
    id: "8",
    title: "UX/UI Design Masterclass",
    description: "Learn advanced UX/UI design principles and techniques from industry experts to create exceptional user experiences.",
    date: "December 3, 2025",
    time: "9:30 AM - 4:30 PM",
    location: "Design Studio, Los Angeles",
    category: ["Design", "UX/UI", "Masterclass"],
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=2944&ixlib=rb-4.0.3",
    relevanceScore: 0.79,
  }
  ];
};

// Export the events from localStorage or fallback data
export const mockEvents: EventType[] = getSavedEvents();

// Function to get recommended events based on user preferences
export const getRecommendedEvents = (userId: string): EventType[] => {
  // In a real app, this would use the actual recommendation algorithm
  // For now, we'll just return sorted by relevance score
  return [...mockEvents].sort((a, b) => {
    return (b.relevanceScore || 0) - (a.relevanceScore || 0);
  });
};

// Function to get events by category
export const getEventsByCategory = (category: string): EventType[] => {
  return mockEvents.filter(event => 
    event.category.some(cat => 
      cat.toLowerCase() === category.toLowerCase()
    )
  );
};

// Function to get a single event by ID
export const getEventById = (id: string): EventType | undefined => {
  return mockEvents.find(event => event.id === id);
};

// Available categories
export const categories = [
  { name: "AI", icon: "🤖", color: "bg-blue-100" },
  { name: "Development", icon: "👨‍💻", color: "bg-green-100" },
  { name: "Design", icon: "🎨", color: "bg-purple-100" },
  { name: "Data Science", icon: "📊", color: "bg-yellow-100" },
  { name: "Cybersecurity", icon: "🔒", color: "bg-red-100" },
  { name: "Mobile Dev", icon: "📱", color: "bg-indigo-100" },
  { name: "Blockchain", icon: "⛓️", color: "bg-orange-100" },
  { name: "Robotics", icon: "🦾", color: "bg-teal-100" },
];
