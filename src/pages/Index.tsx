
import React from 'react';
import PasswordGenerator from '@/components/PasswordGenerator';
import { Lock, Shield, Zap, CheckCircle } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Header Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5"></div>
        <div className="relative z-10 container mx-auto px-4 py-16 text-center">
          <div className="animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Shield className="h-4 w-4" />
              Secure & Professional
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent mb-6">
              Password Generator
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Create ultra-secure, customizable passwords instantly. Professional-grade security 
              with beautiful design and powerful features.
            </p>
            
            <div className="flex flex-wrap justify-center gap-6 mb-12">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Cryptographically Secure
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Customizable Length
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Strength Analysis
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="h-4 w-4 text-green-500" />
                One-Click Copy
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Password Generator */}
      <div className="container mx-auto px-4 pb-16">
        <PasswordGenerator />
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center p-6 rounded-xl bg-card border shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="w-12 h-12 gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Ultra Secure</h3>
            <p className="text-sm text-muted-foreground">
              Generated using cryptographically secure random algorithms for maximum protection.
            </p>
          </div>

          <div className="text-center p-6 rounded-xl bg-card border shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="w-12 h-12 gradient-secondary rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Lightning Fast</h3>
            <p className="text-sm text-muted-foreground">
              Generate passwords instantly with real-time strength analysis and immediate feedback.
            </p>
          </div>

          <div className="text-center p-6 rounded-xl bg-card border shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="w-12 h-12 gradient-success rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Fully Customizable</h3>
            <p className="text-sm text-muted-foreground">
              Control every aspect: length, character types, and exclusions for perfect passwords.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            Built with security and usability in mind. Your passwords are generated locally and never stored.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
