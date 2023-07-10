function stringToHyphenCase(str: string) {
  if (str) {
    let n = str.length;
    // initialize str1 as a string since it returns undefined
    // if it's initialized with no type
    let str1 = "";

    for (let i = 0; i < n; i++) {
      if (str[i] == " ") str1 = str1 + "-";

      else str1 = str1 + str[i].toLowerCase();
    }

    return str1;
  }
}

export { stringToHyphenCase };
