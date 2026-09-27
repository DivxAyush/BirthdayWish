// Shared TypeScript types for the birthday website

export type Scene =
  | "intro"
  | "heart-tree"
  | "cake"
  | "balloons"
  | "love-letter"
  | "final";

export interface Reason {
  title: string;
  message: string;
}

export interface BalloonData extends Reason {
  id: string;
  color: string;
  x: number;
  floatOffset: number;
  rotateRange: number;
  delay: number;
  size: number;
  popped: boolean;
}

export interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  life: number;
}
