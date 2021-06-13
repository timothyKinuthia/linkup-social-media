import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../store/actions/authActions';
import { EyeIcon } from '../icon';


const inputStyles = "border-b text-gray-900 placeholder-gray-400 block w-full py-2 px-4 focus:border-orange-500 focus:outline-none focus:bg-white";

const spanStyles = "bg-black py-1 px-2 lg:px-4 text-lg font-semibold text-gray-50 rounded-md shadow-2xl";

const Login = ({history}) => {

    const initialState = { email: '', password: '' };

    const [userData, setUserData] = useState(initialState);

    const [errors, setErrors] = useState({});

    const [showPassword, setShowPassword] = useState(false)

    const { email, password } = userData;

    const dispatch = useDispatch();

    const { auth } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        if (auth.token) {
            history.push('/home')
        }
    }, [auth.token, history]);

    const validateData = () => {

        let error = {};
        const regex = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;

        if (!email || !password) {
            error.blank = "email and password required!";
            dispatch({ type: "NOTIFY", payload: {error: error.blank} });
            return false;
        }

        if (!regex.test(email)) {
            error.email = "Email is Invalid!";
            dispatch({ type: "NOTIFY", payload: { error: error.email } });
            return false;
        }

        return true;

        
    }

    const onInputChange = (evt) => {
        setErrors({});
        setUserData({...userData, [evt.target.name]: evt.target.value.replace(/ /g, '')});
    }

    const onSubmit = (evt) => {

        evt.preventDefault();

        if (!validateData()) {
            return;
        }

        dispatch(login(userData));

    }

    return (
        <div className="h-screen flex items-start justify-center  bg-gray-100 font-comfotaar">
            <form onSubmit={onSubmit} className="relative w-2/3 sm:w-1/3 mt-8 py-6 px-2 xl:px-8 space-y-6 bg-white flex flex-col items-center rounded-lg shadow-2xl">
                <h1 className="text-xl font-extrabold text-gray-900 tracking-wide">Welcome</h1>
                <div className="space-x-1 block w-full text-center">
                    <span className="inline-block bg-black py-1 px-2 lg:px-4 transform -rotate-12 text-lg font-semibold text-gray-50 rounded-md shadow-2xl">C</span>
                    <span className={spanStyles}>O</span>
                    <span className="inline-block bg-black  py-1 px-2 lg:px-4 transform rotate-12 text-lg font-semibold text-gray-50 rounded-md shadow-2xl">N</span>
                    <span className={spanStyles}>N</span>
                    <span className="inline-block bg-black py-1 px-2 lg:px-4 transform -rotate-12 text-lg font-semibold text-gray-50 rounded-md shadow-2xl">E</span>
                    <span className={spanStyles}>C</span>
                    <span className="inline-block bg-black py-1 px-2 lg:px-4 text-lg transform rotate-12 font-semibold text-gray-50 rounded-md shadow-2xl">T</span>
                </div>

                    
                <input className={inputStyles} type="text" placeholder="Email" name="email" value={email} onChange={onInputChange} />

                <div className="relative block w-full">
                    <EyeIcon showPassword={showPassword} setShowPassword={setShowPassword} />
                    <input className={inputStyles} type={showPassword ? "text" : "password"} placeholder="Password" name="password" value={password} onChange={onInputChange} />
                </div>

                <button className="py-2 px-6 block w-full rounded-xl bg-orange-500 text-sm font-bold text-white tracking-wider shadow-xl focus:outline-none hover:bg-orange-600" >Login</button>

                <p className="text-gray-900">You dont have an account? <Link className="ml-1 text-orange-500 font-medium" to='/register'>SignUp</Link></p>

                {errors && errors.blank && <h2 className="w-full text-red-500 text-center">{errors.blank}</h2>}
                {errors && errors.email && <h2 className="w-full text-red-500 text-center">{errors.email}</h2>}
            </form>
            
        </div>
    )
}

export default Login
