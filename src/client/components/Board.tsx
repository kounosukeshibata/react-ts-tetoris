import useBlocks from "../hooks/useBlocks";
import { COLOR_NAME, getTiles } from "./blocks";
import Tile from "./Tile";
import "../App.css";
import useKeyHandler from "../hooks/useKeyHandler";
import useTimer from "../hooks/useTimer";

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;

function Board() {
  const { tiles, fallingBlock, nextStep, move, fall } = useBlocks(
    BOARD_WIDTH,
    BOARD_HEIGHT,
  );

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
    <div className="Board">
      <div className="lines-container">{lines}</div>
    </div>
  );
}

export default Board;
