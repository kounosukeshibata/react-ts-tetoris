import { useState } from "react";
import { Block, getNextBlock } from "../components/blocks";

const DUMMY_BLOCKS: Block[] = [
  // { x: 0, y: 0, type: "i" },
  // { x: 1, y: 0, type: "o" },
  // { x: 3, y: 0, type: "s" },
  // { x: 6, y: 0, type: "z" },
  // { x: 1, y: 2, type: "j" },
  // { x: 4, y: 2, type: "l" },
  // { x: 7, y: 2, type: "t" },
];

const useBlocks = (boardWidth: number, boardHeight: number) => {
  const [blocks] = useState(DUMMY_BLOCKS);
  const [fallingBlock, setFallingBlock] = useState<Block | null>(null);

  const nextStep = () => {
    setFallingBlock(getNextBlock(fallingBlock, boardWidth, boardHeight));
  };

  return {
    blocks,
    fallingBlock,
    nextStep,
  };
};

export default useBlocks;
