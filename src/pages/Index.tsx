import { useState, useCallback } from "react";
import PlanetGame from "@/components/PlanetGame";
import GameHUD from "@/components/GameHUD";
import Portfolio from "@/components/Portfolio";

const Index = () => {
  const [gameMode, setGameMode] = useState(false);
  const [activeBuilding, setActiveBuilding] = useState<string | null>(null);

  const handleBuildingProximity = useCallback((buildingId: string | null) => {
    setActiveBuilding(buildingId);
  }, []);

  if (!gameMode) {
    return <Portfolio onEnterGame={() => setGameMode(true)} />;
  }

  return (
    <div className="game-container">
      <PlanetGame onBuildingProximity={handleBuildingProximity} />
      <GameHUD activeBuilding={activeBuilding} />
      <button
        onClick={() => setGameMode(false)}
        className="fixed top-4 right-4 z-50 sw-button px-4 py-2 rounded-full font-display text-xs tracking-[0.15em] pointer-events-auto"
      >
        EXIT GAME
      </button>
    </div>
  );
};

export default Index;
