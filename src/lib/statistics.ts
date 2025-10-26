export function pearsonCorrelation(xs: number[], ys: number[]): number {
  if (xs.length !== ys.length) {
    throw new Error("Arrays must have the same length");
  }
  const n = xs.length;
  if (n === 0) {
    return 0;
  }
  const meanX = xs.reduce((acc, value) => acc + value, 0) / n;
  const meanY = ys.reduce((acc, value) => acc + value, 0) / n;
  const numerator = xs.reduce((acc, value, index) => acc + (value - meanX) * (ys[index] - meanY), 0);
  const denominatorX = Math.sqrt(xs.reduce((acc, value) => acc + (value - meanX) ** 2, 0));
  const denominatorY = Math.sqrt(ys.reduce((acc, value) => acc + (value - meanY) ** 2, 0));
  const denominator = denominatorX * denominatorY;
  if (denominator === 0) {
    return 0;
  }
  return Number((numerator / denominator).toFixed(2));
}

export function normalise(values: number[]): number[] {
  const min = Math.min(...values);
  const max = Math.max(...values);
  if (min === max) {
    return values.map(() => 0.5);
  }
  return values.map((value) => (value - min) / (max - min));
}
