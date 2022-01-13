require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db")
const morgan = require("morgan");

const app = express();

// middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
// app.use((req, res, next) => {
//     console.log("i am the middleware");
//     next();
// });

// get all restaurants
app.get("/api/v1/restaurants", async (req, res) => {
    try {
        // const results = await db.query("select * from restaurants");
        const results = await db.query(`
            select 
                res.id, res.name, res.location, res.price_range, res.description, rev.average_rating, rev.rating_count
            from restaurants res
            left join (
                select restaurant_id, trunc(avg(rating),2) as average_rating, count(*) as rating_count from reviews 
                group by restaurant_id
            ) rev
            on rev.restaurant_id = res.id`
        );
        res.status(200).json({
            status: "success",
            results: results.rows.length,
            data: {
                restaurant: results.rows,
            }
        })
    } catch (err) {
        console.error(err);
    }
});

// get individual restaurant
app.get("/api/v1/restaurants/:id", async (req, res) => {
    try {
        const restaurant = await db.query(`
            select 
                res.id, res.name, res.location, res.price_range, res.description, rev.average_rating, rev.rating_count
            from restaurants res
            left join (
                select restaurant_id, trunc(avg(rating),2) as average_rating, count(*) as rating_count from reviews 
                group by restaurant_id
            ) rev
            on rev.restaurant_id = res.id
            where res.id = $1`, 
            [req.params.id]
        );
        const reviews = await db.query("select * from reviews where restaurant_id = $1", [req.params.id]);
        res.status(200).json({
            status: "success",
            data: {
                restaurant: restaurant.rows[0],
                reviews: reviews.rows
            }
        })
    } catch (err) {
        console.error(err);
    }
});

// create a restaurant
app.post("/api/v1/restaurants", async (req, res) => {
    console.log(req.body);
    try {
        const results = await db.query("INSERT INTO restaurants (name, location, price_range, description) values ($1, $2, $3, $4) returning *", [
            req.body.name,
            req.body.location,
            req.body.price_range,
            req.body.description
        ])
        res.status(201).json({
            status: "success",
            data: {
                restaurant: results.rows[0],
            }
        })
    } catch (err) {
        console.error(err)
    }
});

// update a restaurant
app.put("/api/v1/restaurants/:id", async (req, res) => {
    try {
        const results = await db.query(
            "UPDATE restaurants SET name = $1, location = $2, price_range = $3, description = $4 where id = $5 returning *", 
            [
                req.body.name,
                req.body.location,
                req.body.price_range,
                req.body.description,
                req.params.id
            ]
        )
        res.status(200).json({
            status: "success",
            data: {
                restaurant: results.rows[0],
            }
        })    
    } catch (err) {
        console.error(err)
    }
});

// delete a restaurant
app.delete("/api/v1/restaurants/:id", async (req, res) => {
    try {
        const results = await db.query("DELETE FROM restaurants where id = $1", [req.params.id])
        res.status(204).json({
            status: "success"
        })
    } catch (err) {
        console.error(err)
    }
});

app.post("/api/v1/restaurants/:id/reviews", async (req, res) => {
    try {
        const newReview = await db.query("INSERT INTO reviews (restaurant_id, name, review, rating) values ($1, $2, $3, $4) returning *", [
            req.params.id,
            req.body.name,
            req.body.review,
            req.body.rating
        ])

        res.status(201).json({
            status: "success",
            data: {
                review: newReview.rows[0],
            }
        })
    } catch (err) {
        console.error(err);
    }
})

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server is up and listening on port ${port}`);
});