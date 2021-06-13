import { useSelector } from 'react-redux';

const NotFound = () => {

    const { notify } = useSelector((state) => ({ ...state }));

    if (notify.loading) {
        return '';
    }

    return (
        <div className="flex justify-center items-center">
            <h1 className="text-3xl text-coolgray-600">404 | Not found!</h1>
        </div>
    )
}

export default NotFound
