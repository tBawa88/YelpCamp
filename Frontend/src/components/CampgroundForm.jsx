import { Form, json, redirect, useNavigate, useNavigation } from "react-router-dom";

const CampgroundForm = ({ method, camp }) => {
    const naviagte = useNavigate();
    const navigation = useNavigation();

    const isSubmitting = navigation.state === 'submitting';

    function cancelHandler() {
        naviagte('..');
    }

    return <>
        <Form method={ method }>
            <p>
                <label htmlFor="title">Title</label>
                <input id="title" type="text" name="title" defaultValue={ camp ? camp.title : '' } required />
            </p>
            <p>
                <label htmlFor="image">Image</label>
                <input id="image" type="url" name="image" defaultValue={ camp ? camp.image : '' } required />
            </p>
            <p>
                <label htmlFor="image">Location</label>
                <input id="location" type="text" name="location" defaultValue={ camp ? camp.location : '' } required />
            </p>
            <p>
                <label htmlFor="price">Price</label>
                <input id="price" type="number" name="price" defaultValue={ camp ? camp.price : '' } required />
            </p>
            <p>
                <label htmlFor="description">Description</label>
                <textarea id="description" name="description" rows="5" defaultValue={ camp ? camp.description : '' } required />
            </p>
            <div >
                <button type="button" onClick={ cancelHandler } disabled={ isSubmitting }>
                    Cancel
                </button>
                <button type="submit" disabled={ isSubmitting }>
                    { isSubmitting ? 'Submitting ..' : 'Save' }
                </button>
            </div>
        </Form>
    </>
}
export default CampgroundForm;


export const action = async ({ request, params }) => {
    const { id } = params;
    const data = await request.formData();
    let url = id ? `http://localhost:3000/camps/${id}` : `http://localhost:3000/camps`;

    const newCamp = {
        title: data.get('title'),
        image: data.get('image'),
        location: data.get('location'),
        price: parseFloat(data.get('price')),
        description: data.get('description')
    }

    try {
        const response = await fetch(url, {
            method: request.method,
            body: JSON.stringify(newCamp),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json()
        if (!response.ok) throw json({ title: "Error while making request to server" }, { status: 400 });
        if (data.success) {
            return redirect(`/campgrounds/${data.camp._id}`)
        } else throw json({ title: data.message }, { status: 404 })
    } catch (error) {
        console.log("Error while fetching data from backend", error);
        throw json({ title: 'Server error, data fetching failed' }, { status: 500 })
    }
}


