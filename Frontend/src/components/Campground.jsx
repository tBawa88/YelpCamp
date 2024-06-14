import { Link, json, redirect, useSubmit } from "react-router-dom";

const Campground = ({ camp }) => {
    const submit = useSubmit();

    function handleDelete() {
        const proceed = window.confirm("Are you sure you want to delete this Campground ?")
        if (proceed)
            submit(null, { method: 'DELETE' }); //to trigger action method of this route 
    }
    return <div>
        <h3>{ camp.title }</h3>
        <div >
            <img src={ camp.image } alt="Image of a Camp" style={ { height: '300px', width: '300px', objectFit: 'contain' } } />
        </div>
        <strong>{ camp.description }</strong>
        <p> Price : { camp.price }</p>
        <small>{ camp.location }</small>
        <div>
            <Link to={ `/campgrounds/${camp._id}/edit` }>Edit</Link>
            <button onClick={ handleDelete }>Delete</button>
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
