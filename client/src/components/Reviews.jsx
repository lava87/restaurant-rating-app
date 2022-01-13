import StarRating from "./StarRating"

const Reviews = ({reviews}) => {
    
    return (
        <div className="m-4">
            <h4>Reviews</h4>
            {reviews.length > 0 ? reviews.map((r) => {
                return (
                    <div className="card mt-3" key={r.id}>
                        <div className="card-header text-warning">
                            <StarRating rating={r.rating}/>
                        </div>
                        <div className="card-body">
                            <blockquote className="blockquote mb-0">
                                <p>{r.review}</p>
                                <footer className="blockquote-footer">{r.name}</footer>
                            </blockquote>
                        </div>
                    </div>
                )})
                : <i className="mt-3 text-muted">No reviews yet</i>
            }
        </div>
    )
}

export default Reviews
