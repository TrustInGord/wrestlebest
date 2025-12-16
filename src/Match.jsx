import { roster } from './Wrestler.jsx';

function getTotalStats(wrestler) {
  return wrestler.strength + wrestler.stamina + wrestler.agility + 
         wrestler.charisma + wrestler.grapple + wrestler.aerial - wrestler.fatigue;
}

// Total the stats and determine winner via random weighted by stats, have multiple matches.
function simulateMatch(wrestler1, wrestler2) {
  const total1 = getTotalStats(wrestler1);
  const total2 = getTotalStats(wrestler2);
  const totalStats = total1 + total2;
  
  const chance1 = total1 / totalStats;
  const random = Math.random();
  
  return random < chance1 ? wrestler1 : wrestler2;
}

function faceOff(wrestler1, wrestler2) {
  const results = [];
  let wins1 = 0, wins2 = 0;
  
  for (let i = 0; i < 5; i++) {
    const winner = simulateMatch(wrestler1, wrestler2);
    results.push(winner);
    if (winner === wrestler1) wins1++;
    else wins2++;
  }
  
  const victor = wins1 > wins2 ? wrestler1 : wrestler2;
  const score = wins1 > wins2 ? `${wins1}-${wins2}` : `${wins2}-${wins1}`;
  
  return { victor, score, results };
}

// Example match
const match = faceOff(roster[0], roster[1]);
console.log(`${match.victor.name} wins ${match.score}`);

export { faceOff, getTotalStats };