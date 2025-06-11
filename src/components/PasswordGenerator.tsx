
import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { RefreshCw, Shield, Zap } from 'lucide-react';
import PasswordStrengthMeter from './PasswordStrengthMeter';
import CopyButton from './CopyButton';

interface PasswordOptions {
  length: number;
  includeUppercase: boolean;
  includeLowercase: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
  excludeSimilar: boolean;
}

const PasswordGenerator: React.FC = () => {
  const [password, setPassword] = useState('');
  const [options, setOptions] = useState<PasswordOptions>({
    length: 16,
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSymbols: true,
    excludeSimilar: false,
  });

  const generatePassword = useCallback(() => {
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    const similar = 'il1Lo0O';

    let charset = '';
    let guaranteedChars = '';

    if (options.includeUppercase) {
      const chars = options.excludeSimilar ? uppercase.replace(/[LO]/g, '') : uppercase;
      charset += chars;
      guaranteedChars += chars[Math.floor(Math.random() * chars.length)];
    }

    if (options.includeLowercase) {
      const chars = options.excludeSimilar ? lowercase.replace(/[lo]/g, '') : lowercase;
      charset += chars;
      guaranteedChars += chars[Math.floor(Math.random() * chars.length)];
    }

    if (options.includeNumbers) {
      const chars = options.excludeSimilar ? numbers.replace(/[10]/g, '') : numbers;
      charset += chars;
      guaranteedChars += chars[Math.floor(Math.random() * chars.length)];
    }

    if (options.includeSymbols) {
      charset += symbols;
      guaranteedChars += symbols[Math.floor(Math.random() * symbols.length)];
    }

    if (charset === '') {
      setPassword('Please select at least one character type');
      return;
    }

    let generatedPassword = guaranteedChars;
    
    for (let i = guaranteedChars.length; i < options.length; i++) {
      generatedPassword += charset[Math.floor(Math.random() * charset.length)];
    }

    // Shuffle the password to avoid predictable patterns
    const shuffled = generatedPassword.split('').sort(() => Math.random() - 0.5).join('');
    setPassword(shuffled);
  }, [options]);

  const updateOption = <K extends keyof PasswordOptions>(
    key: K,
    value: PasswordOptions[K]
  ) => {
    setOptions(prev => ({ ...prev, [key]: value }));
  };

  React.useEffect(() => {
    generatePassword();
  }, [generatePassword]);

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <Card className="overflow-hidden border-0 shadow-2xl animate-fade-in">
        <CardHeader className="gradient-primary text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10">
            <CardTitle className="text-2xl font-bold flex items-center gap-2">
              <Shield className="h-6 w-6" />
              Password Generator
            </CardTitle>
            <p className="text-white/90 mt-2">
              Create secure, customizable passwords instantly
            </p>
          </div>
          <div className="absolute -top-10 -right-10 w-20 h-20 bg-white/10 rounded-full animate-pulse-slow"></div>
          <div className="absolute -bottom-5 -left-5 w-15 h-15 bg-white/5 rounded-full animate-bounce-gentle"></div>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          {/* Generated Password Display */}
          <div className="space-y-3">
            <Label className="text-sm font-medium flex items-center gap-2">
              <Zap className="h-4 w-4 text-yellow-500" />
              Generated Password
            </Label>
            <div className="relative">
              <Input
                value={password}
                readOnly
                className="font-mono text-lg pr-12 bg-muted/50 border-2 focus:border-primary/50 transition-all duration-200"
                placeholder="Click generate to create password..."
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2">
                <CopyButton text={password} />
              </div>
            </div>
            <PasswordStrengthMeter password={password} />
          </div>

          <Separator />

          {/* Password Length */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Password Length</Label>
              <span className="text-sm font-bold bg-primary/10 px-2 py-1 rounded">
                {options.length}
              </span>
            </div>
            <Slider
              value={[options.length]}
              onValueChange={(value) => updateOption('length', value[0])}
              max={128}
              min={4}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>4</span>
              <span>128</span>
            </div>
          </div>

          <Separator />

          {/* Character Options */}
          <div className="space-y-4">
            <Label className="text-sm font-medium">Character Types</Label>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center justify-between p-3 rounded-lg border bg-card">
                <Label htmlFor="uppercase" className="text-sm">
                  Uppercase Letters (A-Z)
                </Label>
                <Switch
                  id="uppercase"
                  checked={options.includeUppercase}
                  onCheckedChange={(checked) => updateOption('includeUppercase', checked)}
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg border bg-card">
                <Label htmlFor="lowercase" className="text-sm">
                  Lowercase Letters (a-z)
                </Label>
                <Switch
                  id="lowercase"
                  checked={options.includeLowercase}
                  onCheckedChange={(checked) => updateOption('includeLowercase', checked)}
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg border bg-card">
                <Label htmlFor="numbers" className="text-sm">
                  Numbers (0-9)
                </Label>
                <Switch
                  id="numbers"
                  checked={options.includeNumbers}
                  onCheckedChange={(checked) => updateOption('includeNumbers', checked)}
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg border bg-card">
                <Label htmlFor="symbols" className="text-sm">
                  Symbols (!@#$...)
                </Label>
                <Switch
                  id="symbols"
                  checked={options.includeSymbols}
                  onCheckedChange={(checked) => updateOption('includeSymbols', checked)}
                />
              </div>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg border bg-muted/30">
              <div>
                <Label htmlFor="exclude-similar" className="text-sm font-medium">
                  Exclude Similar Characters
                </Label>
                <p className="text-xs text-muted-foreground mt-1">
                  Excludes: i, l, 1, L, o, 0, O
                </p>
              </div>
              <Switch
                id="exclude-similar"
                checked={options.excludeSimilar}
                onCheckedChange={(checked) => updateOption('excludeSimilar', checked)}
              />
            </div>
          </div>

          <Separator />

          {/* Generate Button */}
          <Button
            onClick={generatePassword}
            className="w-full gradient-secondary text-white font-semibold py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-200 group"
          >
            <RefreshCw className="h-5 w-5 mr-2 group-hover:rotate-180 transition-transform duration-300" />
            Generate New Password
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PasswordGenerator;
