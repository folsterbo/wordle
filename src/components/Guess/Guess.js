import React from 'react';
import { range } from '../../utils';

function Guess({ value, letterStatuses }) {
  return (
    <p className="guess">
      {range(5).map((num) => (
        <span
          key={num}
          className={
            letterStatuses ? letterStatuses[num] + ' cell' : 'cell'
          }>
          {value ? value[num] : undefined}
        </span>
      ))}
    </p>
  );
}

export default Guess;
