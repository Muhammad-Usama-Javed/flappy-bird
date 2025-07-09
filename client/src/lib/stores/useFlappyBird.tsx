import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { Bird, Pipe } from "../gameObjects";
import { useAudio } from "./useAudio";

export type GameState = "menu" | "playing" | "gameOver";

interface FlappyBirdState {
  gameState: GameState;
  score: number;
  highScore: number;
  bird: Bird | null;
  pipes: Pipe[];
  gameSpeed: number;
  
  // Actions
  startGame: () => void;
  resetGame: () => void;
  endGame: () => void;
  jump: () => void;
  updateBird: (bird: Bird) => void;
  updatePipes: (pipes: Pipe[]) => void;
  addScore: () => void;
  setBird: (bird: Bird) => void;
  setPipes: (pipes: Pipe[]) => void;
}

export const useFlappyBird = create<FlappyBirdState>()(
  subscribeWithSelector((set, get) => ({
    gameState: "menu",
    score: 0,
    highScore: parseInt(localStorage.getItem('flappyBirdHighScore') || '0'),
    bird: null,
    pipes: [],
    gameSpeed: 2,
    
    startGame: () => {
      const { bird } = get();
      if (bird) {
        bird.reset();
      }
      set({
        gameState: "playing",
        score: 0,
        pipes: []
      });
    },
    
    resetGame: () => {
      const { bird } = get();
      if (bird) {
        bird.reset();
      }
      set({
        gameState: "menu",
        score: 0,
        pipes: []
      });
    },
    
    endGame: () => {
      const { score, highScore } = get();
      const newHighScore = Math.max(score, highScore);
      
      if (newHighScore > highScore) {
        localStorage.setItem('flappyBirdHighScore', newHighScore.toString());
      }
      
      // Play hit sound
      const { playHit } = useAudio.getState();
      playHit();
      
      set({
        gameState: "gameOver",
        highScore: newHighScore
      });
    },
    
    jump: () => {
      const { bird, gameState } = get();
      if (bird && gameState === "playing") {
        bird.jump();
      }
    },
    
    updateBird: (bird: Bird) => {
      set({ bird });
    },
    
    updatePipes: (pipes: Pipe[]) => {
      set({ pipes });
    },
    
    addScore: () => {
      const { score } = get();
      
      // Play success sound
      const { playSuccess } = useAudio.getState();
      playSuccess();
      
      set({ score: score + 1 });
    },
    
    setBird: (bird: Bird) => {
      set({ bird });
    },
    
    setPipes: (pipes: Pipe[]) => {
      set({ pipes });
    }
  }))
);
