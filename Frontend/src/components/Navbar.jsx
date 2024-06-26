import { Form, NavLink, useRouteLoaderData, useSubmit } from "react-router-dom";

const Navbar = () => {
    const token = useRouteLoaderData('root');
    const submit = useSubmit();

    const handleLogout = () => {
        const proceed = window.confirm('You will be logged from this website')
        if (proceed)
            submit(null, { method: 'POST', action: '/logout' })
    }

    return <>
        <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top" data-bs-theme="dark">
            <div className="container container-fluid">
                <NavLink className="navbar-brand" to='/'>YelpCamp</NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <NavLink
                                className={ ({ isActive }) => isActive ? 'nav-link active' : 'nav-link' }
                                to="/"
                            >Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                className={ ({ isActive }) => isActive ? 'nav-link active' : 'nav-link' }
                                to="/campgrounds"
                                end
                            >Campgrounds</NavLink>
                        </li>
                        { token && <li className="nav-item">
                            <NavLink
                                className={ ({ isActive }) => isActive ? 'nav-link active' : 'nav-link' }
                                to="/campgrounds/new"
                                end
                            >New Campground</NavLink>
                        </li> }

                    </ul>
                    <ul className="navbar-nav ms-auto">
                        { !token && <li className="nav-item ">
                            <NavLink
                                className={ ({ isActive }) => isActive ? 'nav-link active' : 'nav-link' }
                                to="/auth?mode=signin"
                                end
                            >Login</NavLink>
                        </li> }
                        {/* show these conditionally */ }
                        { token && <Form method="post" action="/logout">
                            <button className="btn btn-light"
                            >Logout</button>
                        </Form>
                        }
                    </ul>
                </div>
            </div>
        </nav>
    </>

}

export default Navbar;