import { Link } from "react-router-dom";
import Avatar from "../Avatar";
import FollowBtn from "../FollowBtn";


const Suggestions = ({ users }) => {
    
    return (
        <div className="space-y-4">
            {users.map((user) => (
                <div key={user._id} className="px-2 flex items-center justify-between border-t border-gray-100">
                    <div className="mt-3 flex items-center">
                        <Avatar src={user.avatar} alt={user.username} width={10} height={10} />
                        <Link to={`/profile/${user._id}`} className="ml-3 font-semibold text-sm text-bluegray-800 hover:text-bluegray-900">{user.username}</Link>
                    </div>
                    <span className="mt-3"><FollowBtn user={user} /></span>
                </div>
            ))}
        </div>
    )
}

export default Suggestions
