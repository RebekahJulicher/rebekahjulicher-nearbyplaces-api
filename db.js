require('dotenv').config();
const { Pool } = require('pg');


const postgreConnectionString =
    `postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DATABASE}`;

console.log(postgreConnectionString);

const postgrePool = new Pool({
    connectionString: process.env.DATABASE_URL ? process.env.DATABASE_URL : postgreConnectionString,
    ssl: { rejectUnauthorized: false }
});

function getPlaces (){
    return postgrePool.query("select * from mynearbyplaces.places").then(x => x.rows);
}

//This isn't going to work because I need something like my original search
//function in my project 1
function getSearch (city,state, category){
    return postgrePool.query("select * from mynearbyplaces.places q where city = $1 AND state = $2 AND category = $3", [city, state, category])
    .then(x => x.rows);
}

function setPlace (name, city, state, category){
    return postgrePool.query("insert into mynearbyplaces.places (name, city, state, category) values ($1, $2, $3, $4)", [name, city, state, category])
    .then(x => x.rows);
}

// not going to work because I have no placeIds set up
function setReview (placeId, review){
    return postgrePool.query("insert into mynearbyplaces.places (reviews) values ($1) where placeId = $2", [review, placeId])
    .then(x => x.rows);
}

module.exports = { getPlaces, getSearch, setPlace, setReview }