
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Copy, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CopyButtonProps {
  text: string;
  className?: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({ text, className = '' }) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const copyToClipboard = async () => {
    if (!text || text.includes('Please select') || text.includes('Click generate')) {
      toast({
        title: "Nothing to copy",
        description: "Generate a password first!",
        variant: "destructive",
      });
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast({
        title: "Copied!",
        description: "Password copied to clipboard",
      });

      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
      toast({
        title: "Copy failed",
        description: "Unable to copy to clipboard",
        variant: "destructive",
      });
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={copyToClipboard}
      className={`h-8 w-8 p-0 hover:bg-primary/10 transition-all duration-200 ${className} ${
        copied ? 'text-green-600 bg-green-50' : 'text-muted-foreground hover:text-primary'
      }`}
      disabled={!text || text.includes('Please select') || text.includes('Click generate')}
    >
      {copied ? (
        <Check className="h-4 w-4 animate-bounce-gentle" />
      ) : (
        <Copy className="h-4 w-4" />
      )}
    </Button>
  );
};

export default CopyButton;
