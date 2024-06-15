import { Form } from "react-router-dom";
import { useRef } from "react";

const ReviewForm = () => {
    const ratingRef = useRef();
    const reviewRef = useRef();

    const handleClick = () => {
        ratingRef.current.value = '0'
        reviewRef.current.value = ''
    }

    return <>
        <div className="row">
            <div className="col-6 offset-3">
                <Form method="POST">
                    <div className="mb-3">
                        <label htmlFor="rating">Rating</label>
                        <input type="range" className="form-control" name="rating" ref={ ratingRef } defaultValue='0' />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="review">Review</label>
                        <textarea type="text" className="form-control" name="content" rows='3' ref={ reviewRef } />
                    </div>

                    <button type="submit"
                        className="btn btn-success"
                        name="intent"
                        value="create-review"
                        onClick={ handleClick }
                    >Submit</button>
                </Form>
            </div>
        </div>

    </>
}
export default ReviewForm;