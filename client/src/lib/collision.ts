import { Bird, Pipe } from "./gameObjects";

export function checkCollisions(bird: Bird, pipes: Pipe[], canvasHeight: number): boolean {
  // Check ground collision
  if (bird.y + bird.height >= canvasHeight - 60) {
    return true;
  }
  
  // Check ceiling collision
  if (bird.y <= 0) {
    return true;
  }
  
  // Check pipe collisions
  for (const pipe of pipes) {
    if (checkRectCollision(
      { x: bird.x, y: bird.y, width: bird.width, height: bird.height },
      pipe.getTopRect()
    )) {
      return true;
    }
    
    if (checkRectCollision(
      { x: bird.x, y: bird.y, width: bird.width, height: bird.height },
      pipe.getBottomRect()
    )) {
      return true;
    }
  }
  
  return false;
}

function checkRectCollision(rect1: { x: number; y: number; width: number; height: number }, rect2: { x: number; y: number; width: number; height: number }): boolean {
  return rect1.x < rect2.x + rect2.width &&
         rect1.x + rect1.width > rect2.x &&
         rect1.y < rect2.y + rect2.height &&
         rect1.y + rect1.height > rect2.y;
}
