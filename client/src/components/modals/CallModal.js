import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CallIcon, VideoIcon } from "../../icon";
import { actionTypes } from "../../store/actions/actionTypes";
import Avatar from "../Avatar";

const CallModal = () => {

    const [min, setMin] = useState(0);
    const [second, setSecond] = useState(0);
    const [total, setTotal] = useState(0);
    const [answer, setAnswer] = useState(false);

    const dispatch = useDispatch();
    const { call } = useSelector((state) => ({ ...state }));

    const handleEndCall = () => {

        dispatch({ type: actionTypes.CALL, payload: null });
    };

    useEffect(() => {
        const setTime = () => {
            setTotal((prev) => prev + 1);
            setTimeout(setTime, 1000)
        };

        setTime();

        return () => setTotal(0);

    }, []);

    useEffect(() => {

        setSecond(total%60);
        setMin(parseInt(total / 60));

    }, [total]);

    useEffect(() => {
        if (answer) {
            setTotal(0);
        } else {
            const timer = setTimeout(() => {
                dispatch({ type: actionTypes.CALL, payload: null });
            }, 15000);
    
            return () => clearTimeout(timer);
        }
    }, [dispatch, answer]);

    const handleAnswer = () => {
        setAnswer(true);
    }

    return (
        <div className="fixed z-50 inset-0 bg-black bg-opacity-70 flex justify-center items-center">
            <div className="bg-bluegray-800 text-blue-200 py-4 px-6 flex flex-col space-y-4 rounded-md w-2/3 sm:w-1/2 md:w-1/3 lg:w-1/4">
                <div className="space-y-1 flex flex-col items-center">
                    <Avatar src={call.avatar} alt="" width={20} height={20} />
                    <h3 className="mt-4">{call.username}</h3>
                    <h3 className="text-xs">{call.fullname}</h3>

                    <div>
                        {call.video ? <span>Video calling...</span> : <span>Audio calling...</span> }
                    </div>
                </div>
                <div className="text-center">
                    <span>{min.toString().length < 2 ? '0' + min : min}</span>
                    <span>:</span>
                    <span>{second.toString().length < 2 ? '0' + second : second}</span>
                </div>

                <div className="flex justify-around cursor-pointer">
                    <span onClick={() => handleEndCall()} className="text-red-700 bg-red-300 py-1 px-1 rounded-full"><CallIcon /></span>
                    
                    {call.video ? <span onClick={() => handleAnswer()} className="text-teal-700 bg-teal-300 py-1 px-1 rounded-full"><VideoIcon/></span> : <span onClick={() => handleAnswer()} className="text-teal-700 bg-teal-300 py-1 px-1 rounded-full"><CallIcon/></span>}
                </div>
            </div>
        </div>
    )
}

export default CallModal
