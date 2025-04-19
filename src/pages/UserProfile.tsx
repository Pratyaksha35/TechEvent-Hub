
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getRecommendedEvents } from "@/data/mockEvents";
import { EventCard } from "@/components/events/EventCard";
import { Calendar, Heart, Clock, Settings, User } from "lucide-react";

export default function UserProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "Jamie Smith",
    email: "jamie@example.com",
    location: "San Francisco, CA"
  });
  
  const savedEvents = getRecommendedEvents("user1").slice(0, 3);
  const attendedEvents = getRecommendedEvents("user1").slice(3, 5);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    // In a real app, this would save to the backend
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 bg-gray-50">
        <div className="container mx-auto py-8 px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-1 space-y-6">
              <Card>
                <CardHeader className="text-center">
                  <Avatar className="w-24 h-24 mx-auto">
                    <AvatarImage src="/placeholder.svg" alt={formData.name} />
                    <AvatarFallback>JS</AvatarFallback>
                  </Avatar>
                  
                  {isEditing ? (
                    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input 
                          id="name" 
                          name="name" 
                          value={formData.name} 
                          onChange={handleInputChange} 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          name="email" 
                          type="email" 
                          value={formData.email} 
                          onChange={handleInputChange} 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input 
                          id="location" 
                          name="location" 
                          value={formData.location} 
                          onChange={handleInputChange} 
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button type="submit">Save</Button>
                        <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                          Cancel
                        </Button>
                      </div>
                    </form>
                  ) : (
                    <>
                      <CardTitle className="mt-4">{formData.name}</CardTitle>
                      <CardDescription className="text-center">
                        {formData.email}<br />
                        {formData.location}
                      </CardDescription>
                      
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="mt-2"
                        onClick={() => setIsEditing(true)}
                      >
                        Edit Profile
                      </Button>
                    </>
                  )}
                </CardHeader>
                
                <CardContent>
                  <div className="border-t pt-4">
                    <h3 className="font-medium mb-2">Interests</h3>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">AI</Badge>
                      <Badge variant="outline">Web Development</Badge>
                      <Badge variant="outline">Design</Badge>
                      <Badge variant="outline">Flutter</Badge>
                    </div>
                  </div>
                  
                  <div className="border-t mt-4 pt-4">
                    <h3 className="font-medium mb-2">Your Stats</h3>
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="font-bold text-2xl">3</div>
                        <div className="text-xs text-gray-500">Saved Events</div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="font-bold text-2xl">2</div>
                        <div className="text-xs text-gray-500">Attended</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Links</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link to="/preferences">
                      <Settings className="mr-2 h-4 w-4" />
                      Update Preferences
                    </Link>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link to="/saved">
                      <Heart className="mr-2 h-4 w-4" />
                      Saved Events
                    </Link>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link to="/history">
                      <Clock className="mr-2 h-4 w-4" />
                      Event History
                    </Link>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link to="/account">
                      <User className="mr-2 h-4 w-4" />
                      Account Settings
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
            
            <div className="md:col-span-2 space-y-6">
              <Tabs defaultValue="saved">
                <TabsList className="w-full">
                  <TabsTrigger value="saved" className="flex-1">Saved Events</TabsTrigger>
                  <TabsTrigger value="attending" className="flex-1">Attending</TabsTrigger>
                  <TabsTrigger value="history" className="flex-1">History</TabsTrigger>
                </TabsList>
                
                <TabsContent value="saved" className="mt-6">
                  <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <Heart className="h-5 w-5 mr-2 text-pink-500" />
                    Saved Events
                  </h2>
                  
                  {savedEvents.length > 0 ? (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {savedEvents.map(event => (
                        <EventCard key={event.id} event={event} />
                      ))}
                    </div>
                  ) : (
                    <Card>
                      <CardContent className="text-center py-12">
                        <Heart className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                        <h3 className="text-xl font-medium mb-2">No saved events</h3>
                        <p className="text-gray-500 mb-4">
                          When you save events, they'll appear here so you can easily find them later.
                        </p>
                        <Button asChild>
                          <Link to="/events">Browse Events</Link>
                        </Button>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>
                
                <TabsContent value="attending" className="mt-6">
                  <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-blue-500" />
                    Upcoming Events
                  </h2>
                  
                  {attendedEvents.length > 0 ? (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {attendedEvents.map(event => (
                        <EventCard key={event.id} event={event} />
                      ))}
                    </div>
                  ) : (
                    <Card>
                      <CardContent className="text-center py-12">
                        <Calendar className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                        <h3 className="text-xl font-medium mb-2">No upcoming events</h3>
                        <p className="text-gray-500 mb-4">
                          You haven't registered for any upcoming events yet.
                        </p>
                        <Button asChild>
                          <Link to="/events">Find Events</Link>
                        </Button>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>
                
                <TabsContent value="history" className="mt-6">
                  <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <Clock className="h-5 w-5 mr-2 text-gray-500" />
                    Past Events
                  </h2>
                  
                  <Card>
                    <CardContent className="text-center py-12">
                      <Clock className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                      <h3 className="text-xl font-medium mb-2">No past events</h3>
                      <p className="text-gray-500 mb-4">
                        Your event history will appear here after you've attended events.
                      </p>
                      <Button asChild>
                        <Link to="/events">Browse Events</Link>
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
              
              <Card>
                <CardHeader>
                  <CardTitle>Your Recommendation Feed</CardTitle>
                  <CardDescription>
                    Events recommended for you based on your preferences
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-2 gap-6">
                    {getRecommendedEvents("user1").slice(0, 4).map(event => (
                      <EventCard key={event.id} event={event} showRelevance />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
