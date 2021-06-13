import { useSelector } from "react-redux";
import Spinner from "../Spinner";
import Suggestions from "./Suggestions";


const RightSidebar = () => {

    const { suggestions } = useSelector((state) => ({ ...state }));

    return (
        <div className="border border-gray-50 pb-4 bg-bluegray-50">
            <h3 className="py-2 text-center text-gray-700 font-semibold">Suggestions for you</h3>

            {suggestions.loading ? <Spinner/> : <Suggestions users={suggestions.users} />}
        </div>
    )
}

export default RightSidebar
