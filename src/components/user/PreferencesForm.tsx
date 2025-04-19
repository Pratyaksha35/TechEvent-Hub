
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { categories } from "@/data/mockEvents";

export function PreferencesForm() {
  const [distancePreference, setDistancePreference] = useState([25]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [notificationPreferences, setNotificationPreferences] = useState({
    email: true,
    push: false,
    reminders: true
  });

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would save preferences to the backend
    console.log("Saving preferences:", {
      distancePreference,
      selectedCategories,
      notificationPreferences
    });
    // Show success message
    alert("Preferences saved successfully!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Event Preferences</CardTitle>
            <CardDescription>
              Customize your event recommendations based on your interests and preferences.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-medium">Categories of Interest</h3>
              <p className="text-sm text-muted-foreground">
                Select categories that interest you to receive more relevant recommendations.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {categories.map((category) => (
                  <div key={category.name} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`category-${category.name}`} 
                      checked={selectedCategories.includes(category.name)}
                      onCheckedChange={() => handleCategoryToggle(category.name)}
                    />
                    <Label 
                      htmlFor={`category-${category.name}`}
                      className="flex items-center cursor-pointer"
                    >
                      <span className="mr-2">{category.icon}</span>
                      {category.name}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t">
              <h3 className="font-medium">Location Preferences</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="location">Max Distance</Label>
                  <span className="text-sm">{distancePreference[0]} miles</span>
                </div>
                <Slider
                  id="location"
                  min={5}
                  max={100}
                  step={5}
                  value={distancePreference}
                  onValueChange={setDistancePreference}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="zipcode">Your ZIP Code</Label>
                <Input id="zipcode" placeholder="Enter your ZIP code" />
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t">
              <h3 className="font-medium">Notification Settings</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-notifications" className="cursor-pointer">
                    Email Notifications
                  </Label>
                  <Switch 
                    id="email-notifications" 
                    checked={notificationPreferences.email}
                    onCheckedChange={(checked) => 
                      setNotificationPreferences(prev => ({ ...prev, email: checked }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="push-notifications" className="cursor-pointer">
                    Push Notifications
                  </Label>
                  <Switch 
                    id="push-notifications" 
                    checked={notificationPreferences.push}
                    onCheckedChange={(checked) => 
                      setNotificationPreferences(prev => ({ ...prev, push: checked }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="event-reminders" className="cursor-pointer">
                    Event Reminders
                  </Label>
                  <Switch 
                    id="event-reminders" 
                    checked={notificationPreferences.reminders}
                    onCheckedChange={(checked) => 
                      setNotificationPreferences(prev => ({ ...prev, reminders: checked }))
                    }
                  />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">Save Preferences</Button>
          </CardFooter>
        </Card>
      </div>
    </form>
  );
}
