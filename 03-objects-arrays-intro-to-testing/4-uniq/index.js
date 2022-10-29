export function uniq(arr) {
  const setUniq = new Set();
  let result = [];

  if (!arr) {
    return result;
  }

  arr.forEach((element) => {
    setUniq.add(element);
  });
  result = [...setUniq];
  
  return result;
}
