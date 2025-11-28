import { useState } from 'react';
import { roster } from './Wrestler.jsx';
import { faceOff, getTotalStats } from './Match.jsx';
import './Card.css';

function Card({ score, setScore, day, setDay }) {
  const [selections, setSelections] = useState({});
  const [showResults, setShowResults] = useState(false);
  
  const [card] = useState(() => {
    const availableWrestlers = [...roster];
    const matches = [];
    
    // Shuffle wrestlers
    for (let i = availableWrestlers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [availableWrestlers[i], availableWrestlers[j]] = [availableWrestlers[j], availableWrestlers[i]];
    }
    
    // Create matches, leaving 2 wrestlers without matches
    for (let i = 0; i < availableWrestlers.length - 2; i += 2) {
      const wrestler1 = availableWrestlers[i];
      const wrestler2 = availableWrestlers[i + 1];
      const total1 = getTotalStats(wrestler1);
      const total2 = getTotalStats(wrestler2);
      const totalStats = total1 + total2;
      const odds1 = ((total1 / totalStats) * 100).toFixed(1);
      const odds2 = ((total2 / totalStats) * 100).toFixed(1);
      const result = faceOff(wrestler1, wrestler2);
      matches.push({
        wrestler1,
        wrestler2,
        odds1,
        odds2,
        result
      });
    }
    
    return {
      matches,
      unmatched: availableWrestlers.slice(-2)
    };
  });

  return (
    <div>
      <h2>Tonight's Card</h2>
      <div className="card-container">
        {card.matches.map((match, index) => {
          const isFirst = index === 0;
          const isLast = index === card.matches.length - 1;
          const title = isFirst ? 'Opening Match' : isLast ? 'Main Event' : `Match ${index + 1}`;



          return (
            <div key={index} className="match-card">
              <h3>{title}</h3>
              <p>{match.wrestler1.name} ({match.odds1}%) vs {match.wrestler2.name} ({match.odds2}%)</p>
              {showResults && <p><strong>Winner: {match.result.victor.name}</strong></p>}
            </div>
          );
        })}
      </div>
      <div className="picks-section">
        <h3>Make Your Picks</h3>
        {card.matches.map((match, index) => {
          const isFirst = index === 0;
          const isLast = index === card.matches.length - 1;
          const title = isFirst ? 'Opening Match' : isLast ? 'Main Event' : `Match ${index + 1}`;
          
          return (
            <div key={index} className="pick-row">
              <div className="pick-left">
                <span className="wrestler-name">{match.wrestler1.name}</span>
                <button 
                  onClick={() => setSelections(prev => ({ ...prev, [index]: match.wrestler1 }))}
                  className={`pick-button ${selections[index] === match.wrestler1 ? 'selected' : ''}`}
                >
                  {selections[index] === match.wrestler1 ? '✓' : 'Pick'}
                </button>
              </div>
              <strong className="match-title">{title}</strong>
              <div className="pick-right">
                <button 
                  onClick={() => setSelections(prev => ({ ...prev, [index]: match.wrestler2 }))}
                  className={`pick-button ${selections[index] === match.wrestler2 ? 'selected' : ''}`}
                >
                  {selections[index] === match.wrestler2 ? '✓' : 'Pick'}
                </button>
                <span className="wrestler-name">{match.wrestler2.name}</span>
              </div>
            </div>
          );
        })}
        {Object.keys(selections).length === card.matches.length && !showResults && (
          <button 
            onClick={() => {
              setShowResults(true);
              let correctPicks = 0;
              Object.entries(selections).forEach(([matchIndex, selectedWrestler]) => {
                if (selectedWrestler === card.matches[matchIndex].result.victor) {
                  correctPicks++;
                }
              });
              setScore(score + correctPicks);
            }}
            className="confirm-button"
          >
            Confirm All Picks ({Object.keys(selections).length}/{card.matches.length})
          </button>
        )}
        {showResults && (
          <div className="results-section">
            <h3>Results</h3>
            <p>You got {Object.entries(selections).filter(([matchIndex, selectedWrestler]) => 
              selectedWrestler === card.matches[matchIndex].result.victor
            ).length} out of {card.matches.length} correct!</p>
            <button 
              onClick={() => {
                setDay(day + 1);
                setSelections({});
                setShowResults(false);
              }}
              className="confirm-button"
            >
              Next Day
            </button>
          </div>
        )}
        {Object.keys(selections).length < card.matches.length && (
          <p className="progress-text">
            Pick winners for all matches ({Object.keys(selections).length}/{card.matches.length})
          </p>
        )}
      </div>
      <div className="not-competing">
        <h3>Not Competing Tonight</h3>
        {card.unmatched.map((wrestler, index) => (
          <p key={index}>{wrestler.name}</p>
        ))}
      </div>
    </div>
  );
}

export default Card;