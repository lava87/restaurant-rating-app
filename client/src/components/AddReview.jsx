import { useContext, useState } from "react"
import { useParams } from "react-router-dom"
import apis from "../apis"
import { RestaurantsContext } from "../context/RestaurantsContext"

const AddReview = () => {
    const { id } = useParams()
    const { setSelectedRestaurant } = useContext(RestaurantsContext)

    const [name, setName] = useState("")
    const [rating, setRating] = useState(0)
    const [reviewText, setReviewText] = useState("")

    const stars = []
    for(let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars.push(
                <button onClick={() => setRating(i)} type="button" className="btn btn-link" key={`star-${i}`}>
                    <i className="fas fa-star" key={`star-${i}`}></i>
                </button>
            )
        } else {
            stars.push(
                <button onClick={() => setRating(i)} type="button" className="btn btn-link" key={`star-${i}`}>
                    <i className="far fa-star"></i>
                </button>
            )
        }
    }

    const handleSubmitReview = async (e) => {
        e.preventDefault()
        try {
            await apis.post(`/${id}/reviews`, {
                name,
                review: reviewText,
                rating
            })
            const response = await apis.get(`/${id}`)
            setSelectedRestaurant(response.data.data)

        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="border m-4">
            <h5 className="m-3">Add Review</h5>
            <form action="">
                <div className="m-2">
                    <label className="p-2" htmlFor="rating">Rating</label>
                    <div className="btn-group mx-2" role="group" id="rating">
                        {stars}
                    </div>
                </div>
                <div className="mx-3 mb-3">
                    <label className="mb-2" htmlFor="description">Description</label>
                    <textarea 
                        className="form-control" 
                        id="description" 
                        rows="3"
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                    ></textarea>
                </div>
                <div className="mx-3 mb-3">
                    <label className="mb-2" htmlFor="name">Name</label>
                    <input 
                        className="w-50 form-control" 
                        id="name" 
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </div>
                <button onClick={handleSubmitReview} className="btn btn-primary mx-3 mb-3">Submit</button>
            </form>
        </div>
    )
}

export default AddReview
