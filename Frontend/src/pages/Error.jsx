import { useRouteError, Link } from 'react-router-dom'
import Navbar from '../components/Navbar';

export const ErrorPage = () => {
    const data = useRouteError();
    const message = data.error?.message;


    return <>
        <Navbar />
        <h1>{ message ? message : "Error fetching the resource or page" } :|</h1>
        <Link to='/'>Go back to homepage</Link>
    </>

}