const { Writable } = require("node:stream");
const fs = require("node:fs");
const { buffer } = require("node:stream/consumers");

class WriteSteam extends Writable {
  constructor({ highWaterMark, fileName }) {
    super({ highWaterMark });
    this.fileName = fileName;
    this.fd = null;
    this.chunks = [];
    this.chunkSize = 0;
    this.writesCount = 0;
  }

  _construct(callback) {
    fs.open(this.fileName, "w", (err, fd) => {
      if (err) {
        callback(err);
      } else {
        this.fd = fd;
        callback();
      }
    });
  }

  _write(chunk, encoding, callback) {
    this.chunks.push(chunk);
    this.chunkSize += chunk.length;

    if (this.chunkSize > this.highWaterMark) {
      // este if valida si lo que va a ingresar al Buffer es mayor al highWaterMark que es el limite que le colocamos al Buffer lo detiene
      fs.write(this.fd, Buffer.concat(this.chunks), (err) => {
        if (err) {
          return callback(err);
        }
        this.chunks = [];
        this.chunkSize = 0;
        ++this.writesCount;
        callback();
      });
    } else {
      callback();
    }
  }

  _final(callback) {
    fs.write(this.fd, Buffer.concat(this.chunks), (err) => {
      if (err) return callback(err);
      this.chunks = [];
      callback();
    });
  }
}

const stream = new WriteSteam({
  highWaterMark: 1800,
  fileName: "textTesting.txt",
});
stream.write(Buffer.from("Testin some text"));
stream.end(Buffer.from("last write"));
