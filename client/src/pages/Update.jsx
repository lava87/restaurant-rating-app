import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import apis from '../apis'

const Update = () => {
    const {id} = useParams()
    let navigate = useNavigate()
    const [name, setName] = useState("")
    const [location, setLocation] = useState("")
    const [priceRange, setPriceRange] = useState("")
    const [description, setDescription] = useState("")

    useEffect(() => {
        const fetchData = async () => {
            const response = await apis.get(`/${id}`)
            setName(response.data.data.restaurant.name)
            setLocation(response.data.data.restaurant.location)
            setPriceRange(response.data.data.restaurant.price_range)
            setDescription(response.data.data.restaurant.description)
        }
        fetchData()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        await apis.put(`/${id}`, {
            name,
            location,
            price_range: priceRange,
            description: description
        })
        navigate('/')
    }

    const handleCancel = async (e) => {
        e.preventDefault()
        navigate('/')
    }

    return (
        <div>
            <h1 className='text-center m-3'>Update Restaurant</h1>
            <form action="">
                <div className='form-group mb-3'>
                    <label className='form-label' htmlFor='name'>Name</label>
                    <input 
                        id='name' 
                        className='form-control' 
                        placeholder='Name'
                        type='text' 
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </div>
                <div className='form-group mb-3'>
                    <label className='form-label' htmlFor='name'>Location</label>
                    <input 
                        id='location' 
                        className='form-control' 
                        placeholder='Location'
                        type='text' 
                        value={location}
                        onChange={e => setLocation(e.target.value)}
                    />
                </div>
                <div className='form-group mb-3'>
                    <label className='form-label' htmlFor='name'>Price Range</label>
                    <div className="col">
                        <select 
                            id='price-range'
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
                <div className='form-group mb-3'>
                    <label className='form-label' htmlFor='name'>Location</label>
                    <input 
                        id='description' 
                        className='form-control' 
                        placeholder='Description'
                        type='text' 
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                </div>
                <button onClick={handleSubmit} type='submit' className="btn btn-primary">Submit</button>
                <button onClick={handleCancel} className="btn btn-secondary mx-4">Cancel</button>
            </form>
        </div>
    )
}

export default Update
