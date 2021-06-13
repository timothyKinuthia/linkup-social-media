
import { useDispatch } from 'react-redux';
import { actionTypes } from '../../store/actions/actionTypes';

const ShowModal = () => {

    const dispatch = useDispatch();
    
    return (
        <div onClick={() => dispatch({type: actionTypes.NOTIFY, payload: {}})} className="fixed flex flex-col z-10 inset-0 top-16 w-full text-white cursor-pointer">
            <div className="bg-black bg-opacity-10 flex-1"></div>
        </div>
    )
}

export default ShowModal
