import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Command } from 'cmdk';
import { registry } from '@/core/registry';
import { Search, FileText } from 'lucide-react';
import { DocMeta } from '@/core/registry/schema';

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const docs = registry.getAllDocs();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const onSelect = (doc: DocMeta) => {
    setOpen(false);
    navigate(`/docs/${doc.slug}`);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-start justify-center pt-[20vh]">
      <div className="w-full max-w-lg bg-popover text-popover-foreground rounded-xl shadow-2xl border border-border overflow-hidden">
        <Command label="Command Palette" shouldFilter={true} className="flex flex-col">
          <div className="flex items-center border-b px-3" cmdk-input-wrapper="">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <Command.Input
              placeholder="Search docs..."
              autoFocus
              className="flex h-12 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
            />
            <button onClick={() => setOpen(false)} className="text-xs border px-1.5 py-0.5 rounded text-muted-foreground hover:bg-secondary">ESC</button>
          </div>

          <Command.List className="max-h-[300px] overflow-y-auto p-2">
            <Command.Empty className="py-6 text-center text-sm">No results found.</Command.Empty>

            {docs.length > 0 && (
               <Command.Group heading="Docs" className="text-xs font-medium text-muted-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5">
                  {docs.map(doc => (
                    <Command.Item
                      key={doc.slug}
                      value={`${doc.title} ${doc.category} ${doc.tags.join(' ')}`}
                      onSelect={() => onSelect(doc)}
                      className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      <span>{doc.title}</span>
                      <span className="ml-2 text-xs text-muted-foreground">{doc.category}</span>
                    </Command.Item>
                  ))}
               </Command.Group>
            )}
          </Command.List>
        </Command>
      </div>
    </div>
  );
}
