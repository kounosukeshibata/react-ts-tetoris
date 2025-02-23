import { type MoveType } from "../components/blocks/index.js";
import { useState } from "react";

type ControlPanelProps = {
  nextStep: () => void;
  move: (m: MoveType) => void; // move関数の型を指定
  fall: () => void; // fall関数の型を指定
};

const ControlPanel: React.FC<ControlPanelProps> = ({
  nextStep,
  move,
  fall,
}) => {
  const [lastTap, setLastTap] = useState(0);

  const handleTouchEnd = (action: () => void) => {
    const currentTime = Date.now();
    const tapDelay = 500;
    if (currentTime - lastTap < tapDelay) {
      return;
    }
    setLastTap(currentTime);
    action();
  };

  return (
    <div className="controlpanels">
      <button
        className="arrow-left"
        onTouchEnd={() => handleTouchEnd(() => move("left"))}
      >
        ←
      </button>
      <button
        className="arrow-up"
        onTouchEnd={() => handleTouchEnd(() => move("turn"))}
      >
        ↑
      </button>
      <button
        className="arrow-down"
        onTouchEnd={() => handleTouchEnd(() => nextStep())}
      >
        ↓
      </button>
      <button
        className="arrow-right"
        onTouchEnd={() => handleTouchEnd(() => move("right"))}
      >
        →
      </button>
      <button
        className="fall-down"
        onTouchEnd={() => handleTouchEnd(() => fall())}
      >
        _
      </button>
    </div>
  );
};

export default ControlPanel;
