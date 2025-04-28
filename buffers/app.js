const { Buffer } = require("buffer");
const { log } = require("console");
//0100 1000 0110 1001 0010 0001
const challengeMemmory = Buffer.alloc(3);
challengeMemmory[0] = 0x48;
challengeMemmory[1] = 0x69;
challengeMemmory[2] = 0x21;
console.log(challengeMemmory.toString("utf-8")); // Hi!

// Other way to do it

const buff = Buffer.from([0x48, 0x69, 0x21]);
console.log(buff.toString("utf-8")); // Hi! s

const buffTwo = Buffer.from("486921", "hex");
log(buffTwo.toString("utf-8")); // Hi!

const buffThree = Buffer.from("Hi!", "utf-8");
console.log(buffThree.toString("hex")); // 486921
