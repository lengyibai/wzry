const generateRandomStrings = (length, count, excludedStrings) => {
  const result = [];
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
  const excludedSet = new Set(excludedStrings);

  for (let i = 0; i < count; i++) {
    let randomString = "";
    let lettersCount = Math.ceil(length / 2); // 字母数量为生成长度的一半，向上取整
    let numbersCount = length - lettersCount; // 数字数量为生成长度减去字母数量

    while (randomString.length < length) {
      const randomChar = characters[Math.floor(Math.random() * characters.length)];

      if (!excludedSet.has(randomChar)) {
        if (/[a-z]/.test(randomChar) && lettersCount > 0) {
          randomString += randomChar;
          lettersCount--;
        } else if (/[0-9]/.test(randomChar) && numbersCount > 0) {
          randomString += randomChar;
          numbersCount--;
        }
      }
    }
    result.push(randomString);
  }

  return result;
};

console.log(
  generateRandomStrings(4, 1, [
    "bq69",
    "p60v",
    "45iy",
    "6xc6",
    "e6b4",
    "36jn",
    "h2w0",
    "3dn3",
    "u4c5",
    "h7t9",
    "3k4s",
    "vw31",
    "d5e2",
    "4d8m",
    "p53r",
    "5zv8",
    "e84n",
    "n74s",
    "le78",
    "range",
    "0o5c",
    "9u8z",
    "n4r4",
    "rt25",
    "16vy",
    "kj62",
  ]),
);
