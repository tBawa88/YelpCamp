import ReviewCard from "./ReviewCard";

const ReviewList = ({ reviews }) => {

    return <>
        { reviews?.map(review => <ReviewCard key={ review._id } review={ review } />) }
    </>

}

export default ReviewList;