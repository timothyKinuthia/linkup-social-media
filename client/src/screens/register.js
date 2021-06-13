import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { register } from '../store/actions/authActions';
import { EyeIcon } from '../icon';
import './input.css'


const inputStyles = "border-b text-gray-900 placeholder-gray-400 block w-full py-2 px-4 focus:border-orange-500 focus:outline-none focus:bg-white";

const spanStyles = "bg-black py-1 px-2 lg:px-4 text-lg font-semibold text-gray-50 rounded-md shadow-2xl";

const Register = () => {

    const { auth } = useSelector((state) => ({ ...state }));


    const history = useHistory();

    const initialState = { fullname: '', username: '', email: '', password: '', confirmPassword: '', gender: 'male' };

    const [userData, setUserData] = useState(initialState);

    const [showPassword, setShowPassword] = useState(false);

    const { fullname, username, email, password, confirmPassword } = userData;

    const dispatch = useDispatch();

    useEffect(() => {
        if (auth.token) {
            history.push('/home')
        }
    }, [history, auth.token]);


    const validateData = () => {

        let error = {};
        const regex = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;

        if (!email || !password || !username || !fullname) {
            error.blank = "Please fill all the fields!";
            dispatch({ type: "NOTIFY", payload: {error: error.blank} });
            return false;
        }

        if (password !== confirmPassword) {
            error.message = "Passwords should match";
            dispatch({ type: "NOTIFY", payload: {error: error.message} });
            return false;
        }

        if (username.length > 25) {
            error.message = "username too long!";
            dispatch({ type: "NOTIFY", payload: {error: error.message} });
            return false;
        }

        if (password.length < 6) {
            error.message = "Password should have more than 6 characters";
            dispatch({ type: "NOTIFY", payload: {error: error.message} });
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
        
        setUserData({...userData, [evt.target.name]: evt.target.value.replace(/ /g, '')});
    }

    const onSubmit = (evt) => {

        evt.preventDefault();

        if (!validateData()) {
            return;
        }

        dispatch(register(userData));

    }

    return (
        <div className="h-screen flex items-start justify-center  bg-gray-100 font-comfotaar">
            <form onSubmit={onSubmit} className="relative w-2/3 sm:w-1/3 mt-8 py-5 px-0.5 sm:px-2 xl:px-8 space-y-2 sm:space-y-4 bg-white flex flex-col items-center rounded-lg shadow-2xl">
                <h1 className="text-xl font-extrabold text-gray-900 tracking-wide">Sign Up</h1>
                <div className="space-x-1 block w-full text-center">
                    <span className="inline-block bg-black py-1 px-2 lg:px-4 transform -rotate-12 text-lg font-semibold text-gray-50 rounded-md shadow-2xl">C</span>
                    <span className={spanStyles}>O</span>
                    <span className="inline-block bg-black  py-1 px-2 lg:px-4 transform rotate-12 text-lg font-semibold text-gray-50 rounded-md shadow-2xl">N</span>
                    <span className={spanStyles}>N</span>
                    <span className="inline-block bg-black py-1 px-2 lg:px-4 transform -rotate-12 text-lg font-semibold text-gray-50 rounded-md shadow-2xl">E</span>
                    <span className={spanStyles}>C</span>
                    <span className="inline-block bg-black py-1 px-2 lg:px-4 text-lg transform rotate-12 font-semibold text-gray-50 rounded-md shadow-2xl">T</span>
                </div>

                <input className={inputStyles} type="text" placeholder="Full Name" name="fullname" value={fullname} onChange={onInputChange} />

                <input className={inputStyles} type="text" placeholder="Username" name="username" value={username} onChange={onInputChange} />

                <input className={inputStyles} type="text" placeholder="Email" name="email" value={email} onChange={onInputChange} />

                <div className="relative block w-full">
                    <EyeIcon showPassword={showPassword} setShowPassword={setShowPassword} />
                    <input className={inputStyles} type={showPassword ? "text" : "password"} placeholder="Password" name="password" value={password} onChange={onInputChange} />
                </div>

                <div className="relative block w-full">
                    <input className={inputStyles} type={showPassword ? "text" : "password"} placeholder="Confirm Password" name="confirmPassword" value={confirmPassword} onChange={onInputChange} />
                </div>

                <div className="w-full text-xs sm:text-sm flex justify-around items-center">
                    <label className="flex items-center justify-around space-x-0.5 sm:space-x-2" htmlFor="male">
                        <span>Male:</span> <input type="radio" name="gender" value="male" id="male" defaultChecked onChange={onInputChange} />
                    </label>

                    <label className="flex items-center justify-around space-x-0.5 sm:space-x-2" htmlFor="female">
                        <span>Female:</span> <input type="radio" name="gender" value="female" id="female" onChange={onInputChange} />
                    </label>

                    <label className="flex items-center justify-between space-x-0.5 sm:space-x-2" htmlFor="other">
                        <span>Other</span>: <input type="radio" name="gender" value="other" id="other" onChange={onInputChange} />
                    </label>
                </div>

                <button className="py-2 px-6 block w-full rounded-xl bg-orange-500 text-sm font-bold text-white tracking-wider shadow-xl focus:outline-none hover:bg-orange-600" >Sign Up</button>

                <p className="text-gray-900">Already have an account? <Link className="ml-1 text-orange-500 font-medium" to='/login'>login here</Link></p>
            </form>
            
        </div>
    )
};

export default Register;