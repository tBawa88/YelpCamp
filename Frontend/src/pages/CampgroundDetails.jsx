import { useRouteLoaderData, redirect, json } from "react-router-dom";
import CampgroundInfo from "../components/CampgroundInfo";
import ReviewForm from "../components/ReviewForm";

export const CampgroundDetails = () => {
    const camp = useRouteLoaderData('campDetail');
    return <>
        <CampgroundInfo camp={ camp } />
        <ReviewForm />
    </>
}



export const loader = async ({ request, params }) => {
    try {
        const { id } = params;
        const response = await fetch(`http://localhost:3000/camps/${id}`, {
            method: 'GET'
        });
        if (!response.ok)
            throw json({ title: "Error while making the fetch request" }, { status: 500 });
        const data = await response.json();
        if (data.success) {
            return data.camp;
        } else throw json({ title: data.message }, { status: 404 });
    } catch (error) {
        console.log("Request Error while finding a single camp", error)
        throw json({ title: "Error while making the fetch request" }, { status: 500 });
    }
}

//this action can be triggered by 2 components
//CampgoundDetails - delete a camp
//ReviewForm - post a review
export const action = async ({ request, params }) => {
    const campId = params.id;
    const method = request.method;
    const formData = await request.formData();
    let intent = formData.get('intent');

    if (intent === 'delete-camp') {
        try {
            const response = await fetch(`http://localhost:3000/camps/${campId}`, {
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
    if (intent === 'create-review') {
        try {
            //make a post request to /reviews api
            let newReview = {
                content: formData.get('content'),
                rating: parseFloat(formData.get('rating')),
                campgroundId: campId
            }
            console.log("New review added ->", newReview)
            return redirect(`/campgrounds/${campId}`)
        } catch (error) {

        }
    }

}

