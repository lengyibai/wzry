/* eslint-disable no-console */
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
        } else if (/[0-9]/.test(randomChar) && numbersCount > 0 && randomString.length > 0) {
          // 确保生成的字符串以字母开头
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
  generateRandomStrings(4, 20, [
    //tip
    "kr53",
    "f1y0",
    "mu63",
    "d7o5",
    "ma67",
    "v44s",
    "lp57",
    "cl60",

    //audio
    "gz76",
    "bq69",
    "kj62",
    "p60v",
    "cy87",
    "ba09",
    "e6b4",
    "pj83",
    "h2w0",
    "kh79",
    "u4c5",
    "h7t9",
    "ph23",
    "vw31",
    "d5e2",
    "iv51",
    "p53r",
    "al41",
    "e84n",
    "n74s",
    "le78",
    "za86",
    "v6p0",
    "gz43",
    "n4r4",
    "rt25",
    "p6q3",

    //mouse_tip
    "a20t",
    "ak79",
    "b6v2",
    "br37",
    "c1g6",
    "c2y9",
    "c3x1",
    "cl81",
    "dz56",
    "er37",
    "g9u9",
    "g9x6",
    "i6u1",
    "iv65",
    "ix29",
    "jx58",
    "kb43",
    "kq36",
    "kr17",
    "kz53",
    "lq42",
    "lq48",
    "mi32",
    "mk66",
    "mv02",
    "n1w6",
    "nz58",
    "o12u",
    "pd85",
    "ph01",
    "ph48",
    "po14",
    "q1s7",
    "q3k7",
    "q7a3",
    "qf48",
    "r4r3",
    "sg22",
    "sj91",
    "sq28",
    "ty38",
    "uc74",
    "v41b",
    "vs71",
    "vz77",
    "wk12",
    "x5a6",
    "yf23",
    "zq77",
    "zx48",
    "d7i9",
    "x5a6",
    "jb12",
    "k5j1",
    "wj32",
    "ns41",
    "xv00",
    "wc91",
    "qu12",
    "vz42",
    "qr58",
    "sb17",
    "fe59",
    "ir00",
    "zk84",
    "wi76",
    "ak96",
    "wt86",
    "ph66",
    "w0h6",
    "mc72",
    "g5l7",
    "wk98",
    "xj79",
    "i7w1",
    "lr80",
    "lb97",
    "i73w",
    "jt87",
    "pa66",
    "e8p6",
    "fr70",
    "d21q",
    "hq27",
    "xw29",
    "fc15",
    "l1c4",
    "xo74",

    //message-tip
    "cg09",
    "j5l7",
    "l23d",
    "s24z",
    "rh43",
    "n32v",
    "w89h",
    "km30",
    "y2l2",
    "a2k3",
    "by88",
    "kq89",
    "mj67",
    "fh97",
    "kc58",
    "iy70",
    "r12t",
    "y9k8",
    "vf38",
    "uf04",
  ]),
);
