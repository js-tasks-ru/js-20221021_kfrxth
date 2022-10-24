export function sortStrings(arr, param = "asc") {
  let sortedNewArr = arr
    .map((el) => el)
    .sort((a, b) => {
      if (param == "asc") {
        return a.localeCompare(b);
      } else {
        return b.localeCompare(a);
      }
    })

    .sort((a, b) => {
      if (a[0].toLowerCase() == b[0].toLowerCase()) {
        return a[0].charCodeAt() - b[0].charCodeAt();
      }
    });

  return sortedNewArr;
}
