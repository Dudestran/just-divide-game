function Sidebar({ 
    queue, 
    setQueue,
  setActiveTile, 
  activeTile,
  keep, 
  setKeep,
  trashCount,
  setTrashCount
}) {

  const handleDragStart = (value, index) => {
    if (index !== 0) return;
    setActiveTile(value);
  };

  const generateTile = () => {
  const values = [2, 3, 4, 6, 8, 9, 12];
  return values[Math.floor(Math.random() * values.length)];
};


  const handleKeep = () => {
    if (activeTile === null) return;

    if (keep === null) {
      setKeep(activeTile);
      setActiveTile(null);
    } else {
      const temp = keep;
      setKeep(activeTile);
      setActiveTile(temp);
    }
  };

 
  const handleTrash = () => {
  if (trashCount <= 0) return;

  setQueue(prev => {
    const updated = [...prev.slice(1), generateTile()];
    console.log("New queue:", updated); 
    return updated;
  });

  setTrashCount(prev => prev - 1);
};

  return (
    <div className="right-panel">

      {/* KEEP */}
      <div className="keep" onClick={handleKeep}>
        {keep ? <div className="tile">{keep}</div> : "KEEP"}
      </div>

      {/* QUEUE */}
      <div className="queue">
        {queue.map((val, i) => (
          <div
            key={i}
            className={`tile ${i === 0 ? "active" : "disabled"}`}
            draggable={i === 0}
            onDragStart={() => handleDragStart(val, i)}
               onClick={() => handleSelectTile(val, i)} // 
          >
            {val}
          </div>
        ))}
      </div>

      {/* TRASH */}
      <div className="trash" onClick={handleTrash}>
  TRASH_
  <br />
  <span>{trashCount} </span>
</div>

    </div>
  );
}


export default Sidebar
