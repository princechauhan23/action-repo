import React from 'react';
import { Link } from 'react-router-dom';
import { DocMeta } from '@/core/registry/schema';
import { Card, CardContent, CardHeader } from '@/shared/ui/Card';
import { Badge } from '@/shared/ui/Badge';
import { formatDistanceToNow } from 'date-fns';
import { FileCode2, FileJson, ArrowRight, Pin } from 'lucide-react';
import { cn } from '@/shared/utils/cn';

interface DocCardProps {
  doc: DocMeta;
}

export function DocCard({ doc }: DocCardProps) {
  const isNew = new Date(doc.createdAt).getTime() > new Date().getTime() - 7 * 24 * 60 * 60 * 1000;

  return (
    <Link to={`/docs/${doc.slug}`} className="block h-full group outline-none">
      <Card
        className={cn(
          "h-full flex flex-col transition-all duration-200 group-hover:-translate-y-1 group-hover:shadow-md group-focus-visible:ring-2 group-focus-visible:ring-ring",
          doc.accentColor && `group-hover:border-[${doc.accentColor}]` // Not fully supported by TW without safelisting, but idea is there. We can use inline styles for border color on hover, but we'll stick to a generic glow.
        )}
      >
        <CardHeader className="p-4 pb-2 flex-row items-start justify-between space-y-0">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-secondary rounded-lg text-foreground">
               {/* Simplified icon rendering: assuming doc.icon is an emoji or fallback */}
               {doc.icon ? <span className="text-xl leading-none">{doc.icon}</span> :
                 (doc.kind === 'react' ? <FileCode2 className="w-5 h-5"/> : <FileJson className="w-5 h-5"/>)
               }
            </div>
            {doc.pinned && <Pin className="w-3 h-3 text-muted-foreground rotate-45" />}
          </div>
          <div className="flex gap-1 flex-wrap justify-end">
             {isNew && <Badge variant="default" className="text-[10px] px-1 py-0 h-4">New</Badge>}
             <Badge variant="outline" className="text-[10px] px-1 py-0 h-4 capitalize">{doc.kind}</Badge>
             {doc.status !== 'active' && <Badge variant="secondary" className="text-[10px] px-1 py-0 h-4 capitalize">{doc.status}</Badge>}
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-2 flex-1 flex flex-col">
          <div className="text-xs font-semibold text-primary/80 uppercase tracking-wider mb-1">{doc.category}</div>
          <h3 className="font-semibold text-lg leading-tight mb-2 group-hover:text-primary transition-colors flex items-center gap-1">
            {doc.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">
            {doc.description}
          </p>

          <div className="mt-auto pt-4 flex items-center justify-between border-t border-border/50">
            <div className="flex gap-1 flex-wrap">
              {doc.tags.slice(0, 2).map(tag => (
                <span key={tag} className="text-[10px] bg-secondary text-secondary-foreground px-1.5 py-0.5 rounded-sm">#{tag}</span>
              ))}
              {doc.tags.length > 2 && <span className="text-[10px] text-muted-foreground">+{doc.tags.length - 2}</span>}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-muted-foreground">
                 Updated {formatDistanceToNow(new Date(doc.updatedAt))} ago
              </span>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
