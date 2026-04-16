import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { PacManGame } from './games/PacManGame';
import { OggyGame } from './games/OggyGame';
import { ShinChanGame } from './games/ShinChanGame';
import './DevDailyTracker.css';

// --- Particle Background ---
const ParticleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const particles = [];
    const numParticles = 100;

    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 1.5 + 0.5
      });
    }

    let animationFrameId;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(0, 245, 255, 0.5)'; // Cyan particles

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
    />
  );
};

// --- Header Section ---
const Header = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = time.getHours();
  let greeting = 'Good Night 🌙';
  if (hours >= 5 && hours < 12) greeting = 'Good Morning ☀️';
  else if (hours >= 12 && hours < 18) greeting = 'Good Afternoon 🌤️';
  else if (hours >= 18 && hours < 21) greeting = 'Good Evening 🌆';

  const dateStr = time.toLocaleDateString('en-GB', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  const timeStr = time.toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  const dayOfWeek = time.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();

  return (
    <header className="flex flex-col md:flex-row justify-between items-center bg-[#1a1a1a] p-6 rounded-lg neon-border-cyan mb-8 relative z-10">
      {/* Left side */}
      <div className="flex items-center gap-6 mb-4 md:mb-0">
        <div className="relative">
          {/* Simple SVG Avatar */}
          <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center border-2 border-[#00f5ff] overflow-hidden">
             <svg viewBox="0 0 100 100" className="w-16 h-16 text-[#00f5ff]">
                <circle cx="50" cy="40" r="20" fill="currentColor"/>
                <path d="M20,90 Q50,60 80,90 Z" fill="currentColor"/>
                {/* Glasses */}
                <rect x="35" y="35" width="12" height="8" rx="2" fill="#0d0d0d" />
                <rect x="53" y="35" width="12" height="8" rx="2" fill="#0d0d0d" />
                <line x1="47" y1="39" x2="53" y2="39" stroke="#0d0d0d" strokeWidth="2" />
             </svg>
          </div>
          {/* Glowing ring animation could be added here via CSS */}
          <div className="absolute inset-0 rounded-full border-2 border-[#00f5ff] animate-ping opacity-20"></div>
        </div>
        <div>
          <h2 className="text-xl font-bold neon-text-magenta">{greeting}</h2>
          <p className="text-sm text-gray-300 mt-1">Prince | Full-Stack Dev 🚀</p>
          <p className="text-xs text-gray-500 mt-1">{dateStr}</p>
        </div>
      </div>

      {/* Right side */}
      <div className="text-right flex flex-col items-end">
        <div className="font-['Press_Start_2P'] text-3xl neon-text-cyan tracking-widest">
          {timeStr}
        </div>
        <div className="flex gap-2 mt-2 font-bold text-gray-400">
          <span>{dayOfWeek}</span>
          <span className="text-xs border border-gray-600 px-1 rounded bg-gray-800 self-center">IST</span>
        </div>
      </div>
    </header>
  );
};

// --- Task Tracker ---
const TaskTracker = () => {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('dev-tasks');
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState('');

  useEffect(() => {
    localStorage.setItem('dev-tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: input, completed: false }]);
    setInput('');
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const completedCount = tasks.filter(t => t.completed).length;

  return (
    <div className="bg-[#1a1a1a] p-6 rounded-lg neon-border-green h-full relative z-10 flex flex-col">
      <h3 className="font-['Press_Start_2P'] text-sm neon-text-green mb-6 leading-relaxed">📋 Today's Tasks</h3>

      <form onSubmit={addTask} className="flex gap-2 mb-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="New task..."
          className="flex-1 bg-gray-800 border border-gray-700 text-[#39ff14] px-3 py-2 rounded focus:outline-none focus:border-[#39ff14]"
        />
        <button type="submit" className="bg-[#39ff14] text-black px-4 py-2 rounded font-bold hover:bg-green-400 transition">
          Add
        </button>
      </form>

      <div className="flex-1 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
        {tasks.map(task => (
          <div key={task.id} className="flex items-center gap-3 bg-gray-800/50 p-3 rounded border border-gray-700 hover:border-[#39ff14] transition">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
              className="w-5 h-5 accent-[#39ff14] cursor-pointer"
            />
            <span className={`flex-1 ${task.completed ? 'line-through text-gray-500' : 'text-gray-200'}`}>
              {task.text}
            </span>
            <button
              onClick={() => deleteTask(task.id)}
              className="text-gray-500 hover:text-red-500 font-bold px-2"
            >
              ×
            </button>
          </div>
        ))}
        {tasks.length === 0 && <p className="text-gray-500 text-center py-4">No tasks yet. Stay productive!</p>}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-700 text-sm text-gray-400 text-right">
        {completedCount} / {tasks.length} tasks done
      </div>
    </div>
  );
};

// --- Modal Component ---
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/80 z-[10000] flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-[#1a1a1a] neon-border-magenta p-6 rounded-lg max-w-2xl w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white font-bold text-xl"
        >
          ×
        </button>
        <h3 className="font-['Press_Start_2P'] text-sm neon-text-magenta mb-6 text-center">{title}</h3>
        <div className="flex justify-center">
          {children}
        </div>
      </div>
    </div>
  );
};

// --- Fun Zone ---
const FunZone = () => {
  const [activeGame, setActiveGame] = useState(null);

  const games = [
    { id: 'pacman', title: 'PAC-MAN', color: 'blue', render: () => <PacManGame /> },
    { id: 'oggy', title: 'OGGY RUN', color: 'cyan', render: () => <OggyGame /> },
    { id: 'shinchan', title: 'SHIN-CHAN', color: 'green', render: () => <ShinChanGame /> }
  ];

  const getBorderClass = (color) => {
    switch(color) {
      case 'blue': return 'neon-border-cyan'; // Using cyan for blue as well
      case 'cyan': return 'neon-border-cyan';
      case 'green': return 'neon-border-green';
      default: return 'neon-border-magenta';
    }
  };

  return (
    <div className="bg-[#1a1a1a] p-6 rounded-lg neon-border-magenta relative z-10">
      <h3 className="font-['Press_Start_2P'] text-sm neon-text-magenta mb-6 leading-relaxed">🎮 Fun Zone — Take a Break</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {games.map(game => (
          <div key={game.id} className={`bg-gray-800/50 p-4 rounded-lg flex flex-col items-center border border-gray-700 hover:border-${game.color}-500 transition`}>
            <div className={`w-full h-24 mb-4 rounded bg-black/50 flex items-center justify-center ${getBorderClass(game.color)}`}>
               <span className="font-['Press_Start_2P'] text-xs text-gray-500 opacity-50">PREVIEW</span>
            </div>
            <h4 className="font-bold mb-3">{game.title}</h4>
            <button
              onClick={() => setActiveGame(game.id)}
              className={`w-full py-2 bg-gray-700 hover:bg-gray-600 text-white rounded transition font-bold`}
            >
              ▶ Play
            </button>
          </div>
        ))}
      </div>

      <Modal
        isOpen={!!activeGame}
        onClose={() => setActiveGame(null)}
        title={games.find(g => g.id === activeGame)?.title}
      >
        {activeGame && games.find(g => g.id === activeGame)?.render()}
      </Modal>
    </div>
  );
};

// --- AI News ---
const AiNews = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNews = async () => {
    setLoading(true);
    try {
      // Using gnews API. Note: Replace YOUR_API_KEY with an actual key if available.
      // For now, using a dummy fetch that will fail and fallback to dummy data.
      // Alternatively, we use a public proxy if available, but gnews needs a key.
      const API_KEY = 'YOUR_API_KEY'; // Placeholder
      const res = await axios.get(`https://gnews.io/api/v4/search?q=artificial+intelligence&max=10&lang=en&token=${API_KEY}`);
      if (res.data && res.data.articles) {
         setNews(res.data.articles);
      }
    } catch {
      console.log("News API key missing or rate limited. Using dummy data.");
      // Fallback dummy data
      const dummyData = Array.from({ length: 10 }).map((_, i) => ({
        title: `Dummy AI Headline ${i + 1}: The Future of Tech is Here and it is Glowing Neon`,
        source: { name: 'TechNews Mock' },
        publishedAt: new Date(Date.now() - i * 3600000).toISOString(),
        url: '#'
      }));
      setNews(dummyData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const getRelativeTime = (dateString) => {
    const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
    const diff = (new Date(dateString) - new Date()) / (1000 * 60 * 60);
    return rtf.format(Math.round(diff), 'hour');
  };

  return (
    <div className="bg-[#1a1a1a] p-6 rounded-lg neon-border-cyan relative z-10 flex flex-col h-[500px]">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-['Press_Start_2P'] text-sm neon-text-cyan leading-relaxed">⚡ AI News — Latest 10</h3>
        <button onClick={fetchNews} className="text-xs bg-gray-800 hover:bg-gray-700 text-[#00f5ff] px-3 py-1 rounded border border-[#00f5ff] transition">
          🔄 Refresh
        </button>
      </div>

      {loading ? (
        <div className="flex-1 flex items-center justify-center text-[#00f5ff] animate-pulse">Loading Database...</div>
      ) : (
        <>
          {news[0]?.source.name === 'TechNews Mock' && (
            <div className="text-xs text-[#ff00c8] mb-4 bg-[#ff00c8]/10 p-2 rounded border border-[#ff00c8]/30">
              Note: Replace API_KEY in fetchNews() to load live news. Showing dummy data.
            </div>
          )}
          <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
            {news.map((item, idx) => (
              <a
                key={idx}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-gray-800/60 p-4 rounded-lg border border-gray-700 hover:border-[#00f5ff] transition group"
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] bg-[#ff00c8]/20 text-[#ff00c8] px-2 py-0.5 rounded border border-[#ff00c8]/50">
                    AI / ML
                  </span>
                  <span className="text-xs text-gray-500">{getRelativeTime(item.publishedAt)}</span>
                </div>
                <h4 className="font-bold text-gray-200 line-clamp-2 group-hover:text-[#00f5ff] transition">
                  {item.title}
                </h4>
                <div className="text-xs text-gray-400 mt-2">{item.source.name}</div>
              </a>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default function DevDailyTracker() {
  return (
    <div className="dev-tracker-wrapper min-h-screen bg-[#0d0d0d] text-gray-300 font-['JetBrains_Mono'] relative overflow-hidden flex flex-col">
      {/* Background Effects */}
      <ParticleBackground />
      <div className="scanline"></div>
      <div className="crt-overlay"></div>

      <div className="container mx-auto p-4 md:p-8 flex-1 flex flex-col relative z-10 max-w-7xl">
        <Header />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 flex-1">
          {/* Left Column: Tasks */}
          <div className="lg:col-span-1">
            <TaskTracker />
          </div>

          {/* Middle Column: News */}
          <div className="lg:col-span-2">
            <AiNews />
          </div>
        </div>

        <div className="mt-8">
           <FunZone />
        </div>
      </div>

      {/* Scrollbar styles specific to the tracker to match theme */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #1a1a1a;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #333;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #00f5ff;
        }
      `}} />
    </div>
  );
}
