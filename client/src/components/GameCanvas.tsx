import React, { useRef, useEffect, useCallback } from "react";
import { useFlappyBird } from "../lib/stores/useFlappyBird";
import { Bird, Pipe, Background } from "../lib/gameObjects";
import { updatePhysics } from "../lib/physics";
import { checkCollisions } from "../lib/collision";

const GameCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const lastTimeRef = useRef<number>(0);
  
  const {
    gameState,
    bird,
    pipes,
    gameSpeed,
    updateBird,
    updatePipes,
    addScore,
    endGame,
    setBird,
    setPipes
  } = useFlappyBird();

  // Initialize game objects
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const newBird = new Bird(canvas.width * 0.2, canvas.height * 0.5);
    setBird(newBird);
  }, [setBird]);

  // Initialize pipes when game starts
  useEffect(() => {
    if (!canvasRef.current || gameState !== 'playing') return;
    
    const canvas = canvasRef.current;
    
    // Only create pipes if there are none
    if (pipes.length === 0) {
      const initialPipes = [
        new Pipe(canvas.width * 1.2, canvas.height),
        new Pipe(canvas.width * 1.8, canvas.height)
      ];
      console.log('Creating initial pipes:', initialPipes.length, 'Canvas width:', canvas.width);
      setPipes(initialPipes);
    }
  }, [gameState, pipes.length, setPipes]);

  // Game loop
  const gameLoop = useCallback((currentTime: number) => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const deltaTime = currentTime - lastTimeRef.current;
    lastTimeRef.current = currentTime;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background
    Background.draw(ctx, canvas.width, canvas.height);

    if (gameState === 'playing') {
      // Update physics
      if (bird) {
        updatePhysics(bird, deltaTime);
        updateBird(bird);
      }

      // Update pipes
      const updatedPipes = pipes.map(pipe => {
        pipe.update(deltaTime, gameSpeed);
        return pipe;
      });

      // Add new pipes
      const lastPipe = updatedPipes[updatedPipes.length - 1];
      if (lastPipe && lastPipe.x < canvas.width * 0.7) {
        updatedPipes.push(new Pipe(canvas.width + 100, canvas.height));
      }

      // Remove off-screen pipes and add score
      const visiblePipes = updatedPipes.filter(pipe => {
        if (pipe.x + pipe.width < 0) {
          if (!pipe.scored) {
            addScore();
            pipe.scored = true;
          }
          return false;
        }
        return true;
      });

      setPipes(visiblePipes);

      // Check collisions
      if (bird && checkCollisions(bird, visiblePipes, canvas.height)) {
        endGame();
      }
    }

    // Draw pipes
    if (pipes.length > 0) {
      console.log('Drawing pipes:', pipes.length, 'First pipe x:', pipes[0].x);
    }
    pipes.forEach(pipe => pipe.draw(ctx));

    // Draw bird
    if (bird) {
      bird.draw(ctx);
    }

    animationRef.current = requestAnimationFrame(gameLoop);
  }, [gameState, bird, pipes, gameSpeed, updateBird, updatePipes, addScore, endGame, setPipes]);

  // Start game loop
  useEffect(() => {
    animationRef.current = requestAnimationFrame(gameLoop);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [gameLoop]);

  // Handle canvas resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        const container = canvas.parentElement;
        if (container) {
          canvas.width = container.clientWidth;
          canvas.height = container.clientHeight;
        }
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ touchAction: 'none' }}
    />
  );
};

export default GameCanvas;
