import { useState } from 'react';
import { roster } from './Wrestler.jsx';

function Bio() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const wrestler = roster[currentIndex];

  const nextWrestler = () => {
    setCurrentIndex((prev) => (prev + 1) % roster.length);
  };

  const prevWrestler = () => {
    setCurrentIndex((prev) => (prev - 1 + roster.length) % roster.length);
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', margin: '20px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <button onClick={prevWrestler}>← Previous</button>
        <h2>{wrestler.name}</h2>
        <button onClick={nextWrestler}>Next →</button>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div>
          <p><strong>Hometown:</strong> {wrestler.hometown}</p>
          <p><strong>Gender:</strong> {wrestler.gender}</p>
        </div>
        
        <div>
          <h3>Stats</h3>
          <p><strong>Strength:</strong> {wrestler.strength}</p>
          <p><strong>Stamina:</strong> {wrestler.stamina}</p>
          <p><strong>Agility:</strong> {wrestler.agility}</p>
          <p><strong>Charisma:</strong> {wrestler.charisma}</p>
          <p><strong>Grapple:</strong> {wrestler.grapple}</p>
          <p><strong>Aerial:</strong> {wrestler.aerial}</p>
          <p><strong>Fatigue:</strong> {wrestler.fatigue}</p>
        </div>
      </div>
      
      <p style={{ textAlign: 'center', marginTop: '10px', color: '#666' }}>
        {currentIndex + 1} of {roster.length}
      </p>
    </div>
  );
}

export default Bio;