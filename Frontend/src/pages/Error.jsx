import { useRouteError, Link } from 'react-router-dom'

export const ErrorPage = () => {
    const error = useRouteError();
    console.log("Inside error page ->", error)

    return <>
        <h1>Error while finding the Resource or Page</h1>
        <Link to='/'>Go back to homepage</Link>
    </>

}