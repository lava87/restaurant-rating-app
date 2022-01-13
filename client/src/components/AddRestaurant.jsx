import React, { useContext, useState } from 'react'
import apis from '../apis'
import { RestaurantsContext } from '../context/RestaurantsContext'

const AddRestaurant = () => {
    const {addRestaurants} = useContext(RestaurantsContext)
    const [name, setName] = useState("")
    const [location, setLocation] = useState("")
    const [priceRange, setPriceRange] = useState("")
    const [description, setDescription] = useState("")
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await apis.post("/", {
                name: name,
                location: location,
                price_range: priceRange,
                description: description
            })
            addRestaurants(response.data.data.restaurant)
            setName("")
            setLocation("")
            setPriceRange("")
            setDescription("")
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div className='container border rounded'>
            <h4 className="mb-3 mt-3">Add Restaurant</h4>
            <form action=''>
                <div className="row mb-3">
                    <div className="col">
                        <input 
                            type="text" 
                            className='form-control' 
                            placeholder='name' 
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </div>
                    <div className="col">
                        <input 
                            type="text" 
                            className='form-control' 
                            placeholder='location' 
                            value={location}
                            onChange={e => setLocation(e.target.value)}
                        />
                    </div>
                    <div className="col">
                        <select 
                            className='form-select'
                            value={priceRange}
                            onChange={e => setPriceRange(e.target.value)}
                        >
                            <option value="" disabled hidden>Price Range</option>
                            <option value="1">$</option>
                            <option value="2">$$</option>
                            <option value="3">$$$</option>
                            <option value="4">$$$$</option>
                            <option value="5">$$$$$</option>
                        </select>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col">
                        <input
                            type="text" 
                            className='form-control' 
                            placeholder='description' 
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className='col'>
                        <button onClick={handleSubmit} type="submit" className='btn btn-primary'>
                            Add
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default AddRestaurant
