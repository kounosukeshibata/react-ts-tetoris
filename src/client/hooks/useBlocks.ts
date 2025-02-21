import { useState } from "react";
import {
  Block,
  getNextBlock,
  type MoveType,
  moveBlock,
  getCompletedRows,
  deleteRows,
  Tile,
  getTiles,
} from "../components/blocks";

const useBlocks = (boardWidth: number, boardHeight: number) => {
  const [tiles, setTiles] = useState<Tile[]>([]);
  const [fallingBlock, setFallingBlock] = useState<Block | null>(null);

  // 各ステップでブロックが動いた直後の新しいブロックの状態をsetする
  const nextStep = () => {
    const movedBlock = getNextBlock(
      fallingBlock,
      boardWidth,
      boardHeight,
      tiles,
    );

    // あるステップでブロックがまだ動いている状態の制御
    if (movedBlock === null && fallingBlock != null) {
      let nextTiles = [...tiles, ...getTiles(fallingBlock)];
      // 行が全て揃った場合に行削除を行いtilesステートをsetする
      const completedRows = getCompletedRows(nextTiles, boardWidth);
      if (completedRows.length) {
        nextTiles = deleteRows(nextTiles, completedRows);
      }
      setTiles(nextTiles);
    }
    setFallingBlock(movedBlock);
  };

  const move = (m: MoveType) => {
    if (fallingBlock === null) {
      return;
    }
    setFallingBlock(
      moveBlock(fallingBlock, m, boardWidth, tiles) || fallingBlock,
    );
  };

  return {
    tiles,
    fallingBlock,
    nextStep,
    move,
  };
};

export default useBlocks;
