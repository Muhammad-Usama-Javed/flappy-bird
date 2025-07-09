import { Bird } from "./gameObjects";

const GRAVITY = 0.5;
const TERMINAL_VELOCITY = 10;

export function updatePhysics(bird: Bird, deltaTime: number) {
  // Apply gravity
  bird.velocity += GRAVITY * (deltaTime / 16.67); // Normalize to 60fps
  
  // Apply terminal velocity
  bird.velocity = Math.min(bird.velocity, TERMINAL_VELOCITY);
  
  // Update position
  bird.y += bird.velocity * (deltaTime / 16.67);
  
  // Update bird rotation and other properties
  bird.update(deltaTime);
}
