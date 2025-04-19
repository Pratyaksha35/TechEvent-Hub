
import { useState } from "react";
import { getRecommendedEvents } from "@/data/mockEvents";
import { EventCard } from "@/components/events/EventCard";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ChevronRight, Sparkles, BarChart3, History, ThumbsUp } from "lucide-react";

export default function Recommended() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  
  const recommendedEvents = getRecommendedEvents("user1");
  
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center p-4">
          <Card className="w-full max-w-xl">
            <CardHeader>
              <CardTitle>Get Personalized Recommendations</CardTitle>
              <CardDescription>
                Sign in to see event recommendations tailored specifically to your interests.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="mb-6 p-6 bg-purple-50 rounded-full">
                <Sparkles className="h-12 w-12 text-purple-500" />
              </div>
              <p className="text-center text-muted-foreground mb-6">
                Our AI-powered recommendation engine analyzes your preferences to find events that match your interests.
              </p>
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-purple-600 to-indigo-600"
                onClick={() => setIsLoggedIn(true)}
              >
                Sign In to Continue
              </Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 bg-gray-50">
        <div className="container mx-auto py-8 px-4">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">Recommended For You</h1>
            <Link to="/preferences">
              <Button variant="outline" className="flex items-center gap-2">
                <span>Update Preferences</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          <p className="text-lg text-muted-foreground mb-8">
            Events tailored to your interests based on your profile and past activity.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-10">
            <Card>
              <CardHeader className="pb-3">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                  <BarChart3 className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>Content-Based</CardTitle>
                <CardDescription>
                  Recommendations based on event categories and keywords you've shown interest in
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-2">
                  <ThumbsUp className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle>Collaborative</CardTitle>
                <CardDescription>
                  Events popular among users with similar preferences to yours
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-2">
                  <History className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>Hybrid Model</CardTitle>
                <CardDescription>
                  A blend of all factors, optimized with recency and relevance scoring
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
          
          <Tabs defaultValue="all" className="mb-8">
            <TabsList>
              <TabsTrigger value="all">All Recommendations</TabsTrigger>
              <TabsTrigger value="topMatch">Top Matches</TabsTrigger>
              <TabsTrigger value="trending">Trending</TabsTrigger>
              <TabsTrigger value="nearby">Nearby</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="pt-6">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {recommendedEvents.map(event => (
                  <EventCard key={event.id} event={event} showRelevance={true} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="topMatch" className="pt-6">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {recommendedEvents.slice(0, 4).map(event => (
                  <EventCard key={event.id} event={event} showRelevance={true} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="trending" className="pt-6">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[recommendedEvents[2], recommendedEvents[5], recommendedEvents[1]].map(event => (
                  <EventCard key={event.id} event={event} showRelevance={true} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="nearby" className="pt-6">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[recommendedEvents[4], recommendedEvents[0], recommendedEvents[7]].map(event => (
                  <EventCard key={event.id} event={event} showRelevance={true} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
