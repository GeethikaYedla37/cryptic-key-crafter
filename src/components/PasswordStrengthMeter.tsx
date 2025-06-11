
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Shield, ShieldAlert, ShieldCheck, ShieldX } from 'lucide-react';

interface PasswordStrengthMeterProps {
  password: string;
}

type StrengthLevel = 'very-weak' | 'weak' | 'medium' | 'strong' | 'very-strong';

interface StrengthData {
  score: number;
  level: StrengthLevel;
  label: string;
  color: string;
  icon: React.ReactNode;
  suggestions: string[];
}

const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps> = ({ password }) => {
  const calculateStrength = (password: string): StrengthData => {
    if (!password || password.length === 0) {
      return {
        score: 0,
        level: 'very-weak',
        label: 'No Password',
        color: 'bg-gray-300',
        icon: <ShieldX className="h-4 w-4" />,
        suggestions: ['Enter a password to see strength analysis'],
      };
    }

    let score = 0;
    const suggestions: string[] = [];

    // Length scoring
    if (password.length >= 8) score += 1;
    else suggestions.push('Use at least 8 characters');
    
    if (password.length >= 12) score += 1;
    else if (password.length >= 8) suggestions.push('Consider using 12+ characters for better security');

    if (password.length >= 16) score += 1;

    // Character variety scoring
    if (/[a-z]/.test(password)) score += 1;
    else suggestions.push('Include lowercase letters');

    if (/[A-Z]/.test(password)) score += 1;
    else suggestions.push('Include uppercase letters');

    if (/[0-9]/.test(password)) score += 1;
    else suggestions.push('Include numbers');

    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    else suggestions.push('Include special characters');

    // Pattern analysis
    if (!/(.)\1{2,}/.test(password)) score += 1;
    else suggestions.push('Avoid repeating characters');

    if (!/012|123|234|345|456|567|678|789|890|abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz/i.test(password)) {
      score += 1;
    } else {
      suggestions.push('Avoid sequential characters');
    }

    // Common password patterns
    const commonPatterns = /password|123456|qwerty|abc123|admin|letmein|welcome|monkey|dragon/i;
    if (!commonPatterns.test(password)) score += 1;
    else suggestions.push('Avoid common password patterns');

    // Determine strength level
    let level: StrengthLevel;
    let label: string;
    let color: string;
    let icon: React.ReactNode;

    if (score <= 2) {
      level = 'very-weak';
      label = 'Very Weak';
      color = 'bg-red-500';
      icon = <ShieldX className="h-4 w-4" />;
    } else if (score <= 4) {
      level = 'weak';
      label = 'Weak';
      color = 'bg-orange-500';
      icon = <ShieldAlert className="h-4 w-4" />;
    } else if (score <= 6) {
      level = 'medium';
      label = 'Medium';
      color = 'bg-yellow-500';
      icon = <Shield className="h-4 w-4" />;
    } else if (score <= 8) {
      level = 'strong';
      label = 'Strong';
      color = 'bg-green-500';
      icon = <ShieldCheck className="h-4 w-4" />;
    } else {
      level = 'very-strong';
      label = 'Very Strong';
      color = 'bg-emerald-500';
      icon = <ShieldCheck className="h-4 w-4" />;
    }

    return {
      score: Math.min(score, 10),
      level,
      label,
      color,
      icon,
      suggestions: suggestions.slice(0, 3), // Limit to top 3 suggestions
    };
  };

  const strength = calculateStrength(password);
  const progressValue = (strength.score / 10) * 100;

  return (
    <div className="space-y-3 animate-slide-up">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={`${strength.color.replace('bg-', 'text-')} transition-colors duration-300`}>
            {strength.icon}
          </span>
          <span className="text-sm font-medium">
            Strength: <span className={strength.color.replace('bg-', 'text-')}>{strength.label}</span>
          </span>
        </div>
        <span className="text-xs text-muted-foreground">
          {strength.score}/10
        </span>
      </div>

      <div className="relative">
        <Progress 
          value={progressValue} 
          className="h-2 transition-all duration-500 ease-out"
        />
        <div 
          className={`absolute top-0 left-0 h-2 rounded-full transition-all duration-500 ease-out ${strength.color}`}
          style={{ width: `${progressValue}%` }}
        />
      </div>

      {strength.suggestions.length > 0 && (
        <div className="bg-muted/50 rounded-lg p-3 space-y-1">
          <p className="text-xs font-medium text-muted-foreground mb-2">
            💡 Suggestions to improve strength:
          </p>
          {strength.suggestions.map((suggestion, index) => (
            <p key={index} className="text-xs text-muted-foreground flex items-center gap-2">
              <span className="w-1 h-1 bg-muted-foreground rounded-full"></span>
              {suggestion}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default PasswordStrengthMeter;
