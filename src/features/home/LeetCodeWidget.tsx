import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/Card';
import { Skeleton } from '@/shared/ui/Skeleton';
import { fetchLeetCodeStats } from '@/services/leetcode/providers';
import { profileConfig } from '@/config/profile';
import { Code2, Trophy, Target } from 'lucide-react';
import { Button } from '@/shared/ui/Button';

export function LeetCodeWidget() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['leetcodeStats'],
    queryFn: fetchLeetCodeStats,
    staleTime: 15 * 60 * 1000,
  });

  if (isLoading) {
    return (
      <Card className="col-span-1">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Code2 className="w-5 h-5"/> LeetCode</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-16 w-full" />
          <div className="grid grid-cols-3 gap-2">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isError || !data) {
    return (
       <Card className="col-span-1 border-destructive/50">
         <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive"><Code2 className="w-5 h-5"/> LeetCode Error</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-sm text-muted-foreground">Failed to load LeetCode stats.</p>
          <Button variant="outline" size="sm" onClick={() => refetch()}>Retry</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="col-span-1 flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Code2 className="w-5 h-5" />
            LeetCode
          </div>
          <a href={`https://leetcode.com/u/${profileConfig.leetcode.username}`} target="_blank" rel="noopener noreferrer" className="text-xs hover:underline text-muted-foreground">
            @{profileConfig.leetcode.username}
          </a>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col gap-4">
        <div className="flex items-end justify-between">
           <div>
             <div className="text-3xl font-bold font-mono text-primary">{data.totalSolved}</div>
             <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Total Solved</div>
           </div>
           <div className="text-right">
             <div className="text-sm font-semibold flex items-center justify-end gap-1"><Trophy className="w-3 h-3 text-yellow-500"/> #{data.ranking.toLocaleString()}</div>
             <div className="text-xs text-muted-foreground flex items-center justify-end gap-1"><Target className="w-3 h-3"/> {data.acceptanceRate}% Acc</div>
           </div>
        </div>

        <div className="grid grid-cols-3 gap-2 mt-auto">
          <div className="bg-green-500/10 border border-green-500/20 rounded p-2 text-center">
            <div className="text-green-500 font-mono font-bold">{data.easySolved}</div>
            <div className="text-[10px] uppercase tracking-wider text-green-500/80">Easy</div>
          </div>
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded p-2 text-center">
            <div className="text-yellow-500 font-mono font-bold">{data.mediumSolved}</div>
            <div className="text-[10px] uppercase tracking-wider text-yellow-500/80">Med</div>
          </div>
          <div className="bg-red-500/10 border border-red-500/20 rounded p-2 text-center">
            <div className="text-red-500 font-mono font-bold">{data.hardSolved}</div>
            <div className="text-[10px] uppercase tracking-wider text-red-500/80">Hard</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
