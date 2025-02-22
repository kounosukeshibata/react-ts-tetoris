const Score = ({ score }: { score: number }) => {
  return (
    <div className="score-board">
      <div className="score-count">Score：{score}</div>
    </div>
  );
};

export default Score;
