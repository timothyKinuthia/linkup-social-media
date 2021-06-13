
import LeftSide from "../../components/message/LeftSide"
import vect2 from "../../assets/images/vect2.jpg"


const Chat = () => {
    return (
        <div className="w-full h-screen flex">
            <div className="w-full md:w-2/3 lg:w-1/3 border-r border-gray-100">
                <LeftSide/>
            </div>
            <div className="hidden h-screen md:flex md:w-2/3 justify-center">
                <div className="relative">
                    <div className="absolute inset-0 bg-white bg-opacity-60">
                    </div>
                    <img className="w-full h-full object-cover" src={vect2} alt="" />
                </div>
            </div>
        </div>
    )
}

export default Chat
