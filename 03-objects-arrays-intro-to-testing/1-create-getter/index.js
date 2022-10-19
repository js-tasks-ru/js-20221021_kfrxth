export function createGetter(path) {
  return (fnc = (obj) => {
    return path.split(".").reduce((sum, curr) => {
      if (sum === null) {
        return obj[curr];
      }

      return Object.keys(obj).length == 0 ? undefined : sum[curr];
    }, null);
  });
}
