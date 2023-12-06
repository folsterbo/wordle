import React from 'react';
import GuessInput from '../GuessInput';
import GuessAttempt from '../GuessAttempt';
import { sample } from '../../utils';
import { WORDS } from '../../data';
import { checkGuess } from '../../game-helpers';
import { NUM_OF_GUESSES_ALLOWED, ALPHABET } from '../../constants';

// Pick a random word on every pageload.
const answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.
console.info({ answer });
const initialAlphabet = ALPHABET.map((letter) => ({
  letter,
  status: undefined,
}));

function Game() {
  const [items, setItems] = React.useState([]);
  const [isGameOver, setGameOver] = React.useState(false);
  const [isGameWon, setGameWon] = React.useState(false);
  const [wordStatuses, setWordStatuses] = React.useState([]);

  const [alphabet, setAlphabet] = React.useState(initialAlphabet);

  function handleAddItem(item) {
    console.log(item, answer);
    console.log(items.length);
    const newItems = [...items, item];
    setItems(newItems);
    const newWordStatuses = checkGuess(item, answer).map(
      (item) => item.status
    );
    setWordStatuses([...wordStatuses, newWordStatuses]);

    const newAlphabet = alphabet.map((item1) => {
      const matchingItem = checkGuess(item, answer).find(
        (item2) => item2.letter === item1.letter
      );
      if (matchingItem) {
        return { ...item1, status: matchingItem.status };
      }
      return item1;
    });
    console.log(newAlphabet);
    setAlphabet(newAlphabet);

    if (item === answer) {
      setGameWon(true);
    } else if (newItems.length === NUM_OF_GUESSES_ALLOWED) {
      setGameOver(true);
    }
  }
  return (
    <>
      <div className="guess-results">
        <GuessAttempt items={items} wordStatuses={wordStatuses} />
      </div>
      <div className="alphabet">
        {alphabet.map((item, index) => (
          <div
            className={
              item.status ? item.status + ' letter' : 'letter'
            }
            key={index}>
            {item.letter}
          </div>
        ))}
      </div>
      {!isGameWon && !isGameOver && (
        <GuessInput handleAddItem={handleAddItem} />
      )}
      {isGameWon && (
        <div className="happy banner">
          <p>
            <strong>Congratulations!</strong> Got it in{' '}
            <strong>
              {items.length === 1
                ? '1 guess'
                : `${items.length} guesses`}
            </strong>
            .
          </p>
          <form>
            <button>Restart game</button>
          </form>
        </div>
      )}
      {isGameOver && (
        <div className="sad banner">
          <p>
            Sorry, the correct answer is <strong>{answer}</strong>.
          </p>
          <form>
            <button>Restart game</button>
          </form>
        </div>
      )}
    </>
  );
}

export default Game;
