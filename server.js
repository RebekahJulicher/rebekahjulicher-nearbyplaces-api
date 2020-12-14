const express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
const db = require('./db');

const app = express();
const port = process.env.PORT || 3001;

var ids = 1;

app.use(cors());
app.use(bodyParser.json());


app.get('/', (request, response) => {
    response.send('Welcome to my NearbyPlaces API');
});

app.get('/place', (request, response) => {
    let name = request.body.name;
    let city = request.body.city;
    let state = request.body.state;
    let category = request.body.category;
    let placeid = ids;
    ids += 1;
    db.setPlace(name, city, state, category, placeid).then(x => response.json(x));
})

app.get('/places', (request, response) => {
    db.getPlaces().then(x => response.json(x))
    .catch(e => response.status(500).json({error: "error happened " + e}));
})

app.get('/review/:placeId', (request, response) => {
    let placeid = request.body.placeid;
    let username = request.body.username;
    let content = request.body.content;
    let rating = request.body.rating;
    db.addReview(placeid, username, content, rating).then(x => response.json({message: "Score saved"}));
})

app.get('/search', (request, response) => {
    let city = request.body.city;
    let category = request.body.category;
    let state = request.body.state;
    db.getSearch(city, state, category).then(x => response.json(x));
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});