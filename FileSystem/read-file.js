const fs = require("node:fs");
const { Buffer } = require("buffer");

const readFile = fs.readFileSync("./text.txt", "hex");
console.log(readFile);
const size = Buffer.poolSize;
console.log(`Buffer pool size is ${size} bytes`);
