import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const args = process.argv.slice(2);

let title = "New Doc";
let kind = "react";
let category = "Uncategorized";

// Parse arguments
for (let i = 0; i < args.length; i++) {
  if (args[i].startsWith('--kind=')) {
    kind = args[i].split('=')[1];
  } else if (args[i].startsWith('--category=')) {
    category = args[i].split('=')[1];
  } else if (!args[i].startsWith('--')) {
    title = args[i];
  }
}

if (!['react', 'html'].includes(kind)) {
  console.error("Error: --kind must be 'react' or 'html'");
  process.exit(1);
}

const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
const targetDir = path.join(__dirname, '../src/docs', slug);

if (fs.existsSync(targetDir)) {
  console.error(`Error: Directory for slug '${slug}' already exists.`);
  process.exit(1);
}

fs.mkdirSync(targetDir, { recursive: true });

const now = new Date().toISOString();

const metaContent = `export const meta = {
  slug: "${slug}",
  title: "${title}",
  description: "A new document.",
  category: "${category}",
  tags: [],
  kind: "${kind}",
  status: "active",
  pinned: false,
  createdAt: "${now}",
  updatedAt: "${now}",
};
`;

fs.writeFileSync(path.join(targetDir, 'meta.ts'), metaContent);

if (kind === 'react') {
  const componentName = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('');
  const reactContent = `import React from 'react';

export default function ${componentName}() {
  return (
    <div className="prose dark:prose-invert max-w-none">
      <h1>${title}</h1>
      <p>Start writing your component here.</p>
    </div>
  );
}
`;
  fs.writeFileSync(path.join(targetDir, 'index.tsx'), reactContent);
} else {
  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: sans-serif; padding: 2rem; }
    :root.dark body { background: #111; color: #eee; }
  </style>
</head>
<body>
  <h1>${title}</h1>
  <p>Start writing your HTML here.</p>
</body>
</html>
`;
  fs.writeFileSync(path.join(targetDir, 'index.html'), htmlContent);
}

console.log(`Successfully created new ${kind} doc: '${title}' at src/docs/${slug}`);
