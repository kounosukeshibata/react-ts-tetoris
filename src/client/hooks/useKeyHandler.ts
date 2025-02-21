import { useEffect, useRef } from "react";
import { MoveType } from "../components/blocks";

const useKeyHandler = (nextStep: () => void, move: (m: MoveType) => void) => {
  const refNextStep = useRef(nextStep);
  const refMove = useRef(move);
  useEffect(() => {
    refNextStep.current = nextStep;
  }, [nextStep]);
  useEffect(() => {
    refMove.current = move;
  }, [move]);

  // キーボード操作のたびにブロック移動を実行する副作用
  useEffect(() => {
    // const intervalId = setInterval(nextStep, 1000);
    // window.addEventListener("keydown", nextStep);
    const keyEventHandler = (e: KeyboardEvent) => {
      e.preventDefault();
      switch (e.key) {
        case "ArrowLeft":
        case "h":
          refMove.current("left");
          break;
        case "ArrowRight":
        case "l":
          refMove.current("right");
          break;
        case "ArrowUp":
        case "k":
          refMove.current("turn");
          break;
        case " ":
        case "ArrowDown":
        case "j":
          refNextStep.current();
          break;
      }
    };
    window.addEventListener("keydown", keyEventHandler);

    return () => {
      window.removeEventListener("keydown", keyEventHandler);
    };
  }, []);
};

export default useKeyHandler;
