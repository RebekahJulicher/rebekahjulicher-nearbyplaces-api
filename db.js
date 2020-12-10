require('dotenv').config();
const { Pool } = require('pg');


const postgreConnectionString =
    `postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DATABASE}`;

console.log(postgreConnectionString);

const postgrePool = new Pool({
    connectionString: process.env.DATABASE_URL ? process.env.DATABASE_URL : postgreConnectionString,
    ssl: { rejectUnauthorized: false }
});

function getQuizzes (){
    return postgrePool.query("select id, title from imagequiz.quiz").then(x => x.rows);
}

function getQuestions (quizid){
    return postgrePool.query("select q.choices, q.answer, q.id from imagequiz.question q join imagequiz.quizquestions q2 on q.id = q2.questionid where quizid = $1", [quizid])
    .then(x => x.rows);
}

function saveScore (username, quizid, score){
    return postgrePool.query("insert into imagequiz.score (username, quizid, score) values ($1, $2, $3)", [username, quizid, score])
    .then(x => x.rows);
}

module.exports = { getQuizzes, getQuestions, saveScore }