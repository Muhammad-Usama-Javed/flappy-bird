import React, { useEffect, useRef } from "react";
import { useFlappyBird } from "../lib/stores/useFlappyBird";
import { useAudio } from "../lib/stores/useAudio";
import GameCanvas from "./GameCanvas";

const FlappyBird: React.FC = () => {
  const { 
    gameState, 
    score, 
    highScore,
    startGame, 
    resetGame,
    jump
  } = useFlappyBird();
  
  const { isMuted, toggleMute } = useAudio();
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle input events
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        if (gameState === 'menu' || gameState === 'gameOver') {
          startGame();
        } else if (gameState === 'playing') {
          jump();
        }
      }
    };

    const handleClick = (e: MouseEvent) => {
      e.preventDefault();
      if (gameState === 'menu' || gameState === 'gameOver') {
        startGame();
      } else if (gameState === 'playing') {
        jump();
      }
    };

    const handleTouch = (e: TouchEvent) => {
      e.preventDefault();
      if (gameState === 'menu' || gameState === 'gameOver') {
        startGame();
      } else if (gameState === 'playing') {
        jump();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    window.addEventListener('click', handleClick);
    window.addEventListener('touchstart', handleTouch);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('touchstart', handleTouch);
    };
  }, [gameState, startGame, jump]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full"
      style={{ touchAction: 'none' }}
    >
      <GameCanvas />
      
      {/* UI Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Score Display */}
        {gameState === 'playing' && (
          <div className="absolute top-8 left-1/2 transform -translate-x-1/2">
            <div className="text-white text-6xl font-bold text-center drop-shadow-lg">
              {score}
            </div>
          </div>
        )}

        {/* Menu Screen */}
        {gameState === 'menu' && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-8xl font-bold mb-8 drop-shadow-lg">
                FLAPPY BIRD
              </h1>
              <p className="text-2xl mb-4">
                Tap or press SPACE to flap
              </p>
              <p className="text-xl mb-8">
                High Score: {highScore}
              </p>
              <div className="text-xl animate-pulse">
                Tap to Start
              </div>
            </div>
          </div>
        )}

        {/* Game Over Screen */}
        {gameState === 'gameOver' && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="text-center text-white">
              <h2 className="text-6xl font-bold mb-8 drop-shadow-lg">
                GAME OVER
              </h2>
              <div className="text-3xl mb-4">
                Score: {score}
              </div>
              <div className="text-2xl mb-8">
                High Score: {highScore}
              </div>
              <div className="text-xl animate-pulse">
                Tap to Restart
              </div>
            </div>
          </div>
        )}

        {/* Mute Button */}
        <button
          className="absolute top-4 right-4 text-white text-2xl pointer-events-auto bg-black bg-opacity-30 rounded-full w-12 h-12 flex items-center justify-center"
          onClick={(e) => {
            e.stopPropagation();
            toggleMute();
          }}
        >
          {isMuted ? '🔇' : '🔊'}
        </button>
      </div>
    </div>
  );
};

export default FlappyBird;
