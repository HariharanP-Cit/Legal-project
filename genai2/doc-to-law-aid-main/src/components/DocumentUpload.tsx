import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileText, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const DocumentUpload = () => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFile = (file: File) => {
    const allowedTypes = ['application/pdf', 'text/plain', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Unsupported file type",
        description: "Please upload PDF, DOC, DOCX, or TXT files only.",
        variant: "destructive"
      });
      return;
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      toast({
        title: "File too large",
        description: "Please upload files smaller than 10MB.",
        variant: "destructive"
      });
      return;
    }

    setUploadedFile(file);
    processFile(file);
  };

  const processFile = async (file: File) => {
    setIsProcessing(true);
    
    // Simulate file processing
    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: "Document processed successfully",
        description: `${file.name} is ready for analysis. You can now ask questions about this document.`
      });
    }, 2000);
  };

  const removeFile = () => {
    setUploadedFile(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <Card className="p-8 shadow-card border-2">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-primary mb-2">Upload Legal Document</h2>
        <p className="text-muted-foreground">Upload your legal document to start asking questions</p>
      </div>

      {!uploadedFile ? (
        <div
          className={`relative border-2 border-dashed rounded-lg p-12 transition-all ${
            dragActive 
              ? 'border-accent bg-accent/5 scale-[1.02]' 
              : 'border-muted hover:border-accent/50 hover:bg-accent/5'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="text-center">
            <Upload className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              Drag and drop your document here
            </h3>
            <p className="text-muted-foreground mb-6">
              or click to browse files
            </p>
            <Button 
              onClick={() => inputRef.current?.click()}
              variant="outline"
              className="hover:bg-accent/10"
            >
              Browse Files
            </Button>
          </div>
          
          <input
            ref={inputRef}
            type="file"
            className="absolute inset-0 opacity-0 cursor-pointer"
            accept=".pdf,.doc,.docx,.txt"
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
          />
        </div>
      ) : (
        <div className="bg-secondary/50 p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold">{uploadedFile.name}</h4>
                <p className="text-sm text-muted-foreground">
                  {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
                {isProcessing && (
                  <div className="flex items-center mt-2">
                    <div className="animate-spin h-4 w-4 border-2 border-accent border-t-transparent rounded-full mr-2" />
                    <span className="text-sm text-accent font-medium">Processing...</span>
                  </div>
                )}
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={removeFile}
              className="text-muted-foreground hover:text-destructive"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      <div className="mt-6 text-sm text-muted-foreground">
        <p>Supported formats: PDF, DOC, DOCX, TXT • Maximum file size: 10MB</p>
      </div>
    </Card>
  );
};

export default DocumentUpload;