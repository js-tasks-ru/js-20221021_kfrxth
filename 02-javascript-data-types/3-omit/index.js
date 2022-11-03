export const omit = (obj, ...fields) => {
  return Object.entries(obj)
    .filter((item) => {
      return !fields.includes(item[0]);
    })

    .reduce((result, cur) => {
      result[cur[0]] = cur[1];
      return result;
    }, {});
};
