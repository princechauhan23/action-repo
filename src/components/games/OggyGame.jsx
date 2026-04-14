import React, { useEffect, useRef, useState } from 'react';

export const OggyGame = () => {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let oggy = { x: 50, y: 200, width: 30, height: 30, vy: 0, jumpStrength: -10, grounded: true };
    let obstacles = [];
    let gravity = 0.5;
    let groundY = 230;
    let speed = 3;
    let frames = 0;

    let animationId;

    const handleKeyDown = (e) => {
      if (e.code === 'Space' && oggy.grounded) {
        e.preventDefault();
        oggy.vy = oggy.jumpStrength;
        oggy.grounded = false;
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    const loop = () => {
      if (gameOver) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw background/ground
      ctx.fillStyle = '#87CEEB'; // Sky
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#8B4513'; // Ground
      ctx.fillRect(0, groundY, canvas.width, canvas.height - groundY);

      // Physics
      oggy.vy += gravity;
      oggy.y += oggy.vy;
      if (oggy.y + oggy.height >= groundY) {
        oggy.y = groundY - oggy.height;
        oggy.vy = 0;
        oggy.grounded = true;
      }

      // Draw Oggy (simple cat-like representation)
      ctx.fillStyle = '#00f5ff'; // Neon blue cat
      ctx.fillRect(oggy.x, oggy.y, oggy.width, oggy.height);
      // ears
      ctx.beginPath();
      ctx.moveTo(oggy.x, oggy.y);
      ctx.lineTo(oggy.x + 10, oggy.y - 10);
      ctx.lineTo(oggy.x + 15, oggy.y);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(oggy.x + 15, oggy.y);
      ctx.lineTo(oggy.x + 20, oggy.y - 10);
      ctx.lineTo(oggy.x + 30, oggy.y);
      ctx.fill();

      // Obstacles
      if (frames % 100 === 0) {
        obstacles.push({ x: canvas.width, y: groundY - 20, width: 20, height: 20 });
      }

      for (let i = obstacles.length - 1; i >= 0; i--) {
        let obs = obstacles[i];
        obs.x -= speed;

        ctx.fillStyle = '#ff00c8'; // Neon pink obstacles (roaches)
        ctx.fillRect(obs.x, obs.y, obs.width, obs.height);

        // Collision
        if (
          oggy.x < obs.x + obs.width &&
          oggy.x + oggy.width > obs.x &&
          oggy.y < obs.y + obs.height &&
          oggy.y + oggy.height > obs.y
        ) {
          setGameOver(true);
        }

        if (obs.x + obs.width < 0) {
          obstacles.splice(i, 1);
          setScore(s => s + 10);
        }
      }

      frames++;
      speed += 0.001; // gradually increase speed

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
      <div className="mb-4 text-[#00f5ff] font-['Press_Start_2P'] text-sm">Score: {score}</div>
      <canvas ref={canvasRef} width={600} height={300} className="border-4 border-[#00f5ff] bg-black max-w-full" />
      <div className="mt-4 text-xs text-gray-400">Press SPACE to jump</div>
      {gameOver && (
        <button onClick={() => {setScore(0); setGameOver(false);}} className="mt-4 bg-[#00f5ff] text-black px-4 py-2 font-bold rounded">
          Restart
        </button>
      )}
    </div>
  );
};
