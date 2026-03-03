import { useInView } from '@/hooks/useInView';

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  /** 'up' = fade + rise (default), 'left' = fade + slide from left, 'right' = fade + slide from right */
  direction?: 'up' | 'left' | 'right';
  className?: string;
}

export function Reveal({ children, delay = 0, direction = 'up', className = '' }: RevealProps) {
  const { ref, inView } = useInView();

  const initial: Record<string, string> = {
    up: 'translateY(32px)',
    left: 'translateX(-32px)',
    right: 'translateX(32px)',
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'none' : initial[direction],
        transition: `opacity 0.65s cubic-bezier(0.4,0,0.2,1) ${delay}ms, transform 0.65s cubic-bezier(0.4,0,0.2,1) ${delay}ms`,
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  );
}
