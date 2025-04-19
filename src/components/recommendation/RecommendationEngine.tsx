
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface RecommendationMetrics {
  contentBased: number;
  collaborative: number;
  recency: number;
  popularity: number;
  location: number;
  final: number;
}

interface RecommendationEngineProps {
  eventId: string;
  metrics?: RecommendationMetrics;
}

export function RecommendationEngine({ 
  eventId, 
  metrics = {
    contentBased: 0.85,
    collaborative: 0.92,
    recency: 0.78,
    popularity: 0.65,
    location: 0.70,
    final: 0.88
  } 
}: RecommendationEngineProps) {
  const [isAnimating, setIsAnimating] = useState(true);
  const [currentMetrics, setCurrentMetrics] = useState<RecommendationMetrics>({
    contentBased: 0,
    collaborative: 0,
    recency: 0,
    popularity: 0,
    location: 0,
    final: 0
  });

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => {
        setCurrentMetrics(metrics);
        setIsAnimating(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isAnimating, metrics]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center justify-between">
          <span>AI Recommendation Insights</span>
          <Badge variant="outline" className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
            {Math.round(metrics.final * 100)}% Match
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm">Content-Based Filtering</span>
            <span className="text-sm font-medium">{Math.round(currentMetrics.contentBased * 100)}%</span>
          </div>
          <Progress value={currentMetrics.contentBased * 100} className="h-2" />
          <p className="text-xs text-muted-foreground">Based on your past interests and event categories</p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm">Collaborative Filtering</span>
            <span className="text-sm font-medium">{Math.round(currentMetrics.collaborative * 100)}%</span>
          </div>
          <Progress value={currentMetrics.collaborative * 100} className="h-2" />
          <p className="text-xs text-muted-foreground">Based on similar users' preferences</p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm">Recency</span>
            <span className="text-sm font-medium">{Math.round(currentMetrics.recency * 100)}%</span>
          </div>
          <Progress value={currentMetrics.recency * 100} className="h-2" />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm">Popularity</span>
            <span className="text-sm font-medium">{Math.round(currentMetrics.popularity * 100)}%</span>
          </div>
          <Progress value={currentMetrics.popularity * 100} className="h-2" />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm">Location Proximity</span>
            <span className="text-sm font-medium">{Math.round(currentMetrics.location * 100)}%</span>
          </div>
          <Progress value={currentMetrics.location * 100} className="h-2" />
        </div>
      </CardContent>
    </Card>
  );
}
