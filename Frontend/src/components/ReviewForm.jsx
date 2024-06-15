import { Form, useSubmit } from "react-router-dom";
import { useRef } from "react";

const ReviewForm = () => {
    const submit = useSubmit();
    const ratingRef = useRef();
    const reviewRef = useRef();

    const handleClick = () => {
        const data = {
            intent: 'create-review',
            content: reviewRef.current.value,
            rating: parseFloat(ratingRef.current.value)
        }
        submit(data, { method: 'POST' });
        ratingRef.current.value = '0'
        reviewRef.current.value = ''
    }

    return <>
        <div className="row mb-4">
            <div className="col-12">
                <div className="mb-3">
                    <label htmlFor="rating">Rating</label>
                    <input type="range" className="form-control" name="rating" ref={ ratingRef } min={ 0 } max={ 5 } step={ 1 } defaultValue='0' />
                </div>
                <div className="mb-3">
                    <label htmlFor="review">Review</label>
                    <textarea type="text" className="form-control" name="content" rows='3' ref={ reviewRef } />
                </div>

                <button
                    className="btn btn-success"
                    onClick={ handleClick }
                >Submit</button>

            </div>
        </div>

    </>
}
export default ReviewForm;