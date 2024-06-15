import { useLoaderData, json, Await, defer } from "react-router-dom";
import { Suspense } from "react";
import CampgroundsList from "../components/CampgroundsList";

export const Campgrounds = () => {
    const { camps } = useLoaderData();

    return <>
        <Suspense fallback={ <p>Loading campgrounds ...</p> }>
            <Await resolve={ camps } >
                { (camps) => <CampgroundsList camps={ camps } /> }
            </Await>
        </Suspense>
    </>
}

const loadCamps = async () => {
    try {
        const response = await fetch('http://localhost:3000/camps/', {
            method: 'GET'
        });
        if (!response.ok) {
            console.log("Error fetching camps, response =>", response)
            throw json({ title: "Error while fetching the campgrounds" }, { status: 500 })
        }
        const data = await response.json();
        return data.camps;

    } catch (error) {
        throw json({ title: "Error while making the fetch request" }, { status: 500 });
    }
}

//using the defer to prevent delay in rendering this page component
export const loader = () => {
    return defer({
        camps: loadCamps()
    })
}