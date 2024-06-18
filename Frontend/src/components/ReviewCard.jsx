import { Link, useRouteLoaderData, useSubmit } from "react-router-dom";

const ReviewCard = ({ review }) => {
    const submit = useSubmit();
    const { userId } = useRouteLoaderData('campDetail');
    console.log("inside review card, author ID of review", review.authorId)
    const handleDeleteReview = () => {
        //use submit to trigger the action of this route
        const proceed = window.confirm("This review will be deleted permanantly")
        if (proceed) {
            const data = { intent: 'delete-review', reviewId: review._id };
            submit(data, { method: 'DELETE' });
        }
    }
    const isAuthor = userId === review.authorId;

    return <div className="card mb-3">
        <div className="card-header">
            { review.rating }
        </div>
        <div className="card-body">
            {/* <h5 className="card-title">Special title treatment</h5> */ }
            <p className="card-text">{ review.content }</p>
            {/* <Link>Edit</Link> TODO: add edit review funcitonality */ }
            { isAuthor && <button className="btn btn-danger"
                onClick={ handleDeleteReview }
            >Delete</button> }
        </div>
    </div>
}

export default ReviewCard;