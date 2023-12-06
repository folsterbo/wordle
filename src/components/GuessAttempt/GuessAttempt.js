import React from 'react';
import { range } from '../../utils';
import { NUM_OF_GUESSES_ALLOWED } from '../../constants';
import Guess from '../Guess';

function GuessAttempt({ items, wordStatuses }) {
  return (
    <div className="guess-results">
      {range(NUM_OF_GUESSES_ALLOWED).map((num) => (
        <Guess
          key={num}
          value={items[num]}
          letterStatuses={wordStatuses[num]}
        />
      ))}
    </div>
  );
}

export default GuessAttempt;
