import { Link, json, redirect, useSubmit } from "react-router-dom";

const Campground = ({ camp }) => {
    const submit = useSubmit();

    function handleDelete() {
        const proceed = window.confirm("Are you sure you want to delete this Campground ?")
        if (proceed)
            submit(null, { method: 'DELETE' }); //to trigger action method of this route 
    }
    return <div className="row">
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
}
export default Campground;



export const action = async ({ request, params }) => {
    try {
        const method = request.method;
        const response = await fetch(`http://localhost:3000/camps/${params.id}`, {
            method: method
        })
        if (!response.ok) throw json({ title: "Failed to delete camp," })
        const data = await response.json();
        if (data.success) {
            return redirect(`/campgrounds`)
        } else {
            throw json({ title: data.message }, { status: 404 })
        }
    } catch (error) {
        console.log("Error while making DELETE request", error)
        throw json({ title: "Server error while making the request" }, { status: 500 })
    }
}

