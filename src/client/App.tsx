import "./App.css";
import Container from "./components/Container";
import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <h2>Tetoris-Game</h2>
      <Container />
    </div>
  );
}

export default App;
