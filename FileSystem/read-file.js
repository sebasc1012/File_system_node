const fs = require("node:fs");
const path = require("node:path");
// const { Buffer } = require("buffer");

// const readFile = fs.readFileSync("./text.txt", "hex");
// console.log(readFile);
// const size = Buffer.poolSize;
// console.log(`Buffer pool size is ${size} bytes`);

fs.readFile(path.join(__dirname, "text.txt"), "utf-8", (err, data) => {
  if (err) throw err;
  console.log(data);
});

fs.writeFile(path.join(__dirname, "copy.txt"), "This is a copy", (err) => {
  if (err) throw err;
  console.log("it was succesfully created");
});

fs.appendFile();

process.on("uncaughtException", (err) => {
  console.error(`There was a uncaughterror: ${err}`);
});
