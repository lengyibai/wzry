const g = (a) => {
  let arr = [];
  while (arr.length < 10) {
    const c = "abcdefghijklmnopqrstuvwxyz0123456789";
    const i =
      Math.floor(Math.random() * 10) +
      [...Array(3)].map(() => c[(Math.random() * c.length) | 0]).join``;
    if (
      !arr.includes(i) &&
      !a.includes(i) &&
      (i.match(/[a-z]/g) || []).length >= 2 &&
      (i.match(/[0-9]/g) || []).length >= 2
    ) {
      arr.push(i);
    }
  }
  return arr;
};
// eslint-disable-next-line no-console
console.log(
  g([
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
    "0o5c",
    "9u8z",
    "n4r4",
    "rt25",
    "16vy",
    "2rb7",
    "9f5m",
    "05su",
    "9oy5",
    "58mz",
    "1w7o",
    "0vk2",
    "1zs6",
    "3vi5",
    "2l5m",
    "9ms5",
    "2rb7",
  ])
);
