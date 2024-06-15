import { Link } from "react-router-dom"

const CampgroundCard = ({ camp }) => {
    return <>
        <div className="card mb-4">
            <div className="row">
                <div className="col-md-4">
                    <img src={ camp.image } alt="" className="img-fluid" />
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">
                            { camp.title }
                        </h5>
                        <p className="card-text">
                            { camp.description }
                        </p>
                        <p className="card-text text-muted">
                            { camp.location }
                        </p>
                        <Link to={ `/campgrounds/${camp._id}` } className="btn btn-primary">View</Link>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default CampgroundCard;