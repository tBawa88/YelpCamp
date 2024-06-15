import { Link, useSubmit } from "react-router-dom";


const CampgroundInfo = ({ camp }) => {
    const submit = useSubmit();

    function handleDelete() {
        const proceed = window.confirm("Are you sure you want to delete this Campground ?")
        if (proceed) {
            const data = { intent: 'delete-camp' }
            submit(data, { method: 'DELETE' });
        }
    }

    return <>
        <div className="row">
            <div className="col-md-6 offset-3">
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
                    <div className="card-body">

                        <Link
                            to={ `/campgrounds/${camp._id}/edit` }
                            className="btn btn-primary me-2"
                        >Edit</Link>
                        <button
                            className="btn btn-danger"
                            onClick={ handleDelete }
                        >Delete</button>

                    </div>
                    <div className="card-footer text-body-secondary">
                        2 days ago
                    </div>
                </div>
            </div>
        </div>
    </>
}
export default CampgroundInfo;