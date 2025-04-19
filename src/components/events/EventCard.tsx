
import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Heart } from "lucide-react";

export interface EventType {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string[];
  image: string;
  relevanceScore?: number;
}

interface EventCardProps {
  event: EventType;
  showRelevance?: boolean;
}

export function EventCard({ event, showRelevance = false }: EventCardProps) {
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSaved(!isSaved);
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <Link to={`/events/${event.id}`} className="block">
        <div className="aspect-video relative overflow-hidden">
          <img 
            src={event.image} 
            alt={event.title} 
            className="object-cover w-full h-full transition-transform hover:scale-105"
          />
          {showRelevance && event.relevanceScore && (
            <div className="absolute top-2 right-2">
              <Badge variant="secondary" className="bg-purple-500/90 text-white hover:bg-purple-600">
                {Math.round(event.relevanceScore * 100)}% Match
              </Badge>
            </div>
          )}
        </div>

        <CardHeader className="p-4">
          <div className="flex gap-2 flex-wrap mb-2">
            {event.category.map((cat, index) => (
              <Badge key={index} variant="outline">
                {cat}
              </Badge>
            ))}
          </div>
          <CardTitle className="text-xl line-clamp-1">{event.title}</CardTitle>
          <CardDescription className="line-clamp-2">{event.description}</CardDescription>
        </CardHeader>

        <CardContent className="p-4 pt-0 text-sm space-y-2">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 opacity-70" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 opacity-70" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 opacity-70" />
            <span>{event.location}</span>
          </div>
        </CardContent>

        <CardFooter className="p-4 flex justify-between">
          <Button size="sm" variant="default">
            Details
          </Button>
          <Button 
            size="icon" 
            variant="ghost" 
            className={isSaved ? "text-red-500" : ""}
            onClick={handleSave}
            aria-label={isSaved ? "Unsave event" : "Save event"}
          >
            <Heart className="h-5 w-5" fill={isSaved ? "currentColor" : "none"} />
          </Button>
        </CardFooter>
      </Link>
    </Card>
  );
}
