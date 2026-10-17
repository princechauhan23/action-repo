import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/Card';
import { Skeleton } from '@/shared/ui/Skeleton';
import { Badge } from '@/shared/ui/Badge';
import { fetchGithubStats } from '@/services/github';
import { Github, Star, Users, BookOpen, Clock } from 'lucide-react';
import { Button } from '@/shared/ui/Button';

export function GithubWidget() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['githubStats'],
    queryFn: fetchGithubStats,
    staleTime: 15 * 60 * 1000, // 15 mins
  });

  if (isLoading) {
    return (
      <Card className="col-span-1 md:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Github className="w-5 h-5"/> GitHub</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-24" />
          </div>
          <Skeleton className="h-24 w-full" />
        </CardContent>
      </Card>
    );
  }

  if (isError || !data) {
    return (
      <Card className="col-span-1 md:col-span-2 border-destructive/50">
         <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive"><Github className="w-5 h-5"/> GitHub Error</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-sm text-muted-foreground">Failed to load GitHub stats.</p>
          <Button variant="outline" size="sm" onClick={() => refetch()}>Retry</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="col-span-1 md:col-span-2 flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Github className="w-5 h-5" />
            GitHub
          </div>
          <div className="flex gap-2">
             {data.topLanguages.map(lang => (
               <Badge key={lang} variant="secondary" className="text-xs font-mono">{lang}</Badge>
             ))}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col gap-6">
        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col">
            <span className="text-2xl font-bold font-mono">{data.publicRepos}</span>
            <span className="text-xs text-muted-foreground flex items-center gap-1"><BookOpen className="w-3 h-3"/> Repos</span>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold font-mono">{data.followers}</span>
            <span className="text-xs text-muted-foreground flex items-center gap-1"><Users className="w-3 h-3"/> Followers</span>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold font-mono">{data.totalStars}</span>
            <span className="text-xs text-muted-foreground flex items-center gap-1"><Star className="w-3 h-3"/> Stars</span>
          </div>
        </div>

        <div className="space-y-3 flex-1">
          <h4 className="text-sm font-semibold flex items-center gap-2"><Clock className="w-4 h-4"/> Recent Activity</h4>
          <div className="space-y-2">
            {data.recentRepos.map(repo => (
              <a key={repo.name} href={repo.url} target="_blank" rel="noopener noreferrer" className="block p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
                <div className="font-semibold text-sm">{repo.name}</div>
                {repo.description && <div className="text-xs text-muted-foreground mt-1 line-clamp-1">{repo.description}</div>}
              </a>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
