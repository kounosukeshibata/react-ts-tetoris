import { useState } from "react";
import {
  Block,
  getNextBlock,
  type MoveType,
  moveBlock,
} from "../components/blocks";

const useBlocks = (boardWidth: number, boardHeight: number) => {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [fallingBlock, setFallingBlock] = useState<Block | null>(null);

  // 各ステップの新しいブロックの状態をsetする
  const nextStep = () => {
    const movedBlock = getNextBlock(
      fallingBlock,
      boardWidth,
      boardHeight,
      blocks,
    );
    if (movedBlock === null) {
      setBlocks([...blocks, fallingBlock as Block]);
    }
    setFallingBlock(movedBlock);
  };

  const move = (m: MoveType) => {
    if (fallingBlock === null) {
      return;
    }
    setFallingBlock(
      moveBlock(fallingBlock, m, boardWidth, blocks) || fallingBlock,
    );
  };

  return {
    blocks,
    fallingBlock,
    nextStep,
    move,
  };
};

export default useBlocks;
