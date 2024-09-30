import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Login from './pages/register/Login';
import Signup from './pages/register/Signup';
import { Toaster } from 'react-hot-toast';
import LeftBar from './component/LeftBar';
import { useEffect, useState } from 'react';
import { GoHomeFill } from 'react-icons/go';
import { IoSearch } from 'react-icons/io5';
import { FiTv } from 'react-icons/fi';
import { FaRegHeart } from 'react-icons/fa6';
import { useSelector } from 'react-redux';
import CreatePost from './component/CreatePost';
import Home from './pages/Home';
import isLogin from './hooks/isLogin';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
function App() {
  isLogin();
  let navigate = useNavigate();
  let { user, loading } = useSelector((state) => state?.user);
  let { pathname } = useLocation();
  let [openPost, setOpenPost] = useState(false);
  useEffect(() => {
    if (openPost) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [openPost]);
  let [path, setPath] = useState('');
  useEffect(() => {
    if (path === '/') {
      navigate('/');
    } else if (path === '/create-post') {
      setOpenPost(true);
    } else if (path === `/profile/${user?._id}`) {
      navigate(`/profile/${user?._id}`);
    } else if (path === '/message') {
      navigate('/message');
    }
  }, [path]);
  let isHidden = pathname.startsWith('/message');
  let isHiddenLeft =
    pathname.startsWith('/login') || pathname.startsWith('/signup');
  if (loading) {
    return (
      <div className="w-full h-screen bg-white flex flex-col items-center justify-between  ">
        <div className="flex flex-1 items-center justify-center ">
          <img
            src="https://cdn.iconscout.com/icon/free/png-256/free-instagram-logo-icon-download-in-svg-png-gif-file-formats--business-social-post-logos-icons-1646407.png?f=webp"
            alt="instalogo"
            className="  md:w-[200px] md:h-[200px] w-[140px] h-[140px] "
          />
        </div>
        <div className="flex flex-col items-center justify-center w-full ">
          <p className="text-stone-400 font-medium">from</p>
        </div>
      </div>
    );
  } else {
    return (
      <>
        {openPost && (
          <div className="  fixed inset-0  items-center justify-center md:bg-black md:bg-opacity-25 bg-white z-50">
            <div className="flex items-center justify-center ">
              <CreatePost setOpenCreatePost={setOpenPost} setPath={setPath} />
            </div>
          </div>
        )}
        <div className="flex  justify-center  relative">
          {!isHiddenLeft && (
            <div className="border h-full hidden md:block fixed top-0 left-0 z-10">
              <LeftBar setPath={setPath} path={path} />
            </div>
          )}
          <div className=" flex-1 flex justify-center">
            <Routes>
              <Route path="/" element={<Home setPath={setPath} />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/profile/:id" element={<Profile />} />
              <Route path="/edit-profile" element={<EditProfile />} />
            </Routes>
            <Toaster />
          </div>
          {!isHidden && (
            <>
              <div className="fixed bottom-0 w-full h-[40px] border-t bg-white sm:hidden flex items-center justify-around z-20">
                <GoHomeFill className="text-lg cursor-pointer" />
                <IoSearch className="text-lg cursor-pointer" />
                <FiTv className="text-lg cursor-pointer" />
                <FaRegHeart className="text-lg cursor-pointer" />
                <img
                  src={user?.profile}
                  alt="profile"
                  className="w-6 h-6 rounded-full border cursor-pointer"
                />
              </div>
            </>
          )}
        </div>
      </>
    );
  }
}

export default App;
