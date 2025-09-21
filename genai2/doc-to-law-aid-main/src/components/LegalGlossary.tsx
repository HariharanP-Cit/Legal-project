import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, BookOpen, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface GlossaryTerm {
  term: string;
  definition: string;
  example: string;
  category: string;
  difficulty: 'basic' | 'intermediate' | 'advanced';
}

const LegalGlossary = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const glossaryTerms: GlossaryTerm[] = [
    {
      term: "Indemnification",
      definition: "A contractual obligation where one party agrees to compensate another for certain losses or damages.",
      example: "Like insurance for a contract - if something goes wrong, the indemnifying party pays for it. Think of renting a car: if you damage it, you're responsible for the costs.",
      category: "Contract Law",
      difficulty: "intermediate"
    },
    {
      term: "Force Majeure",
      definition: "Unforeseeable circumstances that prevent a party from fulfilling a contract.",
      example: "Natural disasters, wars, or pandemics that make it impossible to keep your promises. Like a delivery being delayed due to a hurricane - it's beyond anyone's control.",
      category: "Contract Law",
      difficulty: "intermediate"
    },
    {
      term: "Liability",
      definition: "Legal responsibility for one's acts or omissions.",
      example: "Being responsible for something that goes wrong. Like being liable for damages if your dog bites someone - you're responsible for the consequences.",
      category: "Tort Law",
      difficulty: "basic"
    },
    {
      term: "Due Process",
      definition: "The legal requirement that the state must respect all legal rights owed to a person.",
      example: "Fair treatment in legal proceedings. Like having the right to a fair trial before being convicted - the system must follow proper procedures.",
      category: "Constitutional Law",
      difficulty: "basic"
    },
    {
      term: "Jurisdiction",
      definition: "The authority of a court to hear and decide a case.",
      example: "Which court can handle your case. Like how a local court handles local disputes, but federal court handles cases involving different states.",
      category: "Procedural Law",
      difficulty: "intermediate"
    },
    {
      term: "Breach of Contract",
      definition: "Failure to perform any duty or obligation specified in a contract.",
      example: "Breaking a promise you made in a contract. Like not paying rent when you agreed to - you've broken your part of the rental agreement.",
      category: "Contract Law",
      difficulty: "basic"
    }
  ];

  const categories = ['all', ...Array.from(new Set(glossaryTerms.map(term => term.category)))];

  const filteredTerms = glossaryTerms.filter(term => {
    const matchesSearch = term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         term.definition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || term.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'basic': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="p-6 shadow-card border-2 h-[600px] flex flex-col">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-primary mb-2 flex items-center">
          <BookOpen className="mr-3 h-6 w-6" />
          Legal Glossary
        </h2>
        <p className="text-muted-foreground">Search and understand legal terms with simple explanations</p>
      </div>

      {/* Search and filters */}
      <div className="space-y-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search legal terms..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="text-xs"
            >
              {category === 'all' ? 'All Categories' : category}
            </Button>
          ))}
        </div>
      </div>

      {/* Terms list */}
      <ScrollArea className="flex-1">
        <div className="space-y-4">
          {filteredTerms.map((termObj, index) => (
            <Card key={index} className="p-4 hover:shadow-md transition-shadow border">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-bold text-primary">{termObj.term}</h3>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary" className="text-xs">
                    {termObj.category}
                  </Badge>
                  <Badge className={`text-xs ${getDifficultyColor(termObj.difficulty)}`}>
                    {termObj.difficulty}
                  </Badge>
                </div>
              </div>
              
              <p className="text-foreground mb-3 leading-relaxed">
                {termObj.definition}
              </p>
              
              <div className="bg-accent/10 p-3 rounded-lg border-l-4 border-accent">
                <div className="flex items-start space-x-2">
                  <Star className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-accent mb-1">Simple Example:</p>
                    <p className="text-sm text-muted-foreground">{termObj.example}</p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredTerms.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-muted-foreground mb-2">No terms found</h3>
            <p className="text-muted-foreground">Try adjusting your search or category filter</p>
          </div>
        )}
      </ScrollArea>
    </Card>
  );
};

export default LegalGlossary;