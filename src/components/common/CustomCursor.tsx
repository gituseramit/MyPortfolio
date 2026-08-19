import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [ringPosition, setRingPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect touch device
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouchDevice(true);
      return;
    }

    let targetX = -100;
    let targetY = -100;
    let currentRingX = -100;
    let currentRingY = -100;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      setPosition({ x: targetX, y: targetY });
      if (!isVisible) setIsVisible(true);

      // Check if hovering interactive elements
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest('button, a, input, textarea, select, [role="button"], .interactive-element');
        setIsHovering(!!interactive);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    document.body.addEventListener('mouseenter', handleMouseEnter);

    // Smooth interpolation loop for outer ring
    let animId: number;
    const updateRing = () => {
      currentRingX += (targetX - currentRingX) * 0.18;
      currentRingY += (targetY - currentRingY) * 0.18;
      setRingPosition({ x: currentRingX, y: currentRingY });
      animId = requestAnimationFrame(updateRing);
    };
    animId = requestAnimationFrame(updateRing);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(animId);
    };
  }, [isVisible]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden" aria-hidden="true">
      {/* Outer Interpolated Ring */}
      <div
        className={`fixed -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-400/60 transition-[width,height,background-color,border-color] duration-150 ease-out flex items-center justify-center ${
          isHovering
            ? 'w-12 h-12 bg-cyan-500/15 border-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.4)]'
            : isClicking
            ? 'w-6 h-6 bg-cyan-400/30 border-cyan-400'
            : 'w-9 h-9 border-cyan-400/40'
        }`}
        style={{
          left: `${ringPosition.x}px`,
          top: `${ringPosition.y}px`,
        }}
      >
        {/* Subtle crosshair lines on hover */}
        {isHovering && (
          <>
            <div className="absolute w-2 h-[1px] bg-cyan-400 -left-1" />
            <div className="absolute w-2 h-[1px] bg-cyan-400 -right-1" />
            <div className="absolute h-2 w-[1px] bg-cyan-400 -top-1" />
            <div className="absolute h-2 w-[1px] bg-cyan-400 -bottom-1" />
          </>
        )}
      </div>

      {/* Inner Glowing Center Dot */}
      <div
        className={`fixed -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400 shadow-[0_0_8px_#38bdf8] transition-transform duration-75 ${
          isHovering ? 'scale-150 bg-white' : isClicking ? 'scale-75' : 'scale-100'
        } w-1.5 h-1.5`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      />
    </div>
  );
};
