function randomIntArray(min, max, r) {
  var numbers = []; // new empty array

  var n, p;

  for (let i = 0; i < r; i++) {
    do {
      n = Math.floor(Math.random() * (max - min + 1)) + min;
      p = numbers.includes(n);
      if (!p) {
        numbers.push(n);
      }
    } while (p);
  }
  return numbers;
}


const randomWorkerId = (length = 8) => {
  return Math.random().toString(16).substring(2, length);
};