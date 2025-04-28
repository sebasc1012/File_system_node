const { error } = require("console");
const fs = require("fs/promises");

async function fileConfig() {
  const CREATE_FILE = "Create a file";
  const DELETE_FILE = "Delete the file";
  const RENAME_FILE = "Rename the file";
  const ADD_TO_FILE = "Add the file";

  const createFile = async (path) => {
    try {
      const existingFileHandle = await fs.open(path, "r"); // siempre que se abre se tiene que cerrar con el close
      existingFileHandle.close(); // se cierra
      return console.log(`the file ${path} already exist`);
    } catch (e) {
      const handleNewFile = await fs.open(path, "w");
      console.log(`the file was succesfully created`);
      handleNewFile.close();
    }
  };

  const deleteFile = async (path) => {
    try {
      await fs.unlink(path);
      console.log(`the file ${path} was deleted`);
    } catch (e) {
      if (e.code === "ENOENT") {
        console.log("the file was not found");
      } else {
        console.log("it was an error while removing this file", e);
      }
    }
  };

  const renameFile = async (path, newPath) => {
    try {
      await fs.rename(path, newPath);
      console.log(`the file ${path} was rename for ${newPath}`);
    } catch (e) {
      if (e.code === "ENOENT") {
        console.log("the file was not found");
      } else {
        console.log("it was an error while rename this file", e);
      }
    }
  };

  let addedContent;

  const addToFileHandle = async (path, contentToAdd) => {
    if (addedContent === contentToAdd) return;
    try {
      const addToFile = await fs.open(path, "a");
      await addToFile.write(contentToAdd);
      addedContent = contentToAdd;
      console.log(`the file ${path} was update with ${contentToAdd}`);
      await addToFile.close();
    } catch (e) {
      console.log("it was an error while Adding the content", e);
    }
  };

  const openFile = await fs.open("./command.txt", "r");

  openFile.on("change", async () => {
    console.log("the file change");
    const fileSize = (await openFile.stat()).size; // allocate the buffer with the next amount of bytes
    const buff = Buffer.alloc(fileSize);
    const lenght = fileSize;
    const offset = 0; // que cantidad de bytes queremos leer
    const position = 0; // desde que posicion queremos que lea
    await openFile.read(buff, offset, lenght, position);

    const command = buff.toString("utf-8");

    if (command.includes(CREATE_FILE)) {
      const filePath = command.substring(CREATE_FILE.length + 1);
      createFile(filePath);
    }

    if (command.includes(DELETE_FILE)) {
      const filePath = command.substring(DELETE_FILE.length + 1);
      deleteFile(filePath);
    }

    if (command.includes(RENAME_FILE)) {
      const index = command.indexOf(" to ");
      const oldFilePath = command.substring(RENAME_FILE.length + 1, index);
      const newFilePath = command.substring(index + 4);
      renameFile(oldFilePath, newFilePath);
    }

    if (command.includes(ADD_TO_FILE)) {
      const index = command.indexOf(" this content: ");
      const filePath = command.substring(ADD_TO_FILE.length + 1, index);
      const contentToAdd = command.substring(index + 15); // el 15 es por que empieza desde el espacio antes del "this content"
      addToFileHandle(filePath, contentToAdd);
    }
  });

  const watching = fs.watch("./command.txt");

  for await (const event of watching) {
    if (event.eventType === "change") {
      openFile.emit("change");
    }
  }
}

fileConfig();
