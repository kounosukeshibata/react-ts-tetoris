import useBlocks from "../hooks/useBlocks";
import { COLOR_NAME, findBlock } from "./blocks";
import Tile from "./Tile";
import "../App.css";
import { useEffect } from "react";
import useTimer from "../hooks/useTimer";

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;

function Board() {
  const { blocks, fallingBlock, nextStep, move } = useBlocks(
    BOARD_WIDTH,
    BOARD_HEIGHT,
  );

  useTimer(nextStep);

  const blocksOnBoard = [
    ...blocks,
    ...(fallingBlock === null ? [] : [fallingBlock]),
  ];
  const createTile = (x: number, y: number) => {
    const block = findBlock(blocksOnBoard, x, y);

    const classNames = [block ? COLOR_NAME[block.type] : ""];
    // return <Tile key={y + BOARD_WIDTH * x} classNames={classNames} n={x} />;
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

  // キーボード操作のたびにブロック移動を実行する副作用
  useEffect(() => {
    // const intervalId = setInterval(nextStep, 1000);
    // window.addEventListener("keydown", nextStep);
    const keyEventHandler = (e: KeyboardEvent) => {
      e.preventDefault();
      switch (e.key) {
        case "ArrowLeft":
        case "h":
          move("left");
          break;
        case "ArrowRight":
        case "l":
          move("right");
          break;
        case "ArrowUp":
        case "k":
          move("turn");
          break;
        case " ":
        case "ArrowDown":
        case "j":
          nextStep();
          break;
      }
    };
    window.addEventListener("keydown", keyEventHandler);

    return () => {
      // clearInterval(intervalId);
      // window.removeEventListener("keydown", nextStep);
      window.removeEventListener("keydown", keyEventHandler);
    };
  });

  return (
    <div className="Board">
      <div className="lines-container">{lines}</div>
    </div>
  );
}

export default Board;
