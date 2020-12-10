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
    response.send('Welcome to my NearbyPlaces API');
});

app.get('/place', (request, response) => {
    let name = request.body.name;
    let content = request.body.content;
    let rating = request.body.rating;
    db.setPlace(name, content, rating).then(x => response.json(x));
})

app.get('/places', (request, response) => {
    db.getPlaces().then(x => response.json(x));
})

app.get('/review/:placeId', (request, response) => {
    // Not sure how to assign a unique placeid whenever creating a new place,
    // maybe keep track of a variable and increment it?
    let placeid = request.body.placeid;
    let username = request.body.username;
    let content = request.body.content;
    let rating = request.body.rating;
    db.addReview(username, content, rating).then(x => response.json({message: "Score saved"}));
})

app.get('/search/:searchTerm/:location', (request, response) => {
    // SearchTerm? What is this?
    let city = request.body.city;
    let category = request.body.category;
    let state = request.body.state;
    db.getSearch(city, state, category).then(x => response.json(x));
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});