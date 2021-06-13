import { useEffect } from 'react';
import { useDispatch } from "react-redux";

const Toast = ({ msg, handleShow, bgColor }) => {
    
    const dispatch = useDispatch();


    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch({type: "NOTIFY", payload: {}})
        }, 3000)

        return () => clearTimeout(timer);
    }, [dispatch])



    return (
        <div className={`fixed right-8 z-10 text-white top-1 py-2 px-2 rounded ${bgColor}`}>
            <div className="flex justify-between">
                <div>{msg.title}</div>
                <button onClick={handleShow} className="text-coolgray-900 font-bold focus:outline-none">&times;</button>
            </div>
            <div>{msg.body}</div>
        </div>
    )
}

export default Toast
