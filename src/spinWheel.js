import React, { useState } from 'react';

const WheelSegment = ({ color, text }) => (
  <div className="wheel-segment" style={{ backgroundColor: color }}>
    {text}
  </div>
);

const SpinButton = ({ onClick }) => (
  <button className="spin-button" onClick={onClick}>
   Tap to Spin 
  </button>
);

const App = () => {
  const [numPlayers, setNumPlayers] = useState(0);
  const [playerLeft, setPlayerLeft] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [segments, setSegments] = useState([]);
  const [selectedSegment, setSelectedSegment] = useState(null);

  const handleSpin = () => {
    if (!spinning && segments.length > 0) {
      setSpinning(true);
      const randomIndex = Math.floor(Math.random() * segments.length);
      const selectedPlayer = segments[randomIndex];
      setSelectedSegment(selectedPlayer.name);
			setNumPlayers(numPlayers + 1);
      
      setTimeout(() => {
        setSpinning(false);
        setPlayerLeft(prevNumPlayers => prevNumPlayers + 1);
        setSegments(prevSegments => prevSegments.filter(segment => segment !== selectedPlayer));
      }, 1500); // Simulating a spinning animation for 3 seconds
    }
  };

  const handleAddPlayer = playerName => {
    if (segments.length < numPlayers) {
      setSegments(prevSegments => [
        ...prevSegments,
        {
          name: playerName,
          color: generateRandomColor(),
        },
      ]);
  
      setPlayerLeft(prevNumPlayers => prevNumPlayers - 1);
    }
  };

  const generateRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = 'black';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <div className="app">
			<div>
          <input
            type="number"
            placeholder="Enter the number of players"
            onChange={e => setNumPlayers(e.target.value)}
          />
          <button onClick={() => {setNumPlayers(Number(numPlayers)); setPlayerLeft(Number(numPlayers))}}>Set Players</button>
        </div>
				{`Players left ${playerLeft}`}
        <PlayerInput onAddPlayer={handleAddPlayer} />
        <>
          <div className={`wheel ${spinning ? 'spinning' : ''}`}>
            {segments.map((segment, index) => (
              <WheelSegment key={index} color={segment.color} text={segment.name} />
            ))}
          </div>
          <SpinButton onClick={handleSpin} />
          {selectedSegment && (
            <div className="result">
              <p>{`Selected: ${selectedSegment}`}</p>
            </div>
          )}
        </>
      {/* )} */}
    </div>
  );
};

const PlayerInput = ({ onAddPlayer }) => {
  const [playerName, setPlayerName] = useState('');

  const handleAddPlayer = () => {
    if (playerName.trim() !== '') {
      onAddPlayer(playerName);
      setPlayerName('');
    }
  };

  return (
    <div className="player-input">
      <input
        type="text"
        placeholder="Enter Topic's name"
        value={playerName}
        onChange={e => setPlayerName(e.target.value)}
      />
      <button onClick={handleAddPlayer}>Add Topic</button>
    </div>
  );
};

export default App;


