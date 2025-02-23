import GameOver from "./GameOver.js";
import useBlocks from "../hooks/useBlocks.js";
import { COLOR_NAME, getTiles } from "./blocks/index.js";
import Tile from "./Tile.js";
import "../App.css";
import useKeyHandler from "../hooks/useKeyHandler.js";
import useTimer from "../hooks/useTimer.js";
import ControlPanel from "./ControlPanel.js";
import { useState, useEffect } from "react";
import Score from "./Score.js";

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;

function Board() {
  const { tiles, fallingBlock, isGameOvered, nextStep, move, fall, score } =
    useBlocks(BOARD_WIDTH, BOARD_HEIGHT);

  const [isMobile, setIsMobile] = useState(false);

  // 画面サイズのチェック
  const updateMedia = () => {
    setIsMobile(window.innerWidth <= 1024);
  };

  useEffect(() => {
    updateMedia(); // 初期値を設定
    window.addEventListener("resize", updateMedia); // リサイズイベントリスナーを追加
    return () => window.removeEventListener("resize", updateMedia); // クリーンアップ
  }, []);

  useTimer(nextStep);

  const tilesOnBoard = [
    ...tiles,
    ...(fallingBlock === null ? [] : getTiles(fallingBlock)),
  ];

  const createTile = (x: number, y: number) => {
    const blockType = tilesOnBoard.find(
      (tile) => tile.x === x && tile.y === y,
    )?.type;
    const classNames = [blockType ? COLOR_NAME[blockType] : ""];

    return <Tile key={x + BOARD_HEIGHT * y} classNames={classNames} />;
  };

  // 行を作成
  const createLine = (j: number) =>
    [...Array(BOARD_WIDTH).keys()].map((i) => createTile(i, j));

  // 列を作成
  const lines = [...Array(BOARD_HEIGHT).keys()].map((j) => (
    <div className="TileLine" key={j}>
      {createLine(j)}
    </div>
  ));

  useKeyHandler(nextStep, move, fall);

  return (
    <div className="Board-wrapper">
      <div className="Board">
        {isGameOvered ? <GameOver score={score} /> : null}
        <Score score={score} />
        <div className="lines-container">{lines}</div>
      </div>
      {isMobile && <ControlPanel nextStep={nextStep} move={move} fall={fall} />}
    </div>
  );
}

export default Board;
