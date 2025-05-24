import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App, { calculateAverage } from './App';

describe('calculateAverage function', () => {
  test('returns 0 for empty array', () => {
    expect(calculateAverage([])).toBe(0);
  });

  test('calculates average correctly for positive numbers', () => {
    expect(calculateAverage([1, 2, 3, 4])).toBe(2.5);
  });

  test('calculates average correctly for negative numbers', () => {
    expect(calculateAverage([-1, -2, -3, -4])).toBe(-2.5);
  });

  test('calculates average correctly for mixed numbers', () => {
    expect(calculateAverage([-1, 0, 1])).toBe(0);
  });
});

describe('App component', () => {
  test('renders input and button', () => {
    render(<App />);
    expect(screen.getByLabelText(/enter numbers/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /calculate/i })).toBeInTheDocument();
  });

  test('shows error message for invalid input', () => {
    render(<App />);
    const input = screen.getByLabelText(/enter numbers/i);
    const button = screen.getByRole('button', { name: /calculate/i });

    fireEvent.change(input, { target: { value: '1, 2, a' } });
    fireEvent.click(button);

    expect(screen.getByText(/please enter valid numbers/i)).toBeInTheDocument();
  });

  test('calculates and displays average for valid input', () => {
    render(<App />);
    const input = screen.getByLabelText(/enter numbers/i);
    const button = screen.getByRole('button', { name: /calculate/i });

    fireEvent.change(input, { target: { value: '1, 2, 3, 4' } });
    fireEvent.click(button);

    expect(screen.getByText(/average:/i)).toHaveTextContent('Average: 2.5');
  });

  test('clears error message on valid input after invalid input', () => {
    render(<App />);
    const input = screen.getByLabelText(/enter numbers/i);
    const button = screen.getByRole('button', { name: /calculate/i });

    fireEvent.change(input, { target: { value: '1, 2, a' } });
    fireEvent.click(button);
    expect(screen.getByText(/please enter valid numbers/i)).toBeInTheDocument();

    fireEvent.change(input, { target: { value: '1, 2, 3' } });
    fireEvent.click(button);
    expect(screen.queryByText(/please enter valid numbers/i)).toBeNull();
    expect(screen.getByText(/average:/i)).toHaveTextContent('Average: 2');
  });
});
