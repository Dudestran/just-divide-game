import { useEffect, useState } from 'react'
import TITLE from './components/TITLE'
import Grid from './components/Grid'
import Sidebar from './components/Sidebar'
import "./styles/Func.css"

function App() {
  const [bestScore, setBestScore] = useState(
  Number(localStorage.getItem("bestScore")) || 0
);
  const [undoStack, setUndoStack] = useState([]);
  const [keep, setKeep] = useState(null);
  const [trashCount, setTrashCount] = useState(3);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [grid, setGrid] = useState(Array(16).fill(null));

  const [queue, setQueue] = useState([2, 4, 8]);

  const [activeTile, setActiveTile] = useState(null);

  const isGameOver = () => {
  // if empty cell exists → not over
  if (grid.includes(null)) return false;

  // check possible merges
  for (let i = 0; i < 16; i++) {
    const val = grid[i];

    const neighbors = [];

    if (i - 4 >= 0) neighbors.push(grid[i - 4]);
    if (i + 4 < 16) neighbors.push(grid[i + 4]);
    if (i % 4 !== 0) neighbors.push(grid[i - 1]);
    if (i % 4 !== 3) neighbors.push(grid[i + 1]);

    for (let n of neighbors) {
      if (n === null) continue;

      if (val === n) return false;

      const larger = Math.max(val, n);
      const smaller = Math.min(val, n);

      if (larger % smaller === 0) return false;
    }
  }

  return true;
};

  const generateTile = () => {
    const values = [2, 3, 4, 6, 8, 9, 12];
    return values[Math.floor(Math.random() * values.length)];
  };
  useEffect(() => {
    setLevel(Math.floor(score / 10) + 1);
  }, [score]);

  useEffect(() => {
  if (isGameOver()) {
    alert("Game Over!");
  }
}, [grid]);

useEffect(() => {
  if (score > bestScore) {
    setBestScore(score);
    localStorage.setItem("bestScore", score);
  }
}, [score]);
  return (
    <div className="game-container">
      <TITLE score={score} level={level} />

      <div className="game-body">
        <Grid
          grid={grid}
          setGrid={setGrid}
          activeTile={activeTile}
          setActiveTile={setActiveTile}
          queue={queue}
          setQueue={setQueue}
          score={score}
          setScore={setScore}
        />


        <Sidebar
          queue={queue}
          setActiveTile={setActiveTile}
          activeTile={activeTile}
          keep={keep}
          setKeep={setKeep}
          trashCount={trashCount}
          setTrashCount={setTrashCount} />
          
          
      </div>
    </div>
  );
}

export default App;