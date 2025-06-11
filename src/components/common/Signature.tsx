
import React from 'react';

interface SignatureProps {
  variant?: 'default' | 'print' | 'minimal';
  className?: string;
}

export const Signature = ({ variant = 'default', className = '' }: SignatureProps) => {
  const baseClasses = "text-center text-sm text-muted-foreground";
  const printClasses = "text-black text-xs";
  const minimalClasses = "text-xs";
  
  const classes = variant === 'print' ? printClasses : 
                 variant === 'minimal' ? `${baseClasses} ${minimalClasses}` : 
                 baseClasses;

  return (
    <div className={`${classes} ${className}`}>
      <div className="border-t pt-4 mt-4">
        <p className="font-medium mb-2">Made by Elton Niati</p>
        <div className="space-y-1">
          <p>🌐 eaglevision.dev30.com</p>
          <p>📱 WhatsApp: 027659132527</p>
          <p>📘 Facebook: eaglevisiondev30</p>
          <p>🐦 Twitter: eaglevisiondev30</p>
        </div>
      </div>
    </div>
  );
};
