import React from 'react';

export default function SystemDesign() {
  return (
    <div className="prose dark:prose-invert max-w-none">
      <h2>Core Concepts</h2>
      <p>A quick reference guide.</p>
      <ul>
        <li><strong>Load Balancers:</strong> Distribute traffic.</li>
        <li><strong>Caching:</strong> Redis/Memcached to reduce database load.</li>
        <li><strong>Databases:</strong> SQL (ACID) vs NoSQL (BASE).</li>
      </ul>
    </div>
  );
}
