const fs = require('fs/promises');
const path = require('path');
const chalk = require('chalk');

const notesPath = path.join(__dirname, 'db.json');

const getNotes = async () => {
  const notesStr = await fs.readFile(notesPath, { encoding: 'utf-8' });
  const notes = JSON.parse(notesStr);
  return Array.isArray(notes) ? notes : [];
};

const addNote = async (title) => {
  const notes = await getNotes();

  const note = {
    id: Date.now().toString(),
    title,
  };

  notes.push(note);

  await fs.writeFile(notesPath, JSON.stringify(notes));
  console.log(chalk.green.inverse('Note was added'));
};

const removeNote = async (id) => {
  const notes = await getNotes();

  const newNotes = notes.filter((note) => note.id !== id);

  if (newNotes.length === notes.length) {
    console.log(chalk.red.inverse(`There is no such id: ${id} in notes`));
    return;
  }

  await fs.writeFile(notesPath, JSON.stringify(newNotes));
  console.log(chalk.green.inverse(`Note with id: ${id} has been deleted`));
};

const editNote = async (id, title) => {
  const notes = await getNotes();

  const newNotes = notes.map((note) => {
    if (note.id === id) {
      note.title = title;
    }
    return note;
  });
  await fs.writeFile(notesPath, JSON.stringify(newNotes));
  console.log(chalk.green.inverse(`Note with id: ${id} has been edited`));
};

const printNotes = async () => {
  const notes = await getNotes();

  console.log(chalk.blue.inverse('Here is the list of notes: \n'));
  notes.forEach((note) => {
    console.log(chalk.blue(`|${note.id}|: ${note.title}`));
  });
};

module.exports = { addNote, printNotes, removeNote, getNotes, editNote };
