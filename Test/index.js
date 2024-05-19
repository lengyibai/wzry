const a = {
  a: 1,
};

const b = (() => a)();

b.a = 2;

console.log(a);
