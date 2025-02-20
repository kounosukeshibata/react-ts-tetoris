import { useState } from "react";
import {
  Block,
  getNextBlock,
  type MoveType,
  moveBlock,
} from "../components/blocks";

const DUMMY_BLOCKS: Block[] = [
  // { x: 0, y: 0, turn: 0, type: "i" },
  // { x: 1, y: 0, turn: 0, type: "o" },
  // { x: 3, y: 0, turn: 0, type: "s" },
  // { x: 6, y: 0, turn: 0, type: "z" },
  // { x: 1, y: 2, turn: 0, type: "j" },
  // { x: 4, y: 2, turn: 0, type: "l" },
  // { x: 7, y: 2, turn: 0, type: "t" },
];

const useBlocks = (boardWidth: number, boardHeight: number) => {
  const [blocks] = useState(DUMMY_BLOCKS);
  const [fallingBlock, setFallingBlock] = useState<Block | null>(null);

  const nextStep = () => {
    setFallingBlock(getNextBlock(fallingBlock, boardWidth, boardHeight));
  };

  const move = (m: MoveType) => {
    if (fallingBlock === null) {
      return;
    }
    setFallingBlock(moveBlock(fallingBlock, m, boardWidth) || fallingBlock);
  };

  return {
    blocks,
    fallingBlock,
    nextStep,
    move,
  };
};

export default useBlocks;
