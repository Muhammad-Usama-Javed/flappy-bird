import React from "react";
import FlappyBird from "./components/FlappyBird";
import { useAudio } from "./lib/stores/useAudio";
import { useEffect } from "react";

function App() {
  const { setHitSound, setSuccessSound } = useAudio();

  useEffect(() => {
    // Load sound effects
    const hitAudio = new Audio("/sounds/hit.mp3");
    const successAudio = new Audio("/sounds/success.mp3");
    
    setHitSound(hitAudio);
    setSuccessSound(successAudio);
  }, [setHitSound, setSuccessSound]);

  return (
    <div className="w-full h-screen bg-gradient-to-b from-blue-400 to-blue-600 overflow-hidden">
      <FlappyBird />
    </div>
  );
}

export default App;
