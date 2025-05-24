import React, { useState, useEffect } from 'react';
import StockSelector from './StockSelector';
import PriceChart from './PriceChart';
import { fetchStockPrice } from './api';

function App() {
  const [selectedStocks, setSelectedStocks] = useState([]);
  const [aggregatedData, setAggregatedData] = useState([]);

  useEffect(() => {
    async function fetchAndAggregate() {
      if (selectedStocks.length === 0) {
        setAggregatedData([]);
        return;
      }

      const allData = {};

      for (const symbol of selectedStocks) {
        const data = await fetchStockPrice(symbol);
        if (data) {
          for (const [date, priceInfo] of Object.entries(data)) {
            const closePrice = parseFloat(priceInfo['4. close']);
            if (!allData[date]) {
              allData[date] = [];
            }
            allData[date].push(closePrice);
          }
        }
      }

      // Aggregate data by date
      const aggregatedArray = Object.entries(allData)
        .map(([date, prices]) => {
          const sum = prices.reduce((a, b) => a + b, 0);
          const avg = sum / prices.length;
          const max = Math.max(...prices);
          const min = Math.min(...prices);
          return { date, average: avg, max, min };
        })
        .sort((a, b) => new Date(a.date) - new Date(b.date));

      setAggregatedData(aggregatedArray);
    }

    fetchAndAggregate();
  }, [selectedStocks]);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Stock Price Aggregation</h1>
      <StockSelector selectedStocks={selectedStocks} onChange={setSelectedStocks} />
      <PriceChart data={aggregatedData} />
    </div>
  );
}

export default App;
