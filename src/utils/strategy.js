export function calculateRiskReward(options) {
  let maxProfit = -Infinity;
  let maxLoss = Infinity;
  let breakEvenPoints = new Set();

  options.forEach((option) => {
    const { strike_price, type, long_short, bid, ask } = option;

    const isCall = type === "Call";
    const isLong = long_short === "long";
    const cost = isLong ? ask : bid;
    const multiplier = isLong ? 1 : -1;

    for (
      let underlyingPrice = 0;
      underlyingPrice <= 200;
      underlyingPrice += 0.5
    ) {
      let profitLoss;

      if (isCall) {
        profitLoss =
          multiplier * Math.max(underlyingPrice - strike_price, 0) - cost;
      } else {
        profitLoss =
          multiplier * Math.max(strike_price - underlyingPrice, 0) - cost;
      }

      if (profitLoss > maxProfit) maxProfit = profitLoss;
      if (profitLoss < maxLoss) maxLoss = profitLoss;

      if (profitLoss === 0) {
        breakEvenPoints.add(underlyingPrice);
      }
    }
  });

  return {
    maxProfit: maxProfit.toFixed(2),
    maxLoss: maxLoss.toFixed(2),
    breakEvenPoints: Array.from(breakEvenPoints).map((point) =>
      point.toFixed(2)
    ),
  };
}

export function generateGraphData(options) {
  const labels = [];
  const data = [];

  for (let underlyingPrice = 0; underlyingPrice <= 200; underlyingPrice += 1) {
    let totalProfitLoss = 0;

    options.forEach((option) => {
      const { strike_price, type, long_short, bid, ask } = option;

      const isCall = type === "Call";
      const isLong = long_short === "long";
      const cost = isLong ? ask : bid;
      const multiplier = isLong ? 1 : -1;

      let profitLoss;

      if (isCall) {
        profitLoss =
          multiplier * Math.max(underlyingPrice - strike_price, 0) - cost;
      } else {
        profitLoss =
          multiplier * Math.max(strike_price - underlyingPrice, 0) - cost;
      }

      totalProfitLoss += profitLoss;
    });

    labels.push(underlyingPrice);
    data.push(totalProfitLoss.toFixed(2));
  }

  return {
    labels,
    datasets: [
      {
        label: "Profit/Loss",
        data,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        fill: true,
      },
    ],
  };
}
