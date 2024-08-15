import React, { useEffect, useRef } from 'react';

const Canvascomp = () => {
  const canvasRef = useRef(null);
  const CHARACTER_WIDTH = 20;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const init = () => {
      const NUM_DROPS = Math.floor(canvas.width / CHARACTER_WIDTH);
      const drops = [];
      for (let i = 0; i < NUM_DROPS; i++) {
        drops.push({
          x: i * CHARACTER_WIDTH,
          y: Math.random() * canvas.height
        });
      }
      return drops;
    };

    const animate = (ctx, canvas, drops) => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = "green";
      ctx.font = "20px serif";
      
      drops.forEach((drop, i) => {
        const char = String.fromCharCode(0x30A0 + Math.random() * 96);
        ctx.fillText(char, drop.x, drop.y);
        
        drop.y += CHARACTER_WIDTH;
        if (drop.y > canvas.height) {
          drop.y = 0;
          drop.x = i * CHARACTER_WIDTH;
        }
      });
      
      requestAnimationFrame(() => animate(ctx, canvas, drops));
    };

    resizeCanvas();
    let drops = init();
    animate(ctx, canvas, drops);

    window.addEventListener('resize', () => {
      resizeCanvas();
      drops = init();
    });

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ display: 'block' }} />;
};

export default Canvascomp;