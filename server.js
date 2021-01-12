// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

var todos= [
        {name: 'Đi chợ'},
        {name: 'Nấu cơm'},
        {name: 'Rửa bát'},
        {name: 'Học tại CodersX'}];
// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.render('index')
});

app.get("/todos/index", (request, response) => {
  response.render('todos/index',{
    todos: todos
  });
});

app.get("/todos/search", (request, response) => {
  var q= request.query.q;
  var matchedTodos=todos.filter((todo)=>{
    return todo.name.toLowerCase().indexOf(q.toLowerCase()) !==-1;
  })
  response.render('todos/index',{
    todos: matchedTodos
  });
});

app.get("/todos/create",(request, response)=>{
  response.render('todos/create')
})

app.post("/todos/create",(request, response,next)=>{
  todos.push(request.body);
  console.log(todos)
  response.redirect("/todos/index")
})
// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
