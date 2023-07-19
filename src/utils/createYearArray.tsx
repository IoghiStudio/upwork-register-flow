export const createYearsArray = (from: number, to: number) => {
  const output = [];

  for (let i = from; i >= to; i--) {
    const year = String(i);
    output.push(year);
  }

  return output;
}