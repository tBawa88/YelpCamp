import { useRouteError, Link } from 'react-router-dom'
import Navbar from '../components/Navbar';

export const ErrorPage = () => {
    const data = useRouteError();
    const message = data.error?.message;


    return <>
        <Navbar />
        <div className="row mt-5">
            <div className="col-md-6 offset-3">
                <div className="alert alert-danger">
                    <h4 className="alert-heading">{ message ? message : "Error fetching the resource or page" } :|</h4>
                    <p>Oops! Something went wrong on our end. Please try again later. If the problem persists, contact our support team for assistance</p>
                    <hr />
                    <Link to='/'>Go back to homepage</Link>
                </div>
            </div>
        </div>

    </>

}
{/* <div class="alert alert-success" role="alert">
  <h4 class="alert-heading">Well done!</h4>
  <p>Aww yeah, you successfully read this important alert message. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content.</p>
  <hr>
  <p class="mb-0">Whenever you need to, be sure to use margin utilities to keep things nice and tidy.</p>
</div> */}