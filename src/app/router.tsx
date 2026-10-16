import React, { lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { registry } from '@/core/registry';
import { Home } from '@/app/Home';
import { DocShell } from '@/features/doc-viewer/DocShell';
import { HtmlDocViewer } from '@/features/doc-viewer/HtmlDocViewer';
import { ErrorBoundary } from '@/shared/ui/ErrorBoundary';

// Dynamic doc component factory
const DocRoute = ({ slug }: { slug: string }) => {
  const doc = registry.getDocBySlug(slug);
  if (!doc) return <div>Doc not found</div>;

  if (doc.kind === 'html') {
    // We need to fetch the raw HTML. Vite's import.meta.glob with ?raw is useful here.
    // For lazy loading a specific HTML file, we can use an inline import.
    const HtmlWrapper = lazy(async () => {
      try {
        const module = await import(`../docs/${slug}/index.html?raw`);
        return { default: () => <HtmlDocViewer htmlContent={module.default} /> };
      } catch (e) {
        console.error("Error loading HTML doc", e);
        return { default: () => <div>Failed to load HTML document</div> };
      }
    });
    return <HtmlWrapper />;
  }

  if (doc.kind === 'react') {
    const ReactDoc = lazy(() => import(`../docs/${slug}/index.tsx`));
    return <ReactDoc />;
  }

  return <div>Unknown doc kind</div>;
};

// Map registry to router routes
const docRoutes = registry.getAllDocs().map(doc => ({
  path: `/docs/${doc.slug}`,
  element: (
    <DocShell>
      <DocRoute slug={doc.slug} />
    </DocShell>
  ),
  errorElement: <ErrorBoundary />
}));

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <ErrorBoundary />
  },
  ...docRoutes,
  {
    path: '*',
    element: (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-background text-foreground">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-muted-foreground mb-6">Page not found.</p>
        <a href="/" className="px-4 py-2 bg-primary text-primary-foreground rounded-md">Return Home</a>
      </div>
    )
  }
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
