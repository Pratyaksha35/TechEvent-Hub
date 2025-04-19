
import { CrawlForm } from "@/components/CrawlForm";
import { Card } from "@/components/ui/card";

export default function Scraper() {
  return (
    <div className="container mx-auto py-8">
      <Card className="p-6">
        <h1 className="text-3xl font-bold text-center mb-4">Website Data Scraper</h1>
        <p className="text-center text-gray-600 mb-8">
          Scrape data from any website to populate your event listings
        </p>
        <CrawlForm />
      </Card>
    </div>
  );
}
