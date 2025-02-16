import Tile from "./Tile";

function Board() {
  const createLine = (i: number) =>
    [...Array(10).keys()].map((j) => <Tile key={j + 10 * i} />);
  console.log(createLine);

  const lines = [...Array(20).keys()].map((i) => (
    <div className="TileLine" key={i}>
      {createLine(i)}
    </div>
  ));

  return <div>{lines}</div>;
}

export default Board;
