import React from 'react';
import { Card, CardContent } from '@/shared/ui/Card';
import { profileConfig } from '@/config/profile';

export function AvatarWidget() {
  return (
    <Card className="overflow-hidden group">
      <CardContent className="p-0 h-full flex items-center justify-center bg-secondary/50">
        <img
          src={profileConfig.avatarUrl}
          alt={profileConfig.name}
          className="w-32 h-32 rounded-full object-cover transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3 shadow-md"
          onError={(e) => {
            // Fallback SVG
            e.currentTarget.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></svg>';
            e.currentTarget.className = "w-16 h-16 opacity-50";
          }}
        />
      </CardContent>
    </Card>
  );
}
