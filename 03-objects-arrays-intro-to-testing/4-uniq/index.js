export function uniq(arr) {
  let result = [];
  if (typeof arr == "undefined") {
    return result;
  }

  arr.map((item) => {
    if (!result.includes(item)) {
      result.push(item);
    }
  });

  return result;
}
