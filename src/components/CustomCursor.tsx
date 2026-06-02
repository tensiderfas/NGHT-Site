import React, { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);

  // Use refs for mouse/cursor positions to avoid high-frequency react re-renders
  const mouseRef = useRef({ x: -100, y: -100 });
  const delayCursorRef = useRef({ x: -100, y: -100 });
  const innerCursorRef = useRef({ x: -100, y: -100 });
  const scaleRef = useRef(1.0);

  const outerRingRef = useRef<HTMLDivElement | null>(null);
  const innerDotRef = useRef<HTMLDivElement | null>(null);

  // Keep track of hover state in ref for the animation loop
  const hoveredRef = useRef(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);
    };

    const handleMouseLeave = () => {
      setVisible(false);
    };

    const handleMouseEnter = () => {
      setVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      // Robust check that covers brand logos and text elements inside components with .cursor-pointer
      const isInteractive =
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.closest('.cursor-pointer') ||
        target.classList?.contains('cursor-pointer') ||
        target.getAttribute('role') === 'button';

      const stateActive = !!isInteractive;
      setHovered(stateActive);
      hoveredRef.current = stateActive;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseover', handleMouseOver);

    // Initial positioning on mounting to prevent jumping
    delayCursorRef.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    innerCursorRef.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    // Animation Loop for buttery smooth lagging interpolation (LERP)
    let animationFrameId: number;
    const updatePosition = () => {
      const targetX = mouseRef.current.x;
      const targetY = mouseRef.current.y;

      // Smooth outer ring lag (LERP factor ~ 0.14 for clean drag)
      delayCursorRef.current.x += (targetX - delayCursorRef.current.x) * 0.14;
      delayCursorRef.current.y += (targetY - delayCursorRef.current.y) * 0.14;

      // Precise inner dot lag (LERP factor ~ 0.35, tighter)
      innerCursorRef.current.x += (targetX - innerCursorRef.current.x) * 0.35;
      innerCursorRef.current.y += (targetY - innerCursorRef.current.y) * 0.35;

      // Buttery smooth scale interpolation for hovings
      const targetScale = hoveredRef.current ? 1.5 : 1.0;
      scaleRef.current += (targetScale - scaleRef.current) * 0.16;

      if (outerRingRef.current) {
        outerRingRef.current.style.transform = `translate3d(${delayCursorRef.current.x}px, ${delayCursorRef.current.y}px, 0) translate(-50%, -50%) scale(${scaleRef.current})`;
      }
      if (innerDotRef.current) {
        innerDotRef.current.style.transform = `translate3d(${innerCursorRef.current.x}px, ${innerCursorRef.current.y}px, 0) translate(-50%, -50%) scale(${hoveredRef.current ? 0.3 : 1})`;
      }

      animationFrameId = requestAnimationFrame(updatePosition);
    };

    animationFrameId = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(animationFrameId);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <>
      {/* Smooth outer trailing circle ring */}
      <div
        ref={outerRingRef}
        id="custom-cursor-outer"
        className={`custom-cursor border border-brand-orange/40 bg-brand-blue/[0.03] shadow-md transition-all ${
          hovered ? 'border-brand-orange bg-brand-orange/15 shadow-md shadow-brand-orange/10' : ''
        }`}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '16px',
          height: '16px',
          borderRadius: '50%',
          borderWidth: '1.5px',
          pointerEvents: 'none',
          zIndex: 9999,
          // Transition is specifically NOT for transform (handled smoothly by requestAnimationFrame LERP)
          transition: 'background-color 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease',
        }}
      />
      {/* Accurate inner dot */}
      <div
        ref={innerDotRef}
        id="custom-cursor-inner"
        className="custom-cursor-inner bg-brand-orange shadow-xs"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '4px',
          height: '4px',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 10000,
          transition: 'background-color 0.2s ease',
        }}
      />
    </>
  );
}
