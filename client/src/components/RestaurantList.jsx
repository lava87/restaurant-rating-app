import React, {useEffect, useContext} from 'react'
import apis from '../apis'
import { RestaurantsContext } from '../context/RestaurantsContext'
import { Link, useNavigate } from "react-router-dom"
import StarRating from './StarRating'

const RestaurantList = (props) => {
    const {restaurants, setRestaurants} = useContext(RestaurantsContext)
    let navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apis.get("/")
                setRestaurants(response.data.data.restaurant)
            } catch (err) {
                console.error(err)
            }
        }
        fetchData()        
    }, [])

    const handleDelete = async (id) => {
        try {
            await apis.delete(`/${id}`)
            setRestaurants(restaurants.filter(r => {
                return r.id !== id
            }))
        } catch (err) {
            console.error(err)
        }
    }

    const handleUpdate = (id) => {
        navigate(`/restaurants/${id}/update`)
    }
    
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
        <div className='container mt-4'>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Restaurant Name</th>
                        <th scope="col">Location</th>
                        <th scope="col">Price Range</th>
                        <th scope="col">Ratings</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {restaurants && restaurants.map(r => {
                        return (
                            <tr key={r.id}>
                                <td>
                                    <Link className='link-dark' to={`/restaurants/${r.id}`}>{r.name}</Link>
                                </td>
                                <td>{r.location}</td>
                                <td>{"$".repeat(r.price_range)}</td>
                                <td>
                                    {renderRating(r)}
                                </td>
                                <td>
                                    <button onClick={() => handleUpdate(r.id)} className="btn btn-dark">Edit</button>
                                </td>
                                <td>
                                    <button onClick={() => handleDelete(r.id)} className="btn btn-dark">Delete</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default RestaurantList
