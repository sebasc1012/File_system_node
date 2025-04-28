const { Buffer } = require("buffer");

const buff = Buffer.alloc(3, 1);

const unsafeBurrer = Buffer.allocUnsafe(10000);

for (let i = 0; i < unsafeBurrer.length; i++) {
  if (unsafeBurrer[i] !== 0) {
    console.log(
      `Element with position ${i} has the value ${unsafeBurrer[i].toString(16)}`
    );
  }
}
const bufferSize = Buffer.poolSize;
console.log(`Buffer pool size is ${bufferSize} bytes`); // 8kb
