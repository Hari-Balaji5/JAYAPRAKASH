import React, { useEffect, useRef, useCallback } from 'react';

const Confetti = ({ active }) => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animationRef = useRef(null);

  const createBurst = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const colors = [
      '#ff6b9d', '#c44dff', '#ffd700', '#ff4757',
      '#38bdf8', '#fb923c', '#4ade80', '#f472b6',
      '#facc15', '#a78bfa', '#f43f5e', '#38ef7d',
    ];

    // Standard confetti pieces
    for (let i = 0; i < 150; i++) {
      const angle = Math.random() * Math.PI * 2;
      const velocity = Math.random() * 16 + 5;
      particlesRef.current.push({
        type: 'confetti',
        x: canvas.width / 2,
        y: canvas.height / 3,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity - 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 9 + 4,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 20,
        opacity: 1,
        gravity: 0.18,
        shape: Math.random() > 0.5 ? 'rect' : 'circle',
      });
    }

    // Heart particles rain
    for (let i = 0; i < 40; i++) {
      particlesRef.current.push({
        type: 'heart',
        x: Math.random() * canvas.width,
        y: -20,
        vx: (Math.random() - 0.5) * 3,
        vy: Math.random() * 4 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 20 + 12,
        rotation: (Math.random() - 0.5) * 30,
        rotationSpeed: (Math.random() - 0.5) * 3,
        opacity: 1,
        gravity: 0.05,
      });
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    const drawHeart = (ctx, x, y, size, color) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.beginPath();
      const s = size * 0.5;
      ctx.moveTo(0, s * 0.3);
      ctx.bezierCurveTo(-s * 0.5, -s * 0.3, -s, s * 0.1, 0, s);
      ctx.bezierCurveTo(s, s * 0.1, s * 0.5, -s * 0.3, 0, s * 0.3);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current = particlesRef.current.filter((p) => p.opacity > 0.01);

      particlesRef.current.forEach((p) => {
        p.x += p.vx;
        p.vy += p.gravity;
        p.y += p.vy;
        p.vx *= 0.98;
        p.rotation += p.rotationSpeed;
        p.opacity -= p.type === 'heart' ? 0.005 : 0.007;

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.opacity);

        if (p.type === 'heart') {
          drawHeart(ctx, p.x, p.y, p.size, p.color);
        } else {
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.fillStyle = p.color;

          if (p.shape === 'rect') {
            ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
          } else {
            ctx.beginPath();
            ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
            ctx.fill();
          }
        }

        ctx.restore();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  useEffect(() => {
    if (active) {
      createBurst();
      const t1 = setTimeout(() => createBurst(), 300);
      const t2 = setTimeout(() => createBurst(), 650);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }
  }, [active, createBurst]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 999,
      }}
    />
  );
};

export default Confetti;
