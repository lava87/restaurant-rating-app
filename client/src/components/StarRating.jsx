const StarRating = ({rating}) => {
    const stars = [];
    for(let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars.push(<i className="fas fa-star" key={`star-${i}`}></i>)
        } else if (!Number.isInteger(rating) && i === Math.ceil(rating)) {
            stars.push(<i className="fas fa-star-half-alt" key={`star-${i}`}></i>)
        } else {
            stars.push(<i className="far fa-star" key={`star-${i}`}></i>)
        }
    }

    return (
        <>
            {rating > 0 && rating <= 5 && stars}
        </>
    )
}

export default StarRating
