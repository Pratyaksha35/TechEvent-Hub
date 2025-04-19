
import { CrawlForm } from "@/components/CrawlForm";

export default function Scraper() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Website Scraper</h1>
      <CrawlForm />
    </div>
  );
}
