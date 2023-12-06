import React from 'react';

function GuessInput({ handleAddItem }) {
  const [guess, setGuess] = React.useState('');
  return (
    <div>
      <form
        className="guess-input-wrapper"
        onSubmit={(event) => {
          event.preventDefault();
          handleAddItem(guess);
          setGuess('');
        }}>
        <label htmlFor="guess-input">Enter guess:</label>
        <input
          required
          minLength={5}
          maxLength={5}
          id="guess-input"
          type="text"
          value={guess}
          onChange={(event) => {
            const nextGuess = event.target.value.toUpperCase();
            setGuess(nextGuess);
          }}
          pattern="[a-zA-Z]{5}"
          title="5 letter word"
        />
      </form>
    </div>
  );
}

export default GuessInput;
