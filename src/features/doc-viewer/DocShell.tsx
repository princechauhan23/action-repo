import React, { Suspense } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { registry } from '@/core/registry';
import { ErrorBoundary } from '@/shared/ui/ErrorBoundary';
import { ArrowLeft, ChevronRight, Moon, Sun } from 'lucide-react';
import { useTheme } from '@/core/theme/ThemeProvider';
import { Badge } from '@/shared/ui/Badge';
import { Button } from '@/shared/ui/Button';

interface DocShellProps {
  children: React.ReactNode;
}

export function DocShell({ children }: DocShellProps) {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();

  if (!slug) return <div>Invalid doc</div>;

  const doc = registry.getDocBySlug(slug);

  if (!doc) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-muted-foreground mb-6">Document not found.</p>
        <Button onClick={() => navigate('/')}>Return Home</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4 overflow-x-auto whitespace-nowrap scrollbar-none">
            <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors shrink-0">
               <ArrowLeft className="w-4 h-4" />
            </Link>
            <div className="flex items-center text-sm text-muted-foreground shrink-0">
              <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
              <ChevronRight className="w-4 h-4 mx-1" />
              <span>{doc.category}</span>
              <ChevronRight className="w-4 h-4 mx-1" />
              <span className="text-foreground font-medium truncate max-w-[200px]">{doc.title}</span>
            </div>
            {doc.tags.map(tag => (
              <Badge key={tag} variant="secondary" className="hidden sm:inline-flex shrink-0">{tag}</Badge>
            ))}
          </div>

          <div className="flex items-center gap-2 shrink-0 pl-4">
             <Button variant="ghost" size="icon" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
               {theme === 'dark' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
             </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto p-4 md:p-6 lg:p-8 flex flex-col max-w-7xl">
        <div className="mb-6">
           <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">{doc.title}</h1>
           <p className="text-lg text-muted-foreground">{doc.description}</p>
        </div>

        <ErrorBoundary>
          <Suspense fallback={<div className="flex-1 flex items-center justify-center text-muted-foreground animate-pulse">Loading document...</div>}>
            {children}
          </Suspense>
        </ErrorBoundary>
      </main>
    </div>
  );
}
