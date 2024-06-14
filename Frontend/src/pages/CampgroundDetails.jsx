import { json, useLoaderData, useRouteLoaderData } from "react-router-dom";
import Campground from "../components/Campground"

export const CampgroundDetails = () => {
    const camp = useRouteLoaderData('campDetail');
    return <>
        <Campground camp={ camp } />
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