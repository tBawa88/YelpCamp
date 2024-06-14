
import { useRouteLoaderData } from "react-router-dom"
import CampgroundForm from "../components/CampgroundForm"

export const EditCampground = () => {
    const camp = useRouteLoaderData('campDetail');

    return <>
        <CampgroundForm method='PATCH' camp={ camp } />
    </>
}