
import { useState } from "react";
import { mockEvents, categories } from "@/data/mockEvents";
import { EventCard } from "@/components/events/EventCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Search, Filter, Calendar } from "lucide-react";

export default function Events() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("date");
  
  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  // Filter events based on search and categories
  const filteredEvents = mockEvents.filter(event => {
    const matchesSearch = 
      searchQuery === "" || 
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategories = 
      selectedCategories.length === 0 ||
      event.category.some(cat => selectedCategories.includes(cat));
    
    return matchesSearch && matchesCategories;
  });

  // Sort events
  const sortedEvents = [...filteredEvents].sort((a, b) => {
    if (sortBy === "date") {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    } else if (sortBy === "relevance") {
      return (b.relevanceScore || 0) - (a.relevanceScore || 0);
    }
    return 0;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 bg-gray-50">
        <div className="container mx-auto py-8 px-4">
          <h1 className="text-3xl font-bold mb-6">Browse Events</h1>
          
          {/* Search and Filter */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Search events..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="w-full md:w-48">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="date">Date (Soonest)</SelectItem>
                      <SelectItem value="relevance">Relevance</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Filter className="h-4 w-4 text-gray-500" />
                <span className="font-medium">Filter by Category</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Badge
                    key={category.name}
                    variant={selectedCategories.includes(category.name) ? "default" : "outline"}
                    className={`cursor-pointer ${
                      selectedCategories.includes(category.name) 
                        ? "bg-purple-600 hover:bg-purple-700" 
                        : "hover:bg-purple-100"
                    }`}
                    onClick={() => handleCategoryToggle(category.name)}
                  >
                    {category.icon} {category.name}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          
          {/* Event Tabs */}
          <Tabs defaultValue="all" className="mb-8">
            <TabsList>
              <TabsTrigger value="all">All Events</TabsTrigger>
              <TabsTrigger value="today">Today</TabsTrigger>
              <TabsTrigger value="thisWeek">This Week</TabsTrigger>
              <TabsTrigger value="thisMonth">This Month</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="pt-6">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {sortedEvents.map(event => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
              
              {sortedEvents.length === 0 && (
                <div className="text-center py-12">
                  <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-medium mb-2">No events found</h3>
                  <p className="text-gray-500 mb-4">
                    Try adjusting your search or filters to find events.
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategories([]);
                    }}
                  >
                    Clear filters
                  </Button>
                </div>
              )}
            </TabsContent>
            
            {/* Placeholder for other tabs - in a real app, these would filter by date */}
            <TabsContent value="today" className="pt-6">
              <div className="text-center py-12">
                <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-medium">No events today</h3>
                <p className="text-gray-500">Check back later or browse all events.</p>
              </div>
            </TabsContent>
            <TabsContent value="thisWeek" className="pt-6">
              <div className="text-center py-12">
                <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-medium">No events this week</h3>
                <p className="text-gray-500">Check back later or browse all events.</p>
              </div>
            </TabsContent>
            <TabsContent value="thisMonth" className="pt-6">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {sortedEvents.slice(0, 4).map(event => (
                  <EventCard key={event.id} event={event} />
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
