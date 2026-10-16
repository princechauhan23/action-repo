import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { registry } from '@/core/registry';
import { DocCard } from './DocCard';
import { Badge } from '@/shared/ui/Badge';
import { Search, SlidersHorizontal } from 'lucide-react';

export function Gallery() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');

  const allDocs = registry.getAllDocs();
  const categories = registry.getCategories();

  const activeCategory = searchParams.get('cat') || 'all';

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setQuery(v);
    if (v) {
      searchParams.set('q', v);
    } else {
      searchParams.delete('q');
    }
    setSearchParams(searchParams, { replace: true });
  };

  const handleCategory = (c: string) => {
    if (c === 'all') {
      searchParams.delete('cat');
    } else {
      searchParams.set('cat', c);
    }
    setSearchParams(searchParams, { replace: true });
  };

  const filteredDocs = useMemo(() => {
    let result = allDocs;

    if (activeCategory !== 'all') {
      result = result.filter(d => d.category === activeCategory);
    }

    if (query) {
      const q = query.toLowerCase();
      result = result.filter(d =>
        d.title.toLowerCase().includes(q) ||
        d.description.toLowerCase().includes(q) ||
        d.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    // Sort: pinned first, then newest updated
    return result.sort((a, b) => {
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });
  }, [allDocs, activeCategory, query]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
         <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search docs... (Press '/')"
              value={query}
              onChange={handleSearch}
              className="flex h-10 w-full rounded-md border border-input bg-background px-9 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              onKeyDown={(e) => {
                 if (e.key === 'Escape') setQuery('');
              }}
            />
            <kbd className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
              <span className="text-xs">⌘</span>K
            </kbd>
         </div>
         <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-none">
            <SlidersHorizontal className="w-4 h-4 text-muted-foreground mr-1 shrink-0" />
            <Badge
              variant={activeCategory === 'all' ? 'default' : 'secondary'}
              className="cursor-pointer shrink-0"
              onClick={() => handleCategory('all')}
            >
              All
            </Badge>
            {categories.map(c => (
              <Badge
                key={c}
                variant={activeCategory === c ? 'default' : 'secondary'}
                className="cursor-pointer shrink-0"
                onClick={() => handleCategory(c)}
              >
                {c}
              </Badge>
            ))}
         </div>
      </div>

      {filteredDocs.length === 0 ? (
        <div className="py-24 text-center border rounded-2xl bg-card border-dashed">
           <h3 className="text-lg font-semibold mb-1">No docs found</h3>
           <p className="text-sm text-muted-foreground mb-4">We couldn't find anything matching your criteria.</p>
           <button onClick={() => { setQuery(''); handleCategory('all'); }} className="text-sm text-primary underline">Clear filters</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDocs.map(doc => (
            <DocCard key={doc.slug} doc={doc} />
          ))}
        </div>
      )}
    </div>
  );
}
