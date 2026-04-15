export function tryMerge(a, b) {
  if (a === b) return null; 

  const larger = Math.max(a, b);
  const smaller = Math.min(a, b);

  if (larger % smaller === 0) {
    const result = larger / smaller;
    return result === 1 ? null : result;
  }

  return undefined; 
}