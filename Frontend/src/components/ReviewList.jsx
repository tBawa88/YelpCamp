import { useRouteLoaderData } from "react-router-dom";
import ReviewCard from "./ReviewCard";

const ReviewList = ({ }) => {
    const { reviews } = useRouteLoaderData('campDetail')
    return <>
        { reviews?.map(review => <ReviewCard key={ review._id } review={ review } />) }
    </>

}

export default ReviewList;