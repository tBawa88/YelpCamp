import { Form, json, redirect, useNavigate, useNavigation } from "react-router-dom";
import Input from "./Input";
const CampgroundForm = ({ method, camp }) => {
    const naviagte = useNavigate();
    const navigation = useNavigation();

    const isSubmitting = navigation.state === 'submitting';

    function cancelHandler() {
        naviagte('..');
    }

    return <>
        <div className="row">
            <h1 className="text-center mb-4">{ camp ? `Edit '${camp.title}'` : 'New Campground' }</h1>
            <div className="col-6 offset-3">
                <Form method={ method }>

                    <Input label='Title'
                        type="text"
                        name="title"
                        defaultValue={ camp ? camp.title : '' }
                        required />

                    <Input label='Image'
                        type="text"
                        name="image"
                        defaultValue={ camp ? camp.image : '' }
                        required />

                    <Input label='Location'
                        type="text"
                        name="location"
                        defaultValue={ camp ? camp.location : '' }
                        required />

                    <Input label='Price'
                        type="number"
                        name="price"
                        defaultValue={ camp ? camp.price : 0 }
                        required />

                    <Input label='Description'
                        name="description"
                        defaultValue={ camp ? camp.description : '' }
                        isTextArea
                        required />

                    <button type="button"
                        onClick={ cancelHandler }
                        disabled={ isSubmitting }
                        className="btn btn-primary me-3"
                    >
                        Cancel
                    </button>
                    <button type="submit"
                        className="btn btn-success"
                        disabled={ isSubmitting }
                    >
                        { isSubmitting ? 'Submitting ..' : 'Save' }
                    </button>

                </Form>
            </div>
        </div>

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


