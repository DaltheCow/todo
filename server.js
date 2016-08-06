var express = require('express');
var app = express();
var http = require('http').Server(app);
var bodyParser = require('body-parser');

var port = process.env.PORT || 3000;

var todos = ['todo#1', 'todo#2', 'todo#3', 'todo#4', 'todo#5', 'todo#6'];



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended': false}));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/public/todoAng.html');
});

app.post('/api/todos', function(req, res) {
    todos.push(req.body.todo);
    res.status(201);
    res.json(todos);
});

app.delete('/api/todos/:index', function(req, res) {
    var index = Number(req.params.index);
    if (isNaN(index)) {
        res.status(404);
        res.json("You sent: " + index);
    }
    else {
        todos.splice(index, 1);
        res.status(204);
        res.json(null);
    }
});

app.get('/api/todos', function(req, res) {
    res.status(200);
    res.json(todos);
});

http.listen(port, function(){
    console.log('listening on ' + port);
});