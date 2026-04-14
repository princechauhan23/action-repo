import React, { useEffect, useRef, useState } from 'react';

export const PacManGame = () => {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Game state
    const gridSize = 20;
    const cols = canvas.width / gridSize;
    const rows = canvas.height / gridSize;

    let pacman = { x: 10, y: 10, vx: 0, vy: 0, radius: 8, angle: 0.2 };
    let ghosts = [
      { x: 1, y: 1, vx: 1, vy: 0, color: 'red' },
      { x: cols - 2, y: 1, vx: 0, vy: 1, color: 'pink' }
    ];
    let dots = [];

    // Initialize dots
    for (let x = 1; x < cols; x+=2) {
      for (let y = 1; y < rows; y+=2) {
        if (Math.random() > 0.3) {
          dots.push({ x, y });
        }
      }
    }

    let animationId;

    const handleKeyDown = (e) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault(); // Prevent scrolling
      }
      if (e.key === 'ArrowUp') { pacman.vx = 0; pacman.vy = -1; }
      if (e.key === 'ArrowDown') { pacman.vx = 0; pacman.vy = 1; }
      if (e.key === 'ArrowLeft') { pacman.vx = -1; pacman.vy = 0; }
      if (e.key === 'ArrowRight') { pacman.vx = 1; pacman.vy = 0; }
    };

    window.addEventListener('keydown', handleKeyDown);

    let tick = 0;
    const loop = () => {
      if (gameOver) return;
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Move pacman slowly
      if (tick % 5 === 0) {
        pacman.x += pacman.vx;
        pacman.y += pacman.vy;

        // Wrap around
        if (pacman.x < 0) pacman.x = cols - 1;
        if (pacman.x >= cols) pacman.x = 0;
        if (pacman.y < 0) pacman.y = rows - 1;
        if (pacman.y >= rows) pacman.y = 0;

        // Collect dots
        const prevDotsLen = dots.length;
        dots = dots.filter(d => !(d.x === pacman.x && d.y === pacman.y));
        if (dots.length < prevDotsLen) setScore(s => s + 10);
      }

      // Draw dots
      ctx.fillStyle = 'white';
      dots.forEach(d => {
        ctx.beginPath();
        ctx.arc(d.x * gridSize + gridSize/2, d.y * gridSize + gridSize/2, 2, 0, Math.PI*2);
        ctx.fill();
      });

      // Draw pacman
      ctx.fillStyle = 'yellow';
      ctx.beginPath();
      let mouthOpen = (Math.sin(tick * 0.2) + 1) * 0.2; // 0 to 0.4
      let angleOffset = 0;
      if (pacman.vx === 1) angleOffset = 0;
      else if (pacman.vx === -1) angleOffset = Math.PI;
      else if (pacman.vy === 1) angleOffset = Math.PI/2;
      else if (pacman.vy === -1) angleOffset = -Math.PI/2;

      ctx.arc(
        pacman.x * gridSize + gridSize/2,
        pacman.y * gridSize + gridSize/2,
        pacman.radius,
        angleOffset + mouthOpen * Math.PI,
        angleOffset + (2 - mouthOpen) * Math.PI
      );
      ctx.lineTo(pacman.x * gridSize + gridSize/2, pacman.y * gridSize + gridSize/2);
      ctx.fill();

      // Move and draw ghosts
      if (tick % 10 === 0) {
        ghosts.forEach(g => {
          if (Math.random() < 0.2) {
             // Random direction change
             const dirs = [[1,0], [-1,0], [0,1], [0,-1]];
             const d = dirs[Math.floor(Math.random() * dirs.length)];
             g.vx = d[0]; g.vy = d[1];
          }
          g.x += g.vx;
          g.y += g.vy;
          if (g.x < 0) g.x = cols - 1;
          if (g.x >= cols) g.x = 0;
          if (g.y < 0) g.y = rows - 1;
          if (g.y >= rows) g.y = 0;

          // Collision
          if (g.x === pacman.x && g.y === pacman.y) {
            setGameOver(true);
          }
        });
      }

      ghosts.forEach(g => {
        ctx.fillStyle = g.color;
        ctx.beginPath();
        const gx = g.x * gridSize + gridSize/2;
        const gy = g.y * gridSize + gridSize/2;
        ctx.arc(gx, gy, 8, Math.PI, 0);
        ctx.lineTo(gx + 8, gy + 8);
        ctx.lineTo(gx - 8, gy + 8);
        ctx.fill();
      });

      tick++;
      if (!gameOver) {
        animationId = requestAnimationFrame(loop);
      } else {
        ctx.fillStyle = 'rgba(0,0,0,0.7)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'white';
        ctx.font = '20px "Press Start 2P"';
        ctx.textAlign = 'center';
        ctx.fillText('GAME OVER', canvas.width/2, canvas.height/2);
      }
    };

    loop();

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      cancelAnimationFrame(animationId);
    };
  }, [gameOver]);

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 text-yellow-400 font-['Press_Start_2P'] text-sm">Score: {score}</div>
      <canvas ref={canvasRef} width={400} height={400} className="border-4 border-blue-600 bg-black" />
      <div className="mt-4 text-xs text-gray-400">Use Arrow Keys to move</div>
      {gameOver && (
        <button onClick={() => {setScore(0); setGameOver(false);}} className="mt-4 bg-yellow-400 text-black px-4 py-2 font-bold rounded">
          Restart
        </button>
      )}
    </div>
  );
};
