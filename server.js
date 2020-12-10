const express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var data = require('./data');
const db = require('./db');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());


app.get('/', (request, response) => {
    response.send('Welcome to my Image Quiz API');
});

app.get('/place', (request, response) => {
    db.getQuizzes().then(x => response.json(x));
})

app.get('/quiz/:id', (request, response) => {
    db.getQuestions(request.params.id).then(x => response.json(x));
})

app.post('/score', (request, response) => {
    let username = request.body.username;
    let quizid = request.body.quizid;
    let score = request.body.score;
    db.saveScore(username, quizid, score).then(x => response.json({message: "Score saved"}));
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});