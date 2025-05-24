import React from 'react';

const STOCKS = ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'TSLA'];

function StockSelector({ selectedStocks, onChange }) {
  const toggleStock = (symbol) => {
    if (selectedStocks.includes(symbol)) {
      onChange(selectedStocks.filter((s) => s !== symbol));
    } else {
      onChange([...selectedStocks, symbol]);
    }
  };

  return (
    <div>
      <h3>Select Stocks to Aggregate</h3>
      {STOCKS.map((symbol) => (
        <label key={symbol} style={{ marginRight: '10px' }}>
          <input
            type="checkbox"
            checked={selectedStocks.includes(symbol)}
            onChange={() => toggleStock(symbol)}
          />
          {symbol}
        </label>
      ))}
    </div>
  );
}

export default StockSelector;
