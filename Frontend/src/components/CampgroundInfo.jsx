import { Link, useRouteLoaderData, useSubmit } from "react-router-dom";
import ReviewList from "./ReviewList";
import ReviewForm from "./ReviewForm";

const CampgroundInfo = ({ camp, }) => {
    const token = useRouteLoaderData('root');
    const { userId } = useRouteLoaderData('campDetail')
    const submit = useSubmit();
    console.log("Inside camp page, ID of current user => ", userId)
    function handleDelete() {
        const proceed = window.confirm("Are you sure you want to delete this Campground ?")
        if (proceed) {
            const data = { intent: 'delete-camp' }
            submit(data, { method: 'DELETE' });
        }
    }

    return <>
        <div className="row">
            <div className="col-md-6 ">
                <div className="card mb-5">
                    <img src={ camp.image } alt="Image of a campground" />
                    <div className="card-body">
                        <h4 className="card-title">{ camp.title }</h4>
                        <p className="card-text">{ camp.description }</p>
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">${ camp.price }</li>
                        <li className="list-group-item text-muted">{ camp.location }</li>
                    </ul>
                    { (userId === camp.authorId) && <div className="card-body">

                        <Link
                            to={ `/campgrounds/${camp._id}/edit` }
                            className="btn btn-primary me-2"
                        >Edit</Link>
                        <button
                            className="btn btn-danger"
                            onClick={ handleDelete }
                        >Delete</button>
                    </div> }
                    <div className="card-footer text-body-secondary">
                        2 days ago
                    </div>
                </div>
            </div>
            <div className="col-md-6">
                { (token && token !== 'EXPIRED') && <ReviewForm /> }
                <ReviewList />
            </div>
        </div>
    </>
}
export default CampgroundInfo;