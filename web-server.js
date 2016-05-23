const express = require('express');
const http = require('http');
const path = require('path');
const uuid = require('uuid');

const serveIndex = require('serve-index');
const serveStatic = require('serve-static');
const jsonParser = require('body-parser').json;

const api = express();

api.use(jsonParser());
api.set('json spaces', 2);

let todos = [{
  id: uuid.v4(),
  title: 'Get JSPM up and running',
  completed: true
}, {
  id: uuid.v4(),
  title: 'Learn some Angular',
  completed: true
}, {
  id: uuid.v4(),
  title: 'Create a TODO app',
  completed: false
}];

// get list of all todos
api.get('/todos',  (req, res) => {
  res.json( todos );
});

// update entire list of todos
api.get('/todo/:id', (req, res) => {
  const todo = todos.find(todo => todo.id === id);
  if(todo) {
    res.json(todo);
  }
  else {
    res.sendStatus(404);
  }
});

// update single todo
api.put('/todos/:id', (req, res)  => {
  const id = req.params.id;
  const todo = todos.find(todo => todo.id === id);
  if(!todo) {
    res.sendStatus(404);
  }
  else {
    todo.completed = req.body.completed;
    todo.title = req.body.title;
    res.end();
  }
});

// create todo
api.post('/todos', (req, res) => {
  const todo = {
    id: uuid.v4(),
    title: req.body.title,
    completed: false
  };
  todos.push(todo);
  res.json(todo);
});

// delete single todo
api.delete('/todos/:id', (req, res) => {
  const id = req.params.id;
  const newTodos = todos.filter(todo => todo.id !== id);
  if(newTodos.length !== todos.length) {
    res.sendStatus(204);
    todos = newTodos;
  }
  else {
    res.sendStatus(404);
  }
});

const app = express();

app.set('port', process.env.PORT || 3000);

app.use('/api', api);

app.use(serveStatic(path.join(__dirname)));
app.use(serveIndex(path.join(__dirname), {icons: true, view: 'details'}));

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});


