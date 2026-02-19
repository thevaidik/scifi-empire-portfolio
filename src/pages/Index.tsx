import { useState, useCallback } from "react";
import PlanetGame from "@/components/PlanetGame";
import GameHUD from "@/components/GameHUD";

const Index = () => {
  const [activeBuilding, setActiveBuilding] = useState<string | null>(null);

  const handleBuildingProximity = useCallback((buildingId: string | null) => {
    setActiveBuilding(buildingId);
  }, []);

  return (
    <div className="game-container">
      <PlanetGame onBuildingProximity={handleBuildingProximity} />
      <GameHUD activeBuilding={activeBuilding} />
    </div>
  );
};

export default Index;
