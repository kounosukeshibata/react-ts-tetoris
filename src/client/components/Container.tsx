import Board from "./Board.js";
import ExplanationPanel from "./ExplanationPanel.js";

const Container = () => {
  return (
    <div className="container">
      <div className="title-name">Tetoris</div>
      <div className="main-container">
        <div className="main-container-wrapper">
          <ExplanationPanel />
          <Board />
        </div>
      </div>
    </div>
  );
};

export default Container;
