import { Button } from "@/components/ui/button";
import { BookOpen, MessageSquare, Upload } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative bg-gradient-legal text-white py-24 px-4 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-black/10" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
      
      <div className="relative container mx-auto max-w-6xl text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
          Legal Education
          <span className="block text-accent"> Companion</span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-12 text-white/90 max-w-3xl mx-auto">
          Simplify complex legal documents, get instant answers, and learn law through interactive scenarios. 
          Your personal legal education assistant.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <Button 
            size="lg" 
            variant="secondary" 
            className="bg-accent text-primary hover:bg-accent/90 font-semibold px-8 py-3 text-lg shadow-gold"
          >
            <Upload className="mr-2 h-5 w-5" />
            Upload Document
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-2 border-white/30 text-white hover:bg-white/10 font-semibold px-8 py-3 text-lg"
          >
            <MessageSquare className="mr-2 h-5 w-5" />
            Start Chat
          </Button>
        </div>
        
        {/* Feature highlights */}
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="flex flex-col items-center text-center">
            <div className="bg-white/10 p-4 rounded-full mb-4">
              <BookOpen className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Legal Glossary</h3>
            <p className="text-white/80">Instant definitions for complex legal terms</p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="bg-white/10 p-4 rounded-full mb-4">
              <MessageSquare className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-semibold mb-2">AI Q&A</h3>
            <p className="text-white/80">Chat with your documents for instant answers</p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="bg-white/10 p-4 rounded-full mb-4">
              <Upload className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Document Analysis</h3>
            <p className="text-white/80">Upload and analyze any legal document</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;