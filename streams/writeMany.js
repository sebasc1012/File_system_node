const fs = require("fs/promises");

async function addWords(path, number) {
  try {
    let contenido = "hola";

    for (let i = 1; i <= number; i++) {
      contenido += i;
    }

    await fs.appendFile(path, contenido);
  } catch (e) {
    console.log("error", e);
  }
}

addWords("./text.txt", 100);
