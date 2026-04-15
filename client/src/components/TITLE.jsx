function TITLE({ score, level, bestScore }) {
  return (
    <div className="header">
      <h1>JUST DIVIDE</h1>
      <p>Divide numbers to solve the grid</p>

      <div className="badges">
        <div className="badge">Level {level}</div>
        <div className="badge">Score {score}</div>
        <div className="badge">Best {bestScore}</div>
      </div>
    </div>
  );
}

export default TITLE;