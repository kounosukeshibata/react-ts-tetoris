import Tile from "./Tile";

function Board() {
  // 行を作成
  const createLine = (i: number) =>
    [...Array(10).keys()].map((j) => <Tile key={j + 10 * i} />);
  console.log(createLine);

  // 列を作成
  const lines = [...Array(20).keys()].map((i) => (
    <div className="TileLine" key={i}>
      {createLine(i)}
    </div>
  ));

  return <div className="Board lines-container">{lines}</div>;
}

export default Board;
