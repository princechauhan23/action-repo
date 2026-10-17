import React, { useState, useEffect, useRef } from 'react';
import { Skeleton } from '@/shared/ui/Skeleton';
import { useTheme } from '@/core/theme/ThemeProvider';

interface HtmlDocViewerProps {
  htmlContent: string;
}

export function HtmlDocViewer({ htmlContent }: HtmlDocViewerProps) {
  const [loading, setLoading] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    // Inject theme data attribute into the iframe document if possible
    if (!loading && iframeRef.current && iframeRef.current.contentWindow) {
      try {
        const iframeDoc = iframeRef.current.contentWindow.document;
        // Basic attempt to sync theme for simple HTML files that might look for it
        if (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
          iframeDoc.documentElement.classList.add('dark');
        } else {
           iframeDoc.documentElement.classList.remove('dark');
        }
      } catch {
        // Ignore CORS issues if sandbox prevents access
      }
    }
  }, [loading, theme]);

  return (
    <div className="relative w-full h-[calc(100vh-4rem)] flex-1 border rounded-lg overflow-hidden bg-white dark:bg-zinc-950">
      {loading && (
        <div className="absolute inset-0 p-6 space-y-4 bg-card">
           <Skeleton className="h-8 w-3/4" />
           <Skeleton className="h-4 w-full" />
           <Skeleton className="h-4 w-5/6" />
           <Skeleton className="h-64 w-full mt-8" />
        </div>
      )}
      <iframe
        ref={iframeRef}
        srcDoc={htmlContent}
        sandbox="allow-scripts"
        className={`w-full h-full border-0 transition-opacity duration-300 ${loading ? 'opacity-0' : 'opacity-100'}`}
        onLoad={() => setLoading(false)}
        title="Document Viewer"
      />
    </div>
  );
}
