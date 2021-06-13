
import { useSelector } from 'react-redux';
import ProfileUserCard from './ProfileUserCard';

const Followers = ({ users, setShowFollowing }) => {
    
    const { auth } = useSelector((state) => ({ ...state }));


    return (
        <div onClick={() => setShowFollowing(false)} className="fixed h-full flex justify-center items-center bg-opacity-20 bg-gray-600 inset-0 z-0">
            <ProfileUserCard users={users} auth={auth} setShowFollowers={setShowFollowing} />
        </div>
    )
}

export default Followers
