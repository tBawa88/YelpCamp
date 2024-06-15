import CampgroundCard from "./CampgroundCard";

const CampgroundsList = ({ camps }) => {
    return (
        <ul>
            { camps.map(camp => <CampgroundCard camp={ camp } key={ camp._id } />) }
        </ul>
    )
}

export default CampgroundsList;