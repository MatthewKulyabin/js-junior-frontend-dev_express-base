const express = require('express');
const chalk = require('chalk');
const path = require('path');
const {
  addNote,
  getNotes,
  removeNote,
  editNote,
} = require('./notes.controller');

const port = 3000;
const app = express();

app.set('view engine', 'ejs');

app.use(express.static(path.resolve(__dirname, 'public')));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get('/', async (req, res) => {
  res.render('index', {
    title: 'Express App',
    notes: await getNotes(),
    created: false,
  });
});

app.post('/', async (req, res) => {
  try {
    console.log('asdads');
    await addNote(req.body.title);
    res.render('index', {
      title: 'Express App',
      notes: await getNotes(),
      created: true,
    });
  } catch (error) {
    console.error(error);
  }
});

app.delete('/:id', async (req, res) => {
  try {
    await removeNote(req.params.id);
    res.render('index', {
      title: 'Express App',
      notes: await getNotes(),
      created: false,
    });
  } catch (error) {
    console.error(error);
  }
});

app.put('/:id', async (req, res) => {
  try {
    await editNote(req.params.id, req.body.title);
    res.render('index', {
      title: 'Express App',
      notes: await getNotes(),
      created: false,
    });
  } catch (error) {
    console.error(error);
  }
});

app.listen(port, () => {
  console.log(
    chalk.green.inverse(`Server has been started on port ${port}...`)
  );
});
