
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { PreferencesForm } from "@/components/user/PreferencesForm";

export default function Preferences() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 bg-gray-50">
        <div className="container mx-auto py-8 px-4">
          <h1 className="text-3xl font-bold mb-2">Your Preferences</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Customize your event recommendations by updating your preferences.
          </p>
          
          <PreferencesForm />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
