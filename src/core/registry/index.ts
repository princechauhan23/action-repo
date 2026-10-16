import { DocMeta, DocMetaSchema } from './schema';

export class Registry {
  private docs: Map<string, DocMeta> = new Map();

  constructor() {
    this.init();
  }

  private init() {
    // Eagerly import all meta.ts files
    const modules = import.meta.glob('/src/docs/**/meta.ts', { eager: true });

    for (const path in modules) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const module = modules[path] as any;
      if (module && module.meta) {
        try {
          const parsedMeta = DocMetaSchema.parse(module.meta);
          // Only add if not draft in production
          if (import.meta.env?.PROD && parsedMeta.status === 'draft') {
            continue;
          }
          this.docs.set(parsedMeta.slug, parsedMeta);
        } catch (error) {
          if (import.meta.env?.DEV) {
             console.error(`[Registry Error] Invalid meta in ${path}:`, error);
          }
        }
      }
    }
  }

  getAllDocs(): DocMeta[] {
    return Array.from(this.docs.values());
  }

  getDocBySlug(slug: string): DocMeta | undefined {
    return this.docs.get(slug);
  }

  getCategories(): string[] {
    const categories = new Set<string>();
    for (const doc of this.docs.values()) {
      categories.add(doc.category);
    }
    return Array.from(categories);
  }
}

export const registry = new Registry();
