import { describe, it, expect } from 'vitest';
import { DocMetaSchema } from './schema';

describe('Registry Schema Validation', () => {
  it('validates a correct react doc meta', () => {
    const meta = {
      slug: 'test-react',
      title: 'Test React',
      description: 'Test Description',
      category: 'Test Category',
      tags: ['test'],
      kind: 'react',
      status: 'active',
      pinned: true,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z'
    };

    const parsed = DocMetaSchema.parse(meta);
    expect(parsed.slug).toBe('test-react');
    expect(parsed.kind).toBe('react');
    expect(parsed.pinned).toBe(true);
  });

  it('fails on invalid kind', () => {
    const meta = {
      slug: 'test-react',
      title: 'Test React',
      description: 'Test Description',
      category: 'Test Category',
      tags: ['test'],
      kind: 'invalid-kind', // Should be 'react' or 'html'
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z'
    };

    expect(() => DocMetaSchema.parse(meta)).toThrow();
  });
});
