import Posts from "../components/home/Posts";
import Status from "../components/home/Status";
import Spinner from "../components/Spinner";


import { useSelector } from 'react-redux';
import RightSidebar from "../components/sidebar/RightSidebar";


const Home = () => {

    const { homeposts } = useSelector((state) => ({ ...state }));


    return (
        <div className="inline-flex w-full h-full mb-10 font-comfotaar">
            <div className=" flex flex-col justify-start items-center w-full lg:w-2/3">
                <Status />
                {homeposts.loading ? <Spinner /> : homeposts.result.length === 0 || homeposts.posts.length === 0 ? <h1 className="text-center">No posts added</h1> : <Posts />}
            </div>
            
            <div className="hidden lg:block lg:w-1/3 mt-6 mr-1 lg:mr-4 ml-2 lg:ml-6">
                <RightSidebar/>
            </div>
        </div>
    )
}

export default Home
