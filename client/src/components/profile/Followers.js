
import { useSelector } from 'react-redux';
import ProfileUserCard from './ProfileUserCard';

const Followers = ({ users, setShowFollowers }) => {
    
    const { auth } = useSelector((state) => ({ ...state }));


    return (
        <div onClick={() => setShowFollowers(false)} className="fixed h-full flex justify-center items-center bg-opacity-60 bg-gray-600 inset-0 z-0">
            <ProfileUserCard users={users} auth={auth} setShowFollowers={setShowFollowers} />
        </div>
    )
}

export default Followers
