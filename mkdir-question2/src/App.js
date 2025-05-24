import React, { useState } from 'react';

function calculateAverage(numbers) {
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((acc, val) => acc + val, 0);
  return sum / numbers.length;
}

function App() {
  const [input, setInput] = useState('');
  const [average, setAverage] = useState(null);
  const [error, setError] = useState('');

  const handleCalculate = (e) => {
    e.preventDefault();
    setError('');
    const values = input
      .split(/[\s,]+/)
      .filter((v) => v.length > 0)
      .map((v) => Number(v));

    if (values.some(isNaN)) {
      setAverage(null);
      setError('Please enter valid numbers separated by commas or spaces.');
      return;
    }

    const avg = calculateAverage(values);
    setAverage(avg);
  };

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto', fontFamily: 'Arial, sans-serif' }}>
      <h1>Average Calculator</h1>
      <form onSubmit={handleCalculate}>
        <label htmlFor="numbersInput">Enter numbers separated by commas or spaces:</label>
        <input
          id="numbersInput"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem', marginBottom: '0.5rem' }}
          placeholder="e.g. 1, 2, 3, 4"
          aria-describedby="error-message"
        />
        <button type="submit" style={{ padding: '0.5rem 1rem' }}>Calculate</button>
      </form>
      {error && <p id="error-message" style={{ color: 'red' }}>{error}</p>}
      {average !== null && !error && (
        <p>Average: <strong>{average}</strong></p>
      )}
    </div>
  );
}

export default App;
