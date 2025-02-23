import { useEffect, useRef } from "react";
import * as timer from "../components/timer/index.js";

const useTimer = (callback: () => void) => {
  const refNextStep = useRef(callback);

  useEffect(() => {
    refNextStep.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = () => refNextStep.current();
    timer.start(tick);
    return () => timer.stop();
  }, []);
};

export default useTimer;
