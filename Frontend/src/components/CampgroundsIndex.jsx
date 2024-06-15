import CampgroundCard from "./CampgroundCard";

const CampgroundsIndex = ({ camps }) => {
    return (
        <ul>
            { camps.map(camp => <CampgroundCard camp={ camp } key={ camp._id } />) }
        </ul>
    )
}

export default CampgroundsIndex;