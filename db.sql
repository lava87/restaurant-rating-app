-- restaurants table
create table restaurants (
    id BIGSERIAL NOT NULL PRIMARY KEY, 
    name VARCHAR(50) NOT NULL check(length(name) > 0),
    location VARCHAR(50) NOT NULL check(length(location) > 0),
    price_range INT NOT NULL check(price_range >= 1 and price_range <= 5),
    description TEXT
);

insert into restaurants (name, location, price_range) values ('Burger King', 'Toronto', 1);

-- reviews table
CREATE TABLE reviews (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    restaurant_id BIGINT NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
    name VARCHAR(50) NOT NULL check(length(name) > 0),
    review TEXT NOT NULL check(length(review) > 0),
    rating INT NOT NULL check(rating >= 1 and rating <= 5)
);

-- get query for restaurants
select 
    res.id, res.name, res.location, res.price_range, res.description, rev.average_rating, rev.rating_count
from restaurants res
left join (
    select restaurant_id, trunc(avg(rating),2) as average_rating, count(*) as rating_count from reviews 
    group by restaurant_id
) rev
on rev.restaurant_id = res.id;
-- where res.id = 1; -- include for single restaurant query

