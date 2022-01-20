const chalk = require('chalk');
const yargs = require('yargs');

const {
  addNote,
  getNotes,
  removeNote,
  editNote,
  printNotes,
} = require('./notes.controller');

yargs.command({
  command: 'add',
  describe: 'Add new note to list',
  builder: {
    title: {
      type: 'string',
      describe: 'Note title',
      demandOption: true,
    },
  },

  handler({ title }) {
    console.log('asdadsa');
    addNote(title);
  },
});

yargs.command({
  command: 'list',
  describe: 'Prints list of notes',
  handler() {
    printNotes();
  },
});

yargs.command({
  command: 'remove',
  describe: 'Remove note from list',
  builder: {
    id: {
      type: 'string',
      describe: 'Note id',
      demandOption: true,
    },
  },

  handler({ id }) {
    removeNote(id);
  },
});

yargs.command({
  command: 'edit',
  describe: 'Edit note from list',
  builder: {
    id: {
      type: 'string',
      describe: 'Note id',
      demandOption: true,
    },
    title: {
      type: 'string',
      describe: 'Note title',
      demandOption: true,
    },
  },

  handler({ id, title }) {
    if (!id || !title)
      chalk.red.inverse('There is should be --id and --title parameter');
    editNote(id, title);
  },
});

yargs.parse();
