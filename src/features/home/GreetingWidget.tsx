import React from 'react';
import { Card, CardContent } from '@/shared/ui/Card';
import { useTime } from '@/shared/hooks/useTime';
import { profileConfig } from '@/config/profile';

function getGreeting(hour: number): string {
  if (hour >= 5 && hour < 12) return 'Good morning';
  if (hour >= 12 && hour < 17) return 'Good afternoon';
  if (hour >= 17 && hour < 22) return 'Good evening';
  return 'Good late night';
}

export function GreetingWidget() {
  const time = useTime(60000); // Only need to update every minute for greeting
  const hour = time.getHours();
  const greeting = getGreeting(hour);

  const subtitles = [
    profileConfig.tagline,
    "Today's focus: Deep work",
    "Keep building",
  ];
  // Simple rotating subtitle based on hour
  const subtitle = subtitles[hour % subtitles.length];

  return (
    <Card className="flex flex-col justify-center">
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold tracking-tight mb-2">
          {greeting}, {profileConfig.name.split(' ')[0]}.
        </h2>
        <p className="text-muted-foreground">{subtitle}</p>
      </CardContent>
    </Card>
  );
}
