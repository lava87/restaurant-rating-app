import React, { useContext, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import apis from '../apis'
import { RestaurantsContext } from '../context/RestaurantsContext'
import Header from '../components/Header'
import StarRating from '../components/StarRating'
import Reviews from '../components/Reviews'
import AddReview from '../components/AddReview'

const RestaurantDetail = () => {
    const {id} = useParams()
    const {selectedRestaurant, setSelectedRestaurant} = useContext(RestaurantsContext)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apis.get(`/${id}`)
                setSelectedRestaurant(response.data.data)
            } catch (err) {
                console.error(err);
            }
        }
        fetchData()
    }, [])

    const renderRating = (r) => {
        if (r.rating_count) {
            return (
                <div className="text-warning">
                    <StarRating rating={r.average_rating} />
                    <span className='text-dark' > ({r.rating_count})</span>
                </div>
            )
        } else {
            return (
                <i className="text-muted">No Ratings</i>
            )
        }
    }

    return (
        <div className='container'>
            <Header/>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to='/'>Home</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        {selectedRestaurant && selectedRestaurant.restaurant.name}
                    </li>
                </ol>
            </nav>
            <div className='text-center m-4'>
                <h1>Restaurants Details: {selectedRestaurant && selectedRestaurant.restaurant.name}</h1>
            </div>
            <div className='text-center m-4 text-warning'>
                {selectedRestaurant && renderRating(selectedRestaurant.restaurant)}
            </div>
            <div className="m-4">
                <h6>Location: {selectedRestaurant && selectedRestaurant.restaurant.location}</h6>
            </div>
            <div className="m-4">
                <h4>Description</h4>
                {selectedRestaurant && selectedRestaurant.restaurant.description}
            </div>
            <Reviews reviews={selectedRestaurant && selectedRestaurant.reviews} />
            <AddReview/>
        </div>
        
    )
}

export default RestaurantDetail
