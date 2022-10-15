export function sortStrings(arr, param = "asc") {
  let sortedNewArr = arr
    .map((el) => el)
    .sort((a, b) => {
      return a.localeCompare(b);
    })

    .sort((a, b) => {
      if (a[0].toLowerCase() == b[0].toLowerCase()) {
        return a[0].charCodeAt() - b[0].charCodeAt();
      }
    });

  return param == "asc" ? sortedNewArr : sortedNewArr.reverse();
}
