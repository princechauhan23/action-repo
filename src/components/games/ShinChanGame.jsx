import React, { useEffect, useRef, useState } from 'react';

export const ShinChanGame = () => {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [gameOver, setGameOver] = useState(false);
  const [highScore, setHighScore] = useState(() => parseInt(localStorage.getItem('shinchan-high') || '0'));

  useEffect(() => {
    if (gameOver) {
      if (score > highScore) {
        setHighScore(score);
        localStorage.setItem('shinchan-high', score.toString());
      }
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const holes = [
      { x: 100, y: 100, r: 30 }, { x: 250, y: 100, r: 30 }, { x: 400, y: 100, r: 30 },
      { x: 100, y: 250, r: 30 }, { x: 250, y: 250, r: 30 }, { x: 400, y: 250, r: 30 }
    ];
    let activeHole = -1;
    let moleTimer = 0;

    let animationId;
    let timerId = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          setGameOver(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    const handleClick = (e) => {
      if (gameOver) return;
      const rect = canvas.getBoundingClientRect();
      // Adjust scale to handle canvas CSS scaling
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      const mouseX = (e.clientX - rect.left) * scaleX;
      const mouseY = (e.clientY - rect.top) * scaleY;

      if (activeHole !== -1) {
        const h = holes[activeHole];
        const dist = Math.sqrt((mouseX - h.x)**2 + (mouseY - h.y)**2);
        if (dist <= h.r) {
          setScore(s => s + 1);
          activeHole = -1; // hide immediately
        }
      }
    };
    canvas.addEventListener('mousedown', handleClick);

    const loop = () => {
      if (gameOver) return;
      ctx.fillStyle = '#228B22'; // Forest green
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw holes
      holes.forEach((h, i) => {
        ctx.fillStyle = '#000';
        ctx.beginPath();
        ctx.ellipse(h.x, h.y, h.r, h.r * 0.5, 0, 0, Math.PI * 2);
        ctx.fill();

        // Draw Shin-chan (mole)
        if (i === activeHole) {
          ctx.fillStyle = '#FFE4C4'; // skin color
          ctx.beginPath();
          ctx.arc(h.x, h.y - 15, 20, 0, Math.PI*2);
          ctx.fill();
          // eyes
          ctx.fillStyle = 'black';
          ctx.beginPath(); ctx.arc(h.x - 7, h.y - 20, 3, 0, Math.PI*2); ctx.fill();
          ctx.beginPath(); ctx.arc(h.x + 7, h.y - 20, 3, 0, Math.PI*2); ctx.fill();
          // eyebrows (thick)
          ctx.lineWidth = 4;
          ctx.beginPath(); ctx.moveTo(h.x - 12, h.y - 25); ctx.lineTo(h.x - 2, h.y - 25); ctx.stroke();
          ctx.beginPath(); ctx.moveTo(h.x + 2, h.y - 25); ctx.lineTo(h.x + 12, h.y - 25); ctx.stroke();
        }
      });

      moleTimer++;
      if (moleTimer > 40) { // pop up frequency
        moleTimer = 0;
        activeHole = Math.floor(Math.random() * holes.length);
        if (Math.random() > 0.7) activeHole = -1; // sometimes hide
      }

      animationId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      clearInterval(timerId);
      canvas.removeEventListener('mousedown', handleClick);
      cancelAnimationFrame(animationId);
    };
  }, [gameOver, score, highScore]);

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-between w-full max-w-[500px] mb-4 text-[#39ff14] font-['Press_Start_2P'] text-sm">
        <div>Score: {score}</div>
        <div>Time: {timeLeft}s</div>
      </div>
      <canvas ref={canvasRef} width={500} height={350} className="border-4 border-[#39ff14] bg-black max-w-full" />
      <div className="mt-4 text-xs text-gray-400">High Score: {highScore}</div>
      {gameOver && (
        <button onClick={() => {setScore(0); setTimeLeft(10); setGameOver(false);}} className="mt-4 bg-[#39ff14] text-black px-4 py-2 font-bold rounded">
          Play Again
        </button>
      )}
    </div>
  );
};
