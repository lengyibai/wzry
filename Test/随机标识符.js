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

console.log(generateRandomStrings(4, 10, ["a", "b", "c"]));
