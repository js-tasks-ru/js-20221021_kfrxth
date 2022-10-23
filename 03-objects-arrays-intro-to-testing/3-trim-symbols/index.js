export function trimSymbols(string, size) {
  let countSameWord = 0;
  let result = "";

  if (string.length == 0 || size == 0) {
    return "";
  }

  if (typeof size == "undefined") {
    return string;
  }

  for (let i = 0; i < string.length; i++) {
    if (countSameWord < size) {
      result += string[i];
      countSameWord++;
    }

	if (string[i + 1] !== string[i]){
		countSameWord = 0;
	}
  }

  return result;
}
