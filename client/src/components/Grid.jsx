import { tryMerge } from "../utils/mergeLogic";
function Grid({ grid, setGrid, activeTile, setActiveTile, queue, setQueue, setScore }) {

  const generateTile = () => {
    const values = [2, 3, 4, 6, 8, 9, 12];
    return values[Math.floor(Math.random() * values.length)];
  };

  const handleDrop = (index) => {
  if (grid[index] !== null || activeTile === null) return;

  let tempGrid = [...grid];
  tempGrid[index] = activeTile;

  const result = resolveMerges(tempGrid);
  

  setGrid(result.newGrid); 
  setScore(prev => prev + result.points);

  setActiveTile(null);

  setQueue(prev => [...prev.slice(1), generateTile()]);
};

const getNeighbors = (index) => {
  const neighbors = [];

  if (index - 4 >= 0) neighbors.push(index - 4); // up
  if (index + 4 < 16) neighbors.push(index + 4); // down

  if (index % 4 !== 0) neighbors.push(index - 1); // left
  if (index % 4 !== 3) neighbors.push(index + 1); // right

  return neighbors;
};

const resolveMerges = (initialGrid) => {
  let grid = [...initialGrid];
  let totalPoints = 0;

  const getNeighbors = (index) => {
    const neighbors = [];

    if (index - 4 >= 0) neighbors.push(index - 4);
    if (index + 4 < 16) neighbors.push(index + 4);
    if (index % 4 !== 0) neighbors.push(index - 1);
    if (index % 4 !== 3) neighbors.push(index + 1);

    return neighbors;
  };

  let foundMerge = true;

  while (foundMerge) {
    foundMerge = false;

    for (let i = 0; i < 16; i++) {
      if (grid[i] === null) continue;

      const neighbors = getNeighbors(i);

      for (let n of neighbors) {
        if (grid[n] === null) continue;

        const result = tryMerge(grid[i], grid[n]);

        if (result !== undefined) {
          foundMerge = true;

          const newGrid = [...grid];

          if (result === null) {
            totalPoints += grid[i];
            newGrid[i] = null;
            newGrid[n] = null;
          } else {
            const largerIndex = grid[i] > grid[n] ? i : n;
            const smallerIndex = grid[i] > grid[n] ? n : i;

            totalPoints += result;

            newGrid[largerIndex] = result;
            newGrid[smallerIndex] = null;
          }

          grid = newGrid;

          break; 
        }
      }

      if (foundMerge) break; 
    }
  }

  return { newGrid: grid, points: totalPoints };
};
  return (
    <div className="grid">
      {grid.map((val, index) => (
        <div
          key={index}
          className="cell"
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => handleDrop(index)}
        >
          {val && <div className="tile">{val}</div>}
        </div>
      ))}
    </div>
  );
}
export default Grid;