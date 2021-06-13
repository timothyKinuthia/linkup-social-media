import { useSelector } from 'react-redux';
import Avatar from '../../components/Avatar';
import LeftSide from "../../components/message/LeftSide"
import RightSide from "../../components/message/RightSide"



const Chat = () => {

    const { message } = useSelector((state) => ({ ...state }));

    return (
        <div className="w-full h-screen inline-flex md:space-x-4">

            <div className="hidden md:block w-1/3 px-4 border-r border-gray-100">
                <LeftSide/>
            </div>

            <div className="w-1/5 h-screen md:hidden flex flex-col items-center overflow-y-auto">
                {message.users.length > 0 && message.users.map((user) => (
                    <div key={user._id} className="my-2 flex items-center">
                        <Avatar src={user.avatar} alt="" width={8} height={8} />
                    </div>
                ))}
            </div>

            <div className="w-full h-full md:w-2/3">
                <RightSide/>
            </div>
        </div>
    )
}

export default Chat

