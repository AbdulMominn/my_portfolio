import type { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  as?: "article" | "div";
}

export function GlassCard({ children, className = "", as: Element = "div" }: GlassCardProps) {
  return <Element className={`glass-card ${className}`.trim()}>{children}</Element>;
}
