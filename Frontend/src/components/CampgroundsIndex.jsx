import { Link } from "react-router-dom"

const CampgroundsIndex = ({ camps }) => {
    return (
        <ul>
            { camps.map(camp => (
                <li key={ camp._id }><Link to={ `/campgrounds/${camp._id}` }>{ camp.title }</Link></li>
            )) }
        </ul>
    )
}

export default CampgroundsIndex;