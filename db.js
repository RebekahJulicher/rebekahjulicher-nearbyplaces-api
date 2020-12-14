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
    return postgrePool.query("select * from mynearbyplaces.place").then(x => x.rows);
}

function getSearch (city,state, category){
    let query = "select * from mynearbyplaces.place p where ";
    let conditions = [];
    if (city.length > 0){
        conditions.push(`city = ${city}`);
    }
    if (state.length > 0){
        conditions.push(`state = ${state}`);
    }
    if (category.length > 0){
        conditions.push(`category = ${category}`);
    }
    query += conditions.join(" AND ");

    return postgrePool.query(query)
    .then(x => x.rows);
}

function setPlace (name, city, state, category){
    return postgrePool.query("insert into mynearbyplaces.place (name, city, state, category) values ($1, $2, $3, $4)", [name, city, state, category])
    .then(x => x.rows);
}

// not going to work because I have no placeIds set up
function setReview (placeid, review){
    return postgrePool.query("insert into mynearbyplaces.review (content, rating, username, placeid) values ($1, $2, $3, $4)", [review.content, review.rating, review.username, placeid])
    .then(x => x.rows);
}

module.exports = { getPlaces, getSearch, setPlace, setReview }