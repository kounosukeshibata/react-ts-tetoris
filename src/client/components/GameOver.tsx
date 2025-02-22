import { useMemo } from "react";

function GameOver({ score }: { score: number }) {
  const text = useMemo(
    () =>
      ["GAME", "OVER"]
        .map((item, index1) =>
          item
            .split("")
            .map((t, index2) => <span key={index1 * 100 + index2}>{t}</span>),
        )
        .reduce((prev, cur, index) =>
          (prev.length > 0 ? [...prev, <br key={10000 + index} />] : []).concat(
            [...cur],
          ),
        ),
    [],
  );

  console.log("ゲームオーバー");
  return (
    <div className="GameOver">
      <div className="score-gameover">score：{score}</div>
      <div className="title-text">{text}</div>
    </div>
  );
}

export default GameOver;
