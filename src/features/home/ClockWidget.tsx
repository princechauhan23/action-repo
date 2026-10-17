import React, { useState } from 'react';
import { Card, CardContent } from '@/shared/ui/Card';
import { useTime } from '@/shared/hooks/useTime';
import { profileConfig } from '@/config/profile';
import { formatInTimeZone } from 'date-fns-tz';

export function ClockWidget() {
  const time = useTime();
  const [is24h, setIs24h] = useState(true);

  const timeFormat = is24h ? 'HH:mm:ss' : 'hh:mm:ss a';
  const formattedTime = formatInTimeZone(time, profileConfig.timezone, timeFormat);
  const formattedDate = formatInTimeZone(time, profileConfig.timezone, 'EEEE, MMMM do, yyyy');

  return (
    <Card className="flex flex-col justify-center cursor-pointer" onClick={() => setIs24h(!is24h)}>
      <CardContent className="p-6 text-center">
        <div className="font-mono text-4xl font-bold tracking-tighter mb-2">{formattedTime}</div>
        <div className="text-sm text-muted-foreground">{formattedDate}</div>
        <div className="text-xs text-muted-foreground mt-1 opacity-50">{profileConfig.timezone}</div>
      </CardContent>
    </Card>
  );
}
