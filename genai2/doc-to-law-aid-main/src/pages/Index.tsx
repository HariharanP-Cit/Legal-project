import { useState } from "react";
import Hero from "@/components/Hero";
import DocumentUpload from "@/components/DocumentUpload";
import ChatInterface from "@/components/ChatInterface";
import LegalGlossary from "@/components/LegalGlossary";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, MessageSquare, BookOpen } from "lucide-react";

const Index = () => {
  const [activeTab, setActiveTab] = useState("upload");

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Hero />
      
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Your Legal Education Toolkit
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose how you'd like to interact with legal documents and concepts
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 bg-secondary/50 p-2 rounded-lg shadow-card">
            <TabsTrigger 
              value="upload" 
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground flex items-center space-x-2 py-3"
            >
              <Upload className="h-4 w-4" />
              <span className="hidden sm:inline">Upload Document</span>
              <span className="sm:hidden">Upload</span>
            </TabsTrigger>
            <TabsTrigger 
              value="chat"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground flex items-center space-x-2 py-3"
            >
              <MessageSquare className="h-4 w-4" />
              <span className="hidden sm:inline">AI Assistant</span>
              <span className="sm:hidden">Chat</span>
            </TabsTrigger>
            <TabsTrigger 
              value="glossary"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground flex items-center space-x-2 py-3"
            >
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">Legal Glossary</span>
              <span className="sm:hidden">Glossary</span>
            </TabsTrigger>
          </TabsList>

          <div className="grid lg:grid-cols-2 gap-8">
            <TabsContent value="upload" className="lg:col-span-2">
              <div className="grid lg:grid-cols-2 gap-8">
                <DocumentUpload />
                <ChatInterface />
              </div>
            </TabsContent>

            <TabsContent value="chat" className="lg:col-span-2">
              <div className="max-w-4xl mx-auto">
                <ChatInterface />
              </div>
            </TabsContent>

            <TabsContent value="glossary" className="lg:col-span-2">
              <div className="max-w-4xl mx-auto">
                <LegalGlossary />
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>

      {/* Features section */}
      <section className="bg-secondary/30 py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">Why Choose Legal Education Companion?</h2>
            <p className="text-lg text-muted-foreground">Making legal education accessible and understandable for everyone</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-gradient-legal text-white p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Simplified Explanations</h3>
              <p className="text-muted-foreground">Complex legal terms explained in simple language with real-world analogies</p>
            </div>

            <div className="text-center">
              <div className="bg-gradient-legal text-white p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Interactive Learning</h3>
              <p className="text-muted-foreground">Ask questions and get instant answers about your documents or legal concepts</p>
            </div>

            <div className="text-center">
              <div className="bg-gradient-legal text-white p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Upload className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Document Analysis</h3>
              <p className="text-muted-foreground">Upload any legal document and get detailed explanations of its contents</p>
            </div>

            <div className="text-center">
              <div className="bg-gradient-gold text-white p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Multilingual Support</h3>
              <p className="text-muted-foreground">Available in multiple languages including English, Hindi, and Tamil</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-8">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-xl font-bold mb-2">Legal Education Companion</h3>
          <p className="text-primary-foreground/80">Making legal education accessible to everyone</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;