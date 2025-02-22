import Board from "./Board";
import ExplanationPanel from "./ExplanationPanel";

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
