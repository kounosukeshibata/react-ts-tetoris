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
  const [isGameOvered, setIsGameOvered] = useState(false);

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

    const maxY = tiles.length > 0 ? Math.min(...tiles.map(({ y }) => y)) : 20;
    if (movedBlock !== null && maxY <= 0) {
      setIsGameOvered(true);
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

  // 最下層までブロックを落とす
  const fall = () => {
    if (fallingBlock === null) {
      return;
    }

    // 最下層に到達するまで繰り返し更新する
    let currentBlock = { ...fallingBlock };

    for (let i = 0; i < boardHeight; i++) {
      const movedBlock = getNextBlock(
        currentBlock,
        boardWidth,
        boardHeight,
        tiles,
      );

      if (!movedBlock) {
        break;
      }

      currentBlock = movedBlock;
    }
    setFallingBlock(currentBlock);
  };

  return {
    tiles,
    fallingBlock,
    isGameOvered,
    nextStep,
    move,
    fall,
  };
};

export default useBlocks;
