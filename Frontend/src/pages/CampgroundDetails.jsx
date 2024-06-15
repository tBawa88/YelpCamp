import { useRouteLoaderData, redirect, json } from "react-router-dom";
import CampgroundInfo from "../components/CampgroundInfo";

export const CampgroundDetails = () => {
    const { camp, reviews } = useRouteLoaderData('campDetail');
    // console.log("Camp data", camp, "Review data", reviews)
    return <>
        <CampgroundInfo camp={ camp } reviews={ reviews } />
    </>
}


// make 2 requests 1-fetch the campground 2-fetch all reviews related to it
export const loader = async ({ request, params }) => {
    try {
        const { id } = params;
        const campResponse = await fetch(`http://localhost:3000/camps/${id}`, {
            method: 'GET'
        });
        const reviewResponse = await fetch(`http://localhost:3000/reviews/${id}`, {
            method: 'GET'
        })

        const campData = await campResponse.json();
        const reviewData = await reviewResponse.json();
        if (campResponse.ok) {
            if (campData.success)
                return { camp: campData.camp, reviews: reviewData.reviews }
            else
                throw json({ title: campData.message }, { status: 404 });
        } else {
            throw json({ title: "Error while making the fetch request" }, { status: 500 });
        }

        // if (!campResponse.ok)
        //     throw json({ title: "Error while making the fetch request" }, { status: 500 });
        // // const campData = await campResponse.json();
        // if (!reviewResponse.ok && campResponse.success) { //if failed to make fetch req. for reviews, just send the campground data
        //     return { camp: campData.camp, reviews: null };
        // }
        // if (campData.success || reviewData.success) {
        //     return { camp: campData, reviews: reviewData.reviews }
        // }

        // if (campData.success) {

        // } else throw json({ title: campData.message }, { status: 404 });
    } catch (error) {
        console.log("Request Error while finding a single camp", error)
        throw json({ title: "Error while making the fetch request" }, { status: 500 });
    }
}

//this action can be triggered by multiple components
//CampgoundDetails - delete a camp
//ReviewForm - post a review
//also for editing or deleting a review
export const action = async ({ request, params }) => {
    const campId = params.id;
    const method = request.method;
    const formData = await request.formData();
    let intent = formData.get('intent');

    if (intent === 'delete-camp') {
        try {
            const response = await fetch(`http://localhost:3000/camps/${campId}`, {
                method,
            })
            if (!response.ok) throw json({ title: "Failed to delete camp" }, { status: 500 })
            const data = await response.json();
            if (data.success) {
                return redirect(`/campgrounds`)
            } else {
                throw json({ title: data.message }, { status: 404 })
            }
        } catch (error) {
            console.log("Error making DELETE request", error)
            throw json({ title: "Server error, cannot delete camp at this time" }, { status: 500 })
        }
    }
    if (intent === 'create-review') {
        try {
            let newReview = {
                content: formData.get('content'),
                rating: parseFloat(formData.get('rating')),
            }
            const response = await fetch(`http://localhost:3000/reviews/${campId}`, {
                method,
                body: JSON.stringify(newReview),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (!response.ok) throw json({ title: "Failed to delete camp" }, { status: 500 })
            const data = await response.json();
            if (data.success)
                return redirect(`/campgrounds/${campId}`)
            else
                throw json({ title: data.message }, { status: 404 })
        } catch (error) {
            console.log("Error making post request for review server", error)
            throw json({ title: "Server error, cannot create a review at this time" }, { status: 500 })
        }
    }
    if (intent === 'delete-review') {
        try {
            const reviewId = formData.get('reviewId')
            const response = await fetch(`http://localhost:3000/reviews/${campId}`, {
                method: method,
                body: JSON.stringify({ reviewId }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await response.json();
            if (!response.ok)
                throw json({ title: "Server error, cannot delete review at this time" }, { status: 500 })

            if (data.success)
                return redirect(`/campgrounds/${campId}`);
            else
                throw json({ title: data.message }, { status: 404 })
        } catch (error) {
            console.log("Error making delete request for review to server", error)
            throw json({ title: "Server error, cannot delete review at this time" }, { status: 500 })
        }

    }

}

