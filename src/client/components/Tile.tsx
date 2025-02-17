function Tile(props: { classNames?: string[]; n?: number }) {
  const classNames = ["Tile", ...(props.classNames || [])].join(" ");

  const n = props.n;
  return <div className={classNames}>{n}</div>;
}

export default Tile;
