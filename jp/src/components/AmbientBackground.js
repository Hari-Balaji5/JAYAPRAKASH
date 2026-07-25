import React, { useEffect, useRef } from 'react';

const AmbientBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;
    let particles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    class StarParticle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.8 + 0.4;
        this.baseAlpha = Math.random() * 0.4 + 0.1;
        this.alpha = this.baseAlpha;
        this.speedY = -(Math.random() * 0.4 + 0.1);
        this.pulseSpeed = Math.random() * 0.02 + 0.005;
        this.pulseAngle = Math.random() * Math.PI * 2;
        this.hue = Math.random() > 0.5 ? 260 : 330; // Violet or Pink accent
      }

      update() {
        this.y += this.speedY;
        this.pulseAngle += this.pulseSpeed;
        this.alpha = this.baseAlpha + Math.sin(this.pulseAngle) * 0.2;

        if (this.y < -10) {
          this.y = canvas.height + 10;
          this.x = Math.random() * canvas.width;
        }
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = Math.max(0, Math.min(1, this.alpha));
        ctx.fillStyle = `hsla(${this.hue}, 90%, 75%, ${this.alpha})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    const count = Math.floor((window.innerWidth * window.innerHeight) / 18000);
    for (let i = 0; i < Math.min(count, 50); i++) {
      particles.push(new StarParticle());
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="ambient-bg-container">
      {/* Dynamic Glowing Ambient Blobs */}
      <div className="ambient-blob blob-top-left" />
      <div className="ambient-blob blob-bottom-right" />
      <div className="ambient-blob blob-center-glow" />

      {/* Cyber Grid Lines Overlay */}
      <div className="ambient-grid-overlay" />

      {/* Particle Canvas */}
      <canvas ref={canvasRef} className="ambient-particle-canvas" />
    </div>
  );
};

export default AmbientBackground;
