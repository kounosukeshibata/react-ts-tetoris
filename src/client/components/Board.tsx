import useBlocks from "../hooks/useBlocks";
import { COLOR_NAME, findBlock } from "./blocks";
import Tile from "./Tile";
import "../App.css";

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;

function Board() {
  const { blocks } = useBlocks();
  const createTile = (x: number, y: number) => {
    const block = findBlock(blocks, x, y);
    const classNames = [block ? COLOR_NAME[block.type] : ""];
    // return <Tile key={y + BOARD_WIDTH * x} classNames={classNames} n={x} />;
    return <Tile key={x + BOARD_WIDTH * y} classNames={classNames} />;
  };

  // 行を作成
  const createLine = (j: number) =>
    [...Array(BOARD_WIDTH).keys()].map((i) => createTile(i, j));
  console.log(createLine);

  // 列を作成
  const lines = [...Array(BOARD_HEIGHT).keys()].map((j) => (
    <div className="TileLine" key={j}>
      {createLine(j)}
    </div>
  ));

  return <div className="Board lines-container">{lines}</div>;
}

export default Board;
