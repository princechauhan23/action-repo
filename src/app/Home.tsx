import React from 'react';
import { ClockWidget, GreetingWidget, AvatarWidget, GithubWidget, LeetCodeWidget } from '@/features/home';
import { Gallery, CommandPalette } from '@/features/docs-gallery';
import { ErrorBoundary } from '@/shared/ui/ErrorBoundary';
import { siteConfig } from '@/config/site';
import { Helmet } from 'react-helmet-async';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/core/theme/ThemeProvider';
import { Button } from '@/shared/ui/Button';

export function Home() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background p-4 md:p-8 lg:p-12 transition-colors duration-300">
      <Helmet>
        <title>{siteConfig.title}</title>
        <meta name="description" content={siteConfig.description} />
      </Helmet>

      <div className="max-w-6xl mx-auto space-y-12">
        <header className="flex justify-between items-center">
           <div></div>
           <Button variant="ghost" size="icon" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
             {theme === 'dark' ? <Moon className="h-5 w-5 text-muted-foreground" /> : <Sun className="h-5 w-5 text-muted-foreground" />}
           </Button>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div className="col-span-1 lg:col-span-1 flex justify-center md:justify-start">
             <AvatarWidget />
          </div>
          <div className="col-span-1 md:col-span-2 lg:col-span-3 flex flex-col justify-center">
             <GreetingWidget />
          </div>

          <div className="col-span-1 md:col-span-3 lg:col-span-4 grid grid-cols-1 md:grid-cols-4 gap-6">
             <div className="md:col-span-1">
               <ErrorBoundary><ClockWidget /></ErrorBoundary>
             </div>
             <div className="md:col-span-2">
               <ErrorBoundary><GithubWidget /></ErrorBoundary>
             </div>
             <div className="md:col-span-1">
               <ErrorBoundary><LeetCodeWidget /></ErrorBoundary>
             </div>
          </div>
        </section>

        <section className="space-y-6 pt-8 border-t border-border/50">
          <div className="flex flex-col gap-2">
            <h2 className="text-3xl font-bold tracking-tight">Knowledge Base</h2>
            <p className="text-muted-foreground">Research, plans, and daily logs.</p>
          </div>
          <Gallery />
        </section>
      </div>

      <CommandPalette />
    </div>
  );
}
