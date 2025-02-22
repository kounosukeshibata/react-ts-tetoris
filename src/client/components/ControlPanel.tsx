import { getNextBlock, type MoveType } from "../components/blocks";
import useKeyHandler from "../hooks/useKeyHandler";

type ControlPanelProps = {
  move: (m: MoveType) => void; // move関数の型を指定
  fall: () => void; // fall関数の型を指定
};

const ControlPanel: React.FC<ControlPanelProps> = ({ move, fall }) => {
  return (
    <div className="controlpanels">
      <button className="arrow-left" onClick={() => move("left")}>
        ←
      </button>
      <button className="arrow-up" onClick={() => move("turn")}>
        ↑
      </button>
      <button className="arrow-down">↓</button>
      <button className="arrow-right" onClick={() => move("right")}>
        →
      </button>
      <button className="arrow-down" onClick={() => fall()}>
        _
      </button>
    </div>
  );
};

export default ControlPanel;
