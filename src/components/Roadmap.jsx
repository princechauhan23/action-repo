import React, { useState } from 'react';
import './Roadmap.css';

const Roadmap = () => {
  const [activeWeek, setActiveWeek] = useState(1);

  return (
    <div className="roadmap-page">
      <div className="hero">
  <div className="hero-badge">For 3-year experienced developer · Python-first</div>
  <h1>DSA Mastery Roadmap</h1>
  <p className="hero-sub">A strict 10-week, pattern-based preparation plan. From arrays to dynamic programming — with daily targets, problem counts, and zero fluff.</p>
  <div className="hero-stats">
    <div className="hero-stat"><div className="num">10</div><div className="label">Weeks</div></div>
    <div className="hero-stat"><div className="num">~200</div><div className="label">Problems</div></div>
    <div className="hero-stat"><div className="num">3h</div><div className="label">Per Day</div></div>
    <div className="hero-stat"><div className="num">15</div><div className="label">Patterns</div></div>
  </div>
</div>

<div className="container">

{/* LANGUAGE VERDICT */}
<div className="verdict">
  <h2>⚡ Verdict: Stick with Python. Do NOT learn Java.</h2>
  <p>You already have <span className="highlight">advanced Python</span> skills. Switching to Java would burn 2–3 weeks on syntax, boilerplate, and type declarations — time you simply don't have. Python is accepted at every major tech company for interviews, and its concise syntax lets you focus on <span className="highlight">algorithms, not semicolons</span>.</p>
  <p>The only scenario where Java helps is if a specific company mandates it. Even Google accepts Python. DSA is language-agnostic — interviewers evaluate your <span className="highlight">problem-solving logic</span>, not your language choice.</p>
  <div className="verdict-grid">
    <div className="verdict-card">
      <h4>✅ Why Python Wins for You</h4>
      <ul>
        <li>You already think in Python — zero ramp-up</li>
        <li>3–5x less code per solution vs Java</li>
        <li>Built-in dict, set, list = instant hash maps, sets, arrays</li>
        <li>heapq, deque, Counter, defaultdict are interview gold</li>
        <li>Slicing, comprehensions, and negative indexing save time</li>
      </ul>
    </div>
    <div className="verdict-card">
      <h4>⚠️ Python Gotchas to Know</h4>
      <ul>
        <li>No built-in max-heap — negate values with heapq</li>
        <li>No TreeMap/TreeSet — use SortedList from sortedcontainers</li>
        <li>Recursion limit 1000 — use sys.setrecursionlimit()</li>
        <li>list.pop(0) is O(n) — use deque.popleft() instead</li>
        <li>Rare TLE on very tight constraints — almost never in interviews</li>
      </ul>
    </div>
  </div>
</div>

{/* PYTHON TOOLKIT */}
<div className="toolkit">
  <h2>🧰 Your Python DSA Toolkit — Master These First</h2>
  <p className="sub">Spend Day 1 getting fluent with these. They'll be your weapons for the next 10 weeks.</p>
  <div className="toolkit-grid">
    <div className="tk-item">
      <div className="name">collections.deque</div>
      <div className="desc">O(1) append/pop both ends. Use for BFS queues, sliding windows. Never use list.pop(0).</div>
    </div>
    <div className="tk-item">
      <div className="name">heapq</div>
      <div className="desc">Min-heap. heappush, heappop, heapify. Negate values for max-heap. Critical for top-K, merge-K, Dijkstra.</div>
    </div>
    <div className="tk-item">
      <div className="name">collections.Counter</div>
      <div className="desc">Frequency counting in O(n). most_common(k) for top-k elements. Subtract counters.</div>
    </div>
    <div className="tk-item">
      <div className="name">collections.defaultdict</div>
      <div className="desc">Auto-initializing dict. defaultdict(list) for adjacency lists, defaultdict(int) for counting.</div>
    </div>
    <div className="tk-item">
      <div className="name">bisect</div>
      <div className="desc">Binary search on sorted lists. bisect_left, bisect_right, insort. O(log n) search.</div>
    </div>
    <div className="tk-item">
      <div className="name">itertools</div>
      <div className="desc">permutations, combinations, product for brute force. accumulate for prefix sums.</div>
    </div>
    <div className="tk-item">
      <div className="name">functools.lru_cache</div>
      <div className="desc">Memoization decorator. Turn recursive DP into top-down with @lru_cache(maxsize=None).</div>
    </div>
    <div className="tk-item">
      <div className="name">sortedcontainers</div>
      <div className="desc">pip install. SortedList, SortedDict = Python's TreeMap/TreeSet. O(log n) insert/lookup.</div>
    </div>
  </div>
</div>

{/* WEEK TABS */}
<div className="tab-nav" id="tabNav">
  <button className={`tab-btn ${activeWeek === 1 ? 'active' : ''}`} onClick={() => setActiveWeek(1)} data-week="1">W1: Arrays</button>
  <button className={`tab-btn ${activeWeek === 2 ? 'active' : ''}`} onClick={() => setActiveWeek(2)} data-week="2">W2: Hashing + Pointers</button>
  <button className={`tab-btn ${activeWeek === 3 ? 'active' : ''}`} onClick={() => setActiveWeek(3)} data-week="3">W3: Stacks + Queues</button>
  <button className={`tab-btn ${activeWeek === 4 ? 'active' : ''}`} onClick={() => setActiveWeek(4)} data-week="4">W4: Linked Lists + Recursion</button>
  <button className={`tab-btn ${activeWeek === 5 ? 'active' : ''}`} onClick={() => setActiveWeek(5)} data-week="5">W5: Trees</button>
  <button className={`tab-btn ${activeWeek === 6 ? 'active' : ''}`} onClick={() => setActiveWeek(6)} data-week="6">W6: BST + Heaps</button>
  <button className={`tab-btn ${activeWeek === 7 ? 'active' : ''}`} onClick={() => setActiveWeek(7)} data-week="7">W7: Graphs</button>
  <button className={`tab-btn ${activeWeek === 8 ? 'active' : ''}`} onClick={() => setActiveWeek(8)} data-week="8">W8: DP — 1D</button>
  <button className={`tab-btn ${activeWeek === 9 ? 'active' : ''}`} onClick={() => setActiveWeek(9)} data-week="9">W9: DP — 2D + Adv</button>
  <button className={`tab-btn ${activeWeek === 10 ? 'active' : ''}`} onClick={() => setActiveWeek(10)} data-week="10">W10: Mock + Revision</button>
</div>

{/* WEEK 1 */}
<div className={`week-panel ${activeWeek === 1 ? 'active' : ''}`} data-week="1">
  <div className="week-header" data-phase="foundation">
    <div className="week-num">01</div>
    <div className="week-info">
      <div className="phase-tag phase-foundation">Phase 1 — Foundation</div>
      <h2>Arrays, Strings & Sorting</h2>
      <div className="goal">Build muscle memory on array manipulation, two pointers, sliding window. Get comfortable with Big-O analysis.</div>
    </div>
    <div className="week-meta">
      <div className="meta-item"><div className="val">25</div><div className="lbl">Problems</div></div>
      <div className="meta-item"><div className="val">3h</div><div className="lbl">Per Day</div></div>
    </div>
  </div>
  <div className="days-grid">
    <div className="day-card" onClick={(e) => e.currentTarget.classList.toggle('expanded')}>
      <div className="day-top">
        <div className="day-label">DAY 1</div>
        <div className="day-title">Big-O & Python DSA Setup</div>
        <div className="day-difficulty diff-easy">Easy</div>
        <div className="day-expand">▾</div>
      </div>
      <div className="day-details">
        <div className="detail-section">
          <div className="detail-label">Learn</div>
          <ul>
            <li>Time & space complexity — O(1), O(n), O(n²), O(log n), O(n log n)</li>
            <li>Amortized analysis (why list.append is O(1))</li>
            <li>Master Python DSA toolkit: deque, heapq, Counter, defaultdict, bisect</li>
            <li>Set up LeetCode account, bookmark NeetCode 150</li>
          </ul>
        </div>
        <div className="detail-section">
          <div className="detail-label">Practice (3 problems)</div>
          <ul className="problems-list">
            <li>Two Sum (#1) — hash map approach</li>
            <li>Contains Duplicate (#217)</li>
            <li>Best Time to Buy and Sell Stock (#121)</li>
          </ul>
        </div>
        <div className="tip-box"><strong>Tip:</strong> For every problem, first write brute force, then optimize. State the Big-O before coding.</div>
      </div>
    </div>

    <div className="day-card" onClick={(e) => e.currentTarget.classList.toggle('expanded')}>
      <div className="day-top">
        <div className="day-label">DAY 2</div>
        <div className="day-title">Array Fundamentals</div>
        <div className="day-difficulty diff-easy">Easy</div>
        <div className="day-expand">▾</div>
      </div>
      <div className="day-details">
        <div className="detail-section">
          <div className="detail-label">Learn</div>
          <ul>
            <li>Prefix sums — precompute cumulative sums for range queries</li>
            <li>Kadane's algorithm for max subarray</li>
            <li>In-place array manipulation techniques</li>
          </ul>
        </div>
        <div className="detail-section">
          <div className="detail-label">Practice (4 problems)</div>
          <ul className="problems-list">
            <li>Maximum Subarray (#53) — Kadane's</li>
            <li>Product of Array Except Self (#238)</li>
            <li>Running Sum of 1d Array (#1480)</li>
            <li>Move Zeroes (#283)</li>
          </ul>
        </div>
      </div>
    </div>

    <div className="day-card" onClick={(e) => e.currentTarget.classList.toggle('expanded')}>
      <div className="day-top">
        <div className="day-label">DAY 3</div>
        <div className="day-title">Two Pointers Pattern</div>
        <div className="day-difficulty diff-easy">Easy→Med</div>
        <div className="day-expand">▾</div>
      </div>
      <div className="day-details">
        <div className="detail-section">
          <div className="detail-label">Learn</div>
          <ul>
            <li>Two pointers — opposite ends, same direction, fast/slow</li>
            <li>When to use: sorted arrays, palindromes, pair finding</li>
          </ul>
        </div>
        <div className="detail-section">
          <div className="detail-label">Practice (4 problems)</div>
          <ul className="problems-list">
            <li>Valid Palindrome (#125)</li>
            <li>Two Sum II — Sorted (#167)</li>
            <li>3Sum (#15) — sort + two pointers</li>
            <li>Container With Most Water (#11)</li>
          </ul>
        </div>
      </div>
    </div>

    <div className="day-card" onClick={(e) => e.currentTarget.classList.toggle('expanded')}>
      <div className="day-top">
        <div className="day-label">DAY 4</div>
        <div className="day-title">Sliding Window Pattern</div>
        <div className="day-difficulty diff-medium">Medium</div>
        <div className="day-expand">▾</div>
      </div>
      <div className="day-details">
        <div className="detail-section">
          <div className="detail-label">Learn</div>
          <ul>
            <li>Fixed-size window vs variable-size window</li>
            <li>Template: expand right, shrink left when condition violated</li>
            <li>Using Counter/dict to track window state</li>
          </ul>
        </div>
        <div className="detail-section">
          <div className="detail-label">Practice (4 problems)</div>
          <ul className="problems-list">
            <li>Longest Substring Without Repeating Characters (#3)</li>
            <li>Minimum Size Subarray Sum (#209)</li>
            <li>Maximum Average Subarray I (#643)</li>
            <li>Permutation in String (#567)</li>
          </ul>
        </div>
      </div>
    </div>

    <div className="day-card" onClick={(e) => e.currentTarget.classList.toggle('expanded')}>
      <div className="day-top">
        <div className="day-label">DAY 5</div>
        <div className="day-title">Sorting & Binary Search Intro</div>
        <div className="day-difficulty diff-medium">Medium</div>
        <div className="day-expand">▾</div>
      </div>
      <div className="day-details">
        <div className="detail-section">
          <div className="detail-label">Learn</div>
          <ul>
            <li>Implement merge sort and quick sort from scratch in Python</li>
            <li>Binary search template — left, right, while left &lt;= right</li>
            <li>bisect_left vs bisect_right in Python</li>
          </ul>
        </div>
        <div className="detail-section">
          <div className="detail-label">Practice (4 problems)</div>
          <ul className="problems-list">
            <li>Binary Search (#704)</li>
            <li>Search Insert Position (#35)</li>
            <li>Merge Intervals (#56)</li>
            <li>Sort Colors (#75) — Dutch National Flag</li>
          </ul>
        </div>
      </div>
    </div>

    <div className="day-card" onClick={(e) => e.currentTarget.classList.toggle('expanded')}>
      <div className="day-top">
        <div className="day-label">DAY 6</div>
        <div className="day-title">Binary Search Advanced</div>
        <div className="day-difficulty diff-medium">Medium</div>
        <div className="day-expand">▾</div>
      </div>
      <div className="day-details">
        <div className="detail-section">
          <div className="detail-label">Learn</div>
          <ul>
            <li>Binary search on answer space (minimize max, maximize min)</li>
            <li>Rotated sorted arrays</li>
          </ul>
        </div>
        <div className="detail-section">
          <div className="detail-label">Practice (4 problems)</div>
          <ul className="problems-list">
            <li>Search in Rotated Sorted Array (#33)</li>
            <li>Find Minimum in Rotated Sorted Array (#153)</li>
            <li>Koko Eating Bananas (#875)</li>
            <li>Find Peak Element (#162)</li>
          </ul>
        </div>
      </div>
    </div>

    <div className="day-card" onClick={(e) => e.currentTarget.classList.toggle('expanded')}>
      <div className="day-top">
        <div className="day-label">DAY 7</div>
        <div className="day-title">Week 1 Review & Contest</div>
        <div className="day-difficulty diff-medium">Mixed</div>
        <div className="day-expand">▾</div>
      </div>
      <div className="day-details">
        <div className="detail-section">
          <div className="detail-label">Action Items</div>
          <ul>
            <li>Re-solve any problem you couldn't do without hints</li>
            <li>Write pattern notes: Two Pointer template, Sliding Window template, Binary Search template</li>
            <li>Attempt a LeetCode Weekly Contest (Sunday) — get used to time pressure</li>
            <li>Solve 2 new mixed problems from NeetCode Arrays section</li>
          </ul>
        </div>
        <div className="tip-box"><strong>Weekly checkpoint:</strong> You should be able to identify Two Pointer vs Sliding Window vs Binary Search within 2 minutes of reading a problem.</div>
      </div>
    </div>
  </div>
</div>

{/* WEEK 2 */}
<div className={`week-panel ${activeWeek === 2 ? 'active' : ''}`} data-week="2">
  <div className="week-header" data-phase="foundation">
    <div className="week-num">02</div>
    <div className="week-info">
      <div className="phase-tag phase-foundation">Phase 1 — Foundation</div>
      <h2>Hash Maps, Sets & Advanced Two Pointers</h2>
      <div className="goal">Master O(1) lookups. Learn to reduce O(n²) to O(n) using hash maps. Frequency counting patterns.</div>
    </div>
    <div className="week-meta">
      <div className="meta-item"><div className="val">22</div><div className="lbl">Problems</div></div>
    </div>
  </div>
  <div className="days-grid">
    <div className="day-card" onClick={(e) => e.currentTarget.classList.toggle('expanded')}>
      <div className="day-top">
        <div className="day-label">DAY 8</div>
        <div className="day-title">Hash Map Fundamentals</div>
        <div className="day-difficulty diff-easy">Easy</div>
        <div className="day-expand">▾</div>
      </div>
      <div className="day-details">
        <div className="detail-section"><div className="detail-label">Learn</div><ul>
          <li>dict internals — hash function, collision handling, O(1) avg lookup</li>
          <li>Counter for frequency maps, defaultdict for graph adjacency</li>
          <li>Pattern: "have I seen this before?" → use a set/dict</li>
        </ul></div>
        <div className="detail-section"><div className="detail-label">Practice (4 problems)</div><ul className="problems-list">
          <li>Valid Anagram (#242)</li>
          <li>Group Anagrams (#49)</li>
          <li>Top K Frequent Elements (#347)</li>
          <li>Longest Consecutive Sequence (#128)</li>
        </ul></div>
      </div>
    </div>
    <div className="day-card" onClick={(e) => e.currentTarget.classList.toggle('expanded')}>
      <div className="day-top">
        <div className="day-label">D9-10</div>
        <div className="day-title">String Manipulation & Patterns</div>
        <div className="day-difficulty diff-medium">Medium</div>
        <div className="day-expand">▾</div>
      </div>
      <div className="day-details">
        <div className="detail-section"><div className="detail-label">Practice (8 problems over 2 days)</div><ul className="problems-list">
          <li>Longest Palindromic Substring (#5) — expand from center</li>
          <li>Encode and Decode Strings (#271)</li>
          <li>Minimum Window Substring (#76) — sliding window + hash map</li>
          <li>String to Integer (atoi) (#8)</li>
          <li>Longest Repeating Character Replacement (#424)</li>
          <li>Valid Parentheses (#20) — preview for stacks</li>
          <li>Implement strStr() / Find the Index (#28)</li>
          <li>Palindromic Substrings (#647)</li>
        </ul></div>
      </div>
    </div>
    <div className="day-card" onClick={(e) => e.currentTarget.classList.toggle('expanded')}>
      <div className="day-top">
        <div className="day-label">D11-13</div>
        <div className="day-title">Matrix / 2D Array Problems</div>
        <div className="day-difficulty diff-medium">Medium</div>
        <div className="day-expand">▾</div>
      </div>
      <div className="day-details">
        <div className="detail-section"><div className="detail-label">Practice (8 problems over 3 days)</div><ul className="problems-list">
          <li>Rotate Image (#48)</li>
          <li>Spiral Matrix (#54)</li>
          <li>Set Matrix Zeroes (#73)</li>
          <li>Valid Sudoku (#36)</li>
          <li>Search a 2D Matrix (#74)</li>
          <li>Word Search (#79) — backtracking preview</li>
          <li>Game of Life (#289)</li>
          <li>Diagonal Traverse (#498)</li>
        </ul></div>
      </div>
    </div>
    <div className="day-card" onClick={(e) => e.currentTarget.classList.toggle('expanded')}>
      <div className="day-top">
        <div className="day-label">DAY 14</div>
        <div className="day-title">Week 2 Review</div>
        <div className="day-difficulty diff-medium">Mixed</div>
        <div className="day-expand">▾</div>
      </div>
      <div className="day-details">
        <div className="detail-section"><div className="detail-label">Action Items</div><ul>
          <li>Re-solve Week 1 problems you struggled with (spaced repetition)</li>
          <li>Document: "When do I use hash map vs set vs sorting?"</li>
          <li>LeetCode Contest attempt</li>
        </ul></div>
      </div>
    </div>
  </div>
</div>

{/* WEEK 3 */}
<div className={`week-panel ${activeWeek === 3 ? 'active' : ''}`} data-week="3">
  <div className="week-header" data-phase="core">
    <div className="week-num">03</div>
    <div className="week-info">
      <div className="phase-tag phase-core">Phase 2 — Core Structures</div>
      <h2>Stacks, Queues & Monotonic Stack</h2>
      <div className="goal">LIFO/FIFO intuition. Monotonic stack pattern is heavily tested — nail it.</div>
    </div>
    <div className="week-meta"><div className="meta-item"><div className="val">20</div><div className="lbl">Problems</div></div></div>
  </div>
  <div className="days-grid">
    <div className="day-card" onClick={(e) => e.currentTarget.classList.toggle('expanded')}>
      <div className="day-top"><div className="day-label">D15-16</div><div className="day-title">Stack Fundamentals</div><div className="day-difficulty diff-easy">Easy→Med</div><div className="day-expand">▾</div></div>
      <div className="day-details"><div className="detail-section"><div className="detail-label">Learn & Practice (8 problems)</div><ul className="problems-list">
        <li>Valid Parentheses (#20)</li><li>Min Stack (#155)</li><li>Evaluate Reverse Polish Notation (#150)</li><li>Daily Temperatures (#739) — monotonic stack intro</li>
        <li>Next Greater Element I (#496)</li><li>Implement Queue using Stacks (#232)</li><li>Implement Stack using Queues (#225)</li><li>Baseball Game (#682)</li>
      </ul></div></div>
    </div>
    <div className="day-card" onClick={(e) => e.currentTarget.classList.toggle('expanded')}>
      <div className="day-top"><div className="day-label">D17-18</div><div className="day-title">Monotonic Stack Deep Dive</div><div className="day-difficulty diff-medium">Medium→Hard</div><div className="day-expand">▾</div></div>
      <div className="day-details"><div className="detail-section"><div className="detail-label">Learn</div><ul>
        <li>Monotonic increasing vs decreasing stack</li><li>Pattern: "next greater/smaller element" = monotonic stack</li><li>Histogram problems and trapping rain water</li>
      </ul></div>
      <div className="detail-section"><div className="detail-label">Practice (6 problems)</div><ul className="problems-list">
        <li>Largest Rectangle in Histogram (#84) — HARD, classic</li><li>Trapping Rain Water (#42) — HARD, classic</li>
        <li>Car Fleet (#853)</li><li>Online Stock Span (#901)</li><li>Asteroid Collision (#735)</li><li>Remove K Digits (#402)</li>
      </ul></div></div>
    </div>
    <div className="day-card" onClick={(e) => e.currentTarget.classList.toggle('expanded')}>
      <div className="day-top"><div className="day-label">D19-21</div><div className="day-title">Queue, Deque & Review</div><div className="day-difficulty diff-medium">Medium</div><div className="day-expand">▾</div></div>
      <div className="day-details"><div className="detail-section"><div className="detail-label">Practice (6 problems)</div><ul className="problems-list">
        <li>Sliding Window Maximum (#239) — monotonic deque, HARD</li><li>Design Circular Queue (#622)</li>
        <li>Number of Recent Calls (#933)</li><li>Simplify Path (#71)</li><li>Decode String (#394)</li><li>Basic Calculator II (#227)</li>
      </ul></div></div>
    </div>
  </div>
</div>

{/* WEEK 4 */}
<div className={`week-panel ${activeWeek === 4 ? 'active' : ''}`} data-week="4">
  <div className="week-header" data-phase="core">
    <div className="week-num">04</div>
    <div className="week-info">
      <div className="phase-tag phase-core">Phase 2 — Core Structures</div>
      <h2>Linked Lists & Recursion</h2>
      <div className="goal">Pointer manipulation mastery. Build recursion muscles for trees & DP later.</div>
    </div>
    <div className="week-meta"><div className="meta-item"><div className="val">20</div><div className="lbl">Problems</div></div></div>
  </div>
  <div className="days-grid">
    <div className="day-card" onClick={(e) => e.currentTarget.classList.toggle('expanded')}>
      <div className="day-top"><div className="day-label">D22-23</div><div className="day-title">Linked List Core</div><div className="day-difficulty diff-easy">Easy→Med</div><div className="day-expand">▾</div></div>
      <div className="day-details"><div className="detail-section"><div className="detail-label">Practice (8 problems)</div><ul className="problems-list">
        <li>Reverse Linked List (#206)</li><li>Merge Two Sorted Lists (#21)</li><li>Linked List Cycle (#141) — fast/slow pointer</li><li>Middle of the Linked List (#876)</li>
        <li>Remove Nth Node From End (#19)</li><li>Reorder List (#143)</li><li>Add Two Numbers (#2)</li><li>Intersection of Two Linked Lists (#160)</li>
      </ul></div></div>
    </div>
    <div className="day-card" onClick={(e) => e.currentTarget.classList.toggle('expanded')}>
      <div className="day-top"><div className="day-label">D24-25</div><div className="day-title">Advanced Linked List</div><div className="day-difficulty diff-hard">Hard</div><div className="day-expand">▾</div></div>
      <div className="day-details"><div className="detail-section"><div className="detail-label">Practice (6 problems)</div><ul className="problems-list">
        <li>Copy List with Random Pointer (#138)</li><li>LRU Cache (#146) — dict + doubly linked list</li><li>Merge K Sorted Lists (#23)</li>
        <li>Reverse Nodes in k-Group (#25)</li><li>Swap Nodes in Pairs (#24)</li><li>Sort List (#148) — merge sort on LL</li>
      </ul></div></div>
    </div>
    <div className="day-card" onClick={(e) => e.currentTarget.classList.toggle('expanded')}>
      <div className="day-top"><div className="day-label">D26-28</div><div className="day-title">Recursion & Backtracking</div><div className="day-difficulty diff-medium">Medium</div><div className="day-expand">▾</div></div>
      <div className="day-details"><div className="detail-section"><div className="detail-label">Learn</div><ul>
        <li>Recursion tree visualization — draw it on paper every time</li><li>Backtracking template: choose → explore → unchoose</li>
      </ul></div>
      <div className="detail-section"><div className="detail-label">Practice (6 problems)</div><ul className="problems-list">
        <li>Subsets (#78)</li><li>Permutations (#46)</li><li>Combination Sum (#39)</li><li>Letter Combinations of a Phone Number (#17)</li>
        <li>N-Queens (#51)</li><li>Palindrome Partitioning (#131)</li>
      </ul></div></div>
    </div>
  </div>
</div>

{/* WEEK 5 */}
<div className={`week-panel ${activeWeek === 5 ? 'active' : ''}`} data-week="5">
  <div className="week-header" data-phase="core">
    <div className="week-num">05</div>
    <div className="week-info">
      <div className="phase-tag phase-core">Phase 2 — Core Structures</div>
      <h2>Binary Trees — Traversals & Patterns</h2>
      <div className="goal">DFS (inorder, preorder, postorder) and BFS (level order). Recursive vs iterative. Most-asked category.</div>
    </div>
    <div className="week-meta"><div className="meta-item"><div className="val">22</div><div className="lbl">Problems</div></div></div>
  </div>
  <div className="days-grid">
    <div className="day-card" onClick={(e) => e.currentTarget.classList.toggle('expanded')}>
      <div className="day-top"><div className="day-label">D29-30</div><div className="day-title">Tree Traversals & Basics</div><div className="day-difficulty diff-easy">Easy</div><div className="day-expand">▾</div></div>
      <div className="day-details"><div className="detail-section"><div className="detail-label">Practice (8 problems)</div><ul className="problems-list">
        <li>Inorder Traversal (#94)</li><li>Maximum Depth (#104)</li><li>Same Tree (#100)</li><li>Invert Binary Tree (#226)</li>
        <li>Symmetric Tree (#101)</li><li>Level Order Traversal (#102)</li><li>Subtree of Another Tree (#572)</li><li>Diameter of Binary Tree (#543)</li>
      </ul></div></div>
    </div>
    <div className="day-card" onClick={(e) => e.currentTarget.classList.toggle('expanded')}>
      <div className="day-top"><div className="day-label">D31-33</div><div className="day-title">Tree Medium Patterns</div><div className="day-difficulty diff-medium">Medium</div><div className="day-expand">▾</div></div>
      <div className="day-details"><div className="detail-section"><div className="detail-label">Practice (10 problems)</div><ul className="problems-list">
        <li>Lowest Common Ancestor (#236)</li><li>Binary Tree Right Side View (#199)</li><li>Count Good Nodes (#1448)</li><li>Path Sum II (#113)</li>
        <li>Construct Tree from Preorder & Inorder (#105)</li><li>Flatten BT to Linked List (#114)</li>
        <li>Validate BST (#98) — preview for BST week</li><li>Kth Smallest Element in BST (#230)</li>
        <li>Serialize and Deserialize BT (#297)</li><li>Binary Tree Max Path Sum (#124) — HARD</li>
      </ul></div></div>
    </div>
    <div className="day-card" onClick={(e) => e.currentTarget.classList.toggle('expanded')}>
      <div className="day-top"><div className="day-label">D34-35</div><div className="day-title">Trie (Prefix Tree)</div><div className="day-difficulty diff-medium">Medium</div><div className="day-expand">▾</div></div>
      <div className="day-details"><div className="detail-section"><div className="detail-label">Practice (4 problems)</div><ul className="problems-list">
        <li>Implement Trie (#208)</li><li>Design Add and Search Words (#211)</li>
        <li>Word Search II (#212) — Trie + Backtracking</li><li>Replace Words (#648)</li>
      </ul></div></div>
    </div>
  </div>
</div>

{/* WEEK 6 */}
<div className={`week-panel ${activeWeek === 6 ? 'active' : ''}`} data-week="6">
  <div className="week-header" data-phase="core">
    <div className="week-num">06</div>
    <div className="week-info">
      <div className="phase-tag phase-core">Phase 2 — Core Structures</div>
      <h2>BST, Heaps & Priority Queues</h2>
      <div className="goal">heapq mastery. Top-K patterns. Median finding. Interval problems.</div>
    </div>
    <div className="week-meta"><div className="meta-item"><div className="val">18</div><div className="lbl">Problems</div></div></div>
  </div>
  <div className="days-grid">
    <div className="day-card" onClick={(e) => e.currentTarget.classList.toggle('expanded')}>
      <div className="day-top"><div className="day-label">D36-37</div><div className="day-title">Heap / Priority Queue</div><div className="day-difficulty diff-medium">Medium</div><div className="day-expand">▾</div></div>
      <div className="day-details"><div className="detail-section"><div className="detail-label">Practice (8 problems)</div><ul className="problems-list">
        <li>Kth Largest Element (#215) — quickselect or heap</li><li>Last Stone Weight (#1046)</li>
        <li>K Closest Points to Origin (#973)</li><li>Task Scheduler (#621)</li>
        <li>Find Median from Data Stream (#295) — two heaps</li><li>Merge K Sorted Lists (#23) — heap approach</li>
        <li>Top K Frequent Words (#692)</li><li>Reorganize String (#767)</li>
      </ul></div></div>
    </div>
    <div className="day-card" onClick={(e) => e.currentTarget.classList.toggle('expanded')}>
      <div className="day-top"><div className="day-label">D38-39</div><div className="day-title">Intervals & Greedy</div><div className="day-difficulty diff-medium">Medium</div><div className="day-expand">▾</div></div>
      <div className="day-details"><div className="detail-section"><div className="detail-label">Practice (6 problems)</div><ul className="problems-list">
        <li>Merge Intervals (#56)</li><li>Insert Interval (#57)</li><li>Non-overlapping Intervals (#435)</li>
        <li>Meeting Rooms II (#253)</li><li>Minimum Number of Arrows (#452)</li><li>Jump Game (#55)</li>
      </ul></div></div>
    </div>
    <div className="day-card" onClick={(e) => e.currentTarget.classList.toggle('expanded')}>
      <div className="day-top"><div className="day-label">D40-42</div><div className="day-title">Bit Manipulation & Review</div><div className="day-difficulty diff-medium">Medium</div><div className="day-expand">▾</div></div>
      <div className="day-details"><div className="detail-section"><div className="detail-label">Practice (4 problems + review)</div><ul className="problems-list">
        <li>Single Number (#136) — XOR</li><li>Number of 1 Bits (#191)</li><li>Counting Bits (#338)</li><li>Reverse Bits (#190)</li>
      </ul></div>
      <div className="tip-box"><strong>Mid-point check:</strong> You're 6 weeks in. Re-solve 10 problems from Weeks 1–3 that you struggled with. This spaced repetition is critical.</div>
      </div>
    </div>
  </div>
</div>

{/* WEEK 7 */}
<div className={`week-panel ${activeWeek === 7 ? 'active' : ''}`} data-week="7">
  <div className="week-header" data-phase="advanced">
    <div className="week-num">07</div>
    <div className="week-info">
      <div className="phase-tag phase-advanced">Phase 3 — Advanced</div>
      <h2>Graphs — BFS, DFS, Topological Sort</h2>
      <div className="goal">Adjacency list with defaultdict. BFS with deque. DFS recursive. Union-Find. Dijkstra with heapq.</div>
    </div>
    <div className="week-meta"><div className="meta-item"><div className="val">20</div><div className="lbl">Problems</div></div></div>
  </div>
  <div className="days-grid">
    <div className="day-card" onClick={(e) => e.currentTarget.classList.toggle('expanded')}>
      <div className="day-top"><div className="day-label">D43-44</div><div className="day-title">Graph Basics — BFS & DFS</div><div className="day-difficulty diff-medium">Medium</div><div className="day-expand">▾</div></div>
      <div className="day-details"><div className="detail-section"><div className="detail-label">Practice (8 problems)</div><ul className="problems-list">
        <li>Number of Islands (#200) — grid DFS/BFS</li><li>Clone Graph (#133)</li><li>Max Area of Island (#695)</li><li>Pacific Atlantic Water Flow (#417)</li>
        <li>Surrounded Regions (#130)</li><li>Rotting Oranges (#994) — multi-source BFS</li><li>Walls and Gates (#286)</li><li>01 Matrix (#542)</li>
      </ul></div></div>
    </div>
    <div className="day-card" onClick={(e) => e.currentTarget.classList.toggle('expanded')}>
      <div className="day-top"><div className="day-label">D45-46</div><div className="day-title">Topological Sort & Cycle Detection</div><div className="day-difficulty diff-medium">Medium</div><div className="day-expand">▾</div></div>
      <div className="day-details"><div className="detail-section"><div className="detail-label">Practice (6 problems)</div><ul className="problems-list">
        <li>Course Schedule (#207) — cycle detection</li><li>Course Schedule II (#210) — topological sort</li>
        <li>Alien Dictionary (#269)</li><li>Graph Valid Tree (#261)</li>
        <li>Number of Connected Components (#323)</li><li>Redundant Connection (#684) — Union-Find</li>
      </ul></div></div>
    </div>
    <div className="day-card" onClick={(e) => e.currentTarget.classList.toggle('expanded')}>
      <div className="day-top"><div className="day-label">D47-49</div><div className="day-title">Shortest Path & Advanced Graphs</div><div className="day-difficulty diff-hard">Hard</div><div className="day-expand">▾</div></div>
      <div className="day-details"><div className="detail-section"><div className="detail-label">Learn</div><ul>
        <li>Dijkstra's algorithm using heapq — (dist, node) tuples</li><li>Union-Find with path compression + union by rank</li><li>Bellman-Ford for negative weights (know when to use)</li>
      </ul></div>
      <div className="detail-section"><div className="detail-label">Practice (6 problems)</div><ul className="problems-list">
        <li>Network Delay Time (#743) — Dijkstra</li><li>Cheapest Flights Within K Stops (#787)</li>
        <li>Swim in Rising Water (#778)</li><li>Min Cost to Connect All Points (#1584) — Prim's MST</li>
        <li>Word Ladder (#127) — BFS</li><li>Accounts Merge (#721) — Union-Find</li>
      </ul></div></div>
    </div>
  </div>
</div>

{/* WEEK 8 */}
<div className={`week-panel ${activeWeek === 8 ? 'active' : ''}`} data-week="8">
  <div className="week-header" data-phase="advanced">
    <div className="week-num">08</div>
    <div className="week-info">
      <div className="phase-tag phase-advanced">Phase 3 — Advanced</div>
      <h2>Dynamic Programming — 1D</h2>
      <div className="goal">The most feared topic. Start with @lru_cache top-down, then learn bottom-up tabulation. Pattern recognition is key.</div>
    </div>
    <div className="week-meta"><div className="meta-item"><div className="val">20</div><div className="lbl">Problems</div></div></div>
  </div>
  <div className="days-grid">
    <div className="day-card" onClick={(e) => e.currentTarget.classList.toggle('expanded')}>
      <div className="day-top"><div className="day-label">D50-51</div><div className="day-title">DP Foundations</div><div className="day-difficulty diff-easy">Easy→Med</div><div className="day-expand">▾</div></div>
      <div className="day-details"><div className="detail-section"><div className="detail-label">Learn</div><ul>
        <li>Identify overlapping subproblems + optimal substructure</li>
        <li>Top-down with @lru_cache (Python superpower) vs bottom-up with array</li>
        <li>State definition: "What do I need to know to make a decision?"</li>
      </ul></div>
      <div className="detail-section"><div className="detail-label">Practice (6 problems)</div><ul className="problems-list">
        <li>Climbing Stairs (#70)</li><li>House Robber (#198)</li><li>House Robber II (#213)</li>
        <li>Min Cost Climbing Stairs (#746)</li><li>Fibonacci Number (#509)</li><li>Decode Ways (#91)</li>
      </ul></div></div>
    </div>
    <div className="day-card" onClick={(e) => e.currentTarget.classList.toggle('expanded')}>
      <div className="day-top"><div className="day-label">D52-54</div><div className="day-title">Classic 1D DP Patterns</div><div className="day-difficulty diff-medium">Medium</div><div className="day-expand">▾</div></div>
      <div className="day-details"><div className="detail-section"><div className="detail-label">Practice (8 problems)</div><ul className="problems-list">
        <li>Coin Change (#322) — unbounded knapsack</li><li>Longest Increasing Subsequence (#300)</li><li>Word Break (#139)</li><li>Maximum Product Subarray (#152)</li>
        <li>Partition Equal Subset Sum (#416) — 0/1 knapsack</li><li>Coin Change II (#518) — counting</li>
        <li>Perfect Squares (#279)</li><li>Longest Palindromic Subsequence (#516)</li>
      </ul></div></div>
    </div>
    <div className="day-card" onClick={(e) => e.currentTarget.classList.toggle('expanded')}>
      <div className="day-top"><div className="day-label">D55-56</div><div className="day-title">DP on Strings</div><div className="day-difficulty diff-medium">Medium→Hard</div><div className="day-expand">▾</div></div>
      <div className="day-details"><div className="detail-section"><div className="detail-label">Practice (6 problems)</div><ul className="problems-list">
        <li>Longest Common Subsequence (#1143) — 2D preview</li><li>Edit Distance (#72) — classic</li>
        <li>Distinct Subsequences (#115)</li><li>Interleaving String (#97)</li>
        <li>Regular Expression Matching (#10)</li><li>Wildcard Matching (#44)</li>
      </ul></div>
      <div className="tip-box"><strong>DP Approach:</strong> For every DP problem: 1) Define state in words, 2) Write recurrence, 3) Code with @lru_cache, 4) Convert to bottom-up array, 5) Optimize space if possible.</div>
      </div>
    </div>
  </div>
</div>

{/* WEEK 9 */}
<div className={`week-panel ${activeWeek === 9 ? 'active' : ''}`} data-week="9">
  <div className="week-header" data-phase="advanced">
    <div className="week-num">09</div>
    <div className="week-info">
      <div className="phase-tag phase-advanced">Phase 3 — Advanced</div>
      <h2>DP 2D, Greedy & Miscellaneous</h2>
      <div className="goal">Grid DP, knapsack variants, greedy proofs. Fill remaining Blind 75 gaps.</div>
    </div>
    <div className="week-meta"><div className="meta-item"><div className="val">18</div><div className="lbl">Problems</div></div></div>
  </div>
  <div className="days-grid">
    <div className="day-card" onClick={(e) => e.currentTarget.classList.toggle('expanded')}>
      <div className="day-top"><div className="day-label">D57-59</div><div className="day-title">2D DP & Grid Problems</div><div className="day-difficulty diff-medium">Medium→Hard</div><div className="day-expand">▾</div></div>
      <div className="day-details"><div className="detail-section"><div className="detail-label">Practice (10 problems)</div><ul className="problems-list">
        <li>Unique Paths (#62)</li><li>Unique Paths II (#63)</li><li>Minimum Path Sum (#64)</li><li>Maximal Square (#221)</li>
        <li>Target Sum (#494)</li><li>Best Time to Buy and Sell Stock with Cooldown (#309)</li>
        <li>Burst Balloons (#312) — interval DP</li><li>Longest Common Subsequence (#1143)</li>
        <li>0/1 Knapsack (no LC# — implement from scratch)</li><li>Unbounded Knapsack (implement from scratch)</li>
      </ul></div></div>
    </div>
    <div className="day-card" onClick={(e) => e.currentTarget.classList.toggle('expanded')}>
      <div className="day-top"><div className="day-label">D60-62</div><div className="day-title">Greedy, Math & Design</div><div className="day-difficulty diff-medium">Medium</div><div className="day-expand">▾</div></div>
      <div className="day-details"><div className="detail-section"><div className="detail-label">Practice (8 problems)</div><ul className="problems-list">
        <li>Jump Game II (#45)</li><li>Gas Station (#134)</li><li>Hand of Straights (#846)</li>
        <li>Maximum Subarray (#53) — greedy revisit</li><li>Rotate Array (#189)</li>
        <li>Design Twitter (#355) — heap + hash map</li><li>LFU Cache (#460)</li><li>Min Stack (#155) revisit</li>
      </ul></div></div>
    </div>
    <div className="day-card" onClick={(e) => e.currentTarget.classList.toggle('expanded')}>
      <div className="day-top"><div className="day-label">DAY 63</div><div className="day-title">Gap Analysis & Weak Spots</div><div className="day-difficulty diff-hard">Mixed</div><div className="day-expand">▾</div></div>
      <div className="day-details"><div className="detail-section"><div className="detail-label">Action Items</div><ul>
        <li>Go through NeetCode 150 checklist — identify unsolved problems</li>
        <li>Solve 5 problems from your weakest category</li>
        <li>Create a "pattern cheat sheet" for every major technique</li>
      </ul></div></div>
    </div>
  </div>
</div>

{/* WEEK 10 */}
<div className={`week-panel ${activeWeek === 10 ? 'active' : ''}`} data-week="10">
  <div className="week-header" data-phase="mastery">
    <div className="week-num">10</div>
    <div className="week-info">
      <div className="phase-tag phase-mastery">Phase 4 — Mastery & Mock</div>
      <h2>Mock Interviews, Revision & Contest Grind</h2>
      <div className="goal">Simulate real interviews. Time-boxed solving. Verbalize your thought process. Fill final gaps.</div>
    </div>
    <div className="week-meta"><div className="meta-item"><div className="val">15</div><div className="lbl">New Probs</div></div></div>
  </div>
  <div className="days-grid">
    <div className="day-card" onClick={(e) => e.currentTarget.classList.toggle('expanded')}>
      <div className="day-top"><div className="day-label">D64-66</div><div className="day-title">Timed Mock Interviews</div><div className="day-difficulty diff-hard">Mixed</div><div className="day-expand">▾</div></div>
      <div className="day-details"><div className="detail-section"><div className="detail-label">Daily Routine</div><ul>
        <li>Pick 2 random medium + 1 hard from LeetCode</li>
        <li>Set 45-minute timer per problem</li>
        <li>Talk aloud: state approach → Big-O → code → test</li>
        <li>If stuck after 15 min, peek at hint. If stuck after 25 min, read solution and re-implement from memory 2 hours later.</li>
      </ul></div>
      <div className="detail-section"><div className="detail-label">Focus Areas</div><ul className="problems-list">
        <li>Company-tagged problems on LeetCode (if targeting specific companies)</li>
        <li>Problems you solved with hints — redo without help</li>
        <li>Edge cases: empty input, single element, duplicates, negative numbers</li>
      </ul></div></div>
    </div>
    <div className="day-card" onClick={(e) => e.currentTarget.classList.toggle('expanded')}>
      <div className="day-top"><div className="day-label">D67-68</div><div className="day-title">Pattern Revision Sprint</div><div className="day-difficulty diff-medium">Mixed</div><div className="day-expand">▾</div></div>
      <div className="day-details"><div className="detail-section"><div className="detail-label">Revise One Pattern Per Session</div><ul>
        <li>AM: Sliding Window (re-solve 3 problems from memory)</li>
        <li>PM: DP (re-solve Coin Change, LIS, LCS from scratch)</li>
        <li>Next day AM: Graphs (DFS, BFS, Dijkstra — 1 of each)</li>
        <li>Next day PM: Trees + Backtracking (3 problems)</li>
      </ul></div></div>
    </div>
    <div className="day-card" onClick={(e) => e.currentTarget.classList.toggle('expanded')}>
      <div className="day-top"><div className="day-label">D69-70</div><div className="day-title">Final Polish</div><div className="day-difficulty diff-hard">Hard</div><div className="day-expand">▾</div></div>
      <div className="day-details"><div className="detail-section"><div className="detail-label">Last 2 Days</div><ul>
        <li>Full mock: 4 problems in 2 hours (simulating a real OA)</li>
        <li>Review your pattern cheat sheet one final time</li>
        <li>Rest well. Trust your preparation.</li>
        <li>Prepare your "introduction story" for behavioral round</li>
      </ul></div>
      <div className="tip-box"><strong>Final wisdom:</strong> In the interview, ALWAYS clarify constraints first. Ask about edge cases. State brute force, then optimize. Never code in silence.</div>
      </div>
    </div>
  </div>
</div>

</div>{/* end container */}

{/* DAILY SCHEDULE */}
<div className="schedule-section">
  <h2>Recommended Daily Schedule (3h/day)</h2>
  <div className="schedule-grid">
    <div className="sched-card">
      <div className="time">0:00–0:30</div>
      <div className="activity">Concept Review</div>
      <div className="desc">Watch NeetCode/TakeUForward video on the day's topic. Take notes on the pattern template.</div>
    </div>
    <div className="sched-card">
      <div className="time">0:30–2:00</div>
      <div className="activity">Problem Solving</div>
      <div className="desc">Solve 3–4 problems. 20 min attempt → if stuck, read hint → if still stuck, study solution then re-implement.</div>
    </div>
    <div className="sched-card">
      <div className="time">2:00–2:30</div>
      <div className="activity">Revision</div>
      <div className="desc">Re-solve 1 problem from 2 days ago without looking at your old solution. Spaced repetition.</div>
    </div>
    <div className="sched-card">
      <div className="time">2:30–3:00</div>
      <div className="activity">Journal & Template</div>
      <div className="desc">Write: pattern used, time complexity, mistakes made, what you'd do differently. Maintain a pattern cheat sheet.</div>
    </div>
  </div>
</div>

{/* RESOURCES */}
<div className="resources-footer">
  <h2>Essential Resources</h2>
  <div className="res-grid">
    <div className="res-card">
      <h4>NeetCode 150</h4>
      <p>The single best curated problem list, organized by topic. Follow this as your primary source. Free video explanations for every problem. neetcode.io</p>
    </div>
    <div className="res-card">
      <h4>Blind 75</h4>
      <p>The original "must-do" 75 problems. Subset of NeetCode 150. If time is short, prioritize these. Every problem is interview gold.</p>
    </div>
    <div className="res-card">
      <h4>LeetCode Patterns (Sean Prashad)</h4>
      <p>seanprashad.com/leetcode-patterns — Problems grouped by pattern (sliding window, two pointer, etc). Excellent for pattern-based study.</p>
    </div>
    <div className="res-card">
      <h4>TakeUForward (Striver's SDE Sheet)</h4>
      <p>takeuforward.org — Striver's A2Z DSA sheet. Excellent video explanations in detail. Great for when NeetCode videos aren't enough.</p>
    </div>
    <div className="res-card">
      <h4>Python-Specific Tips</h4>
      <p>Master: list comprehensions, dict/set operations, heapq (negate for max-heap), deque, Counter, defaultdict, bisect, @lru_cache, sorted() key param.</p>
    </div>
    <div className="res-card">
      <h4>Weekly LeetCode Contests</h4>
      <p>Every Saturday/Sunday. Participate from Week 1 onward. You'll bomb the first few — that's the point. It builds speed and pressure tolerance.</p>
    </div>
  </div>
</div>
    </div>
  );
};

export default Roadmap;
