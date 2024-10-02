import { IoKeyOutline } from 'react-icons/io5';
import { AiOutlineMail } from 'react-icons/ai';
import { BiShow } from 'react-icons/bi';
import { BiHide } from 'react-icons/bi';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Axios from '../../Axios/axios';
import { currentUserInfo } from '../../redux/userSlice';
function Login() {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let [show, setShow] = useState(false);
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let [err, setErr] = useState({});
  let [loading, setLoading] = useState(false);
  let passwordRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  const emailRegEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  ///////////////// handleSubmot login info/////////////////////
  let handleSubmit = async (e) => {
    e.preventDefault();
    let errors = {};
    ////////Email testing/////////////
    if (!email.length) {
      errors.email = 'Email is required';
    } else if (!emailRegEx.test(email)) {
      errors.email = 'Email is not valid';
    }
    /////////////Password tessting/////
    if (!passwordRegEx.test(password)) {
      errors.password = 'The password must include a to (a-z , A-Z , 0-9)';
    } else if (!password) {
      errors.password = 'Password is required';
    }
    setErr(errors);
    if (Object.keys(errors).length === 0) {
      try {
        setLoading(true);
        let { data } = await Axios.post('user/login/', {
          email,
          password,
        });
        if (data.success) {
          dispatch(currentUserInfo(data?.user));
          toast.success(data.message);
          setEmail('');
          setPassword('');
          navigate('/');
        } else {
          toast.error(data.message);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);

        console.log(error);
      }
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="w-full h-screen flex  items-center justify-center background ">
      <div className="flex flex-col items-center justify-center gap-5 h-[70%] sm:h-[90%] rounded-xl bg-white bg-opacity-15 backdrop-blur-sm w-[90%] sm:w-[70%] md:w-[60%] xl:w-[40%] relative">
        <div>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/640px-Instagram_logo.svg.png"
            alt="instagram"
            className="max-w-[300px] h-[40px]"
          />
        </div>
        <div
          className={`border ${
            err.email ? 'border-red-500' : 'border-white'
          } focus-within:ring-1 ring-white  flex items-center gap-2 justify-center w-[80%] sm:w-[400px]  rounded-lg px-2 py-1 `}>
          <AiOutlineMail className="text-white" />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="  w-full bg-transparent outline-none placeholder:text-white placeholder:text-xs text-white"
            type="email"
            placeholder="Email"
          />
        </div>
        {err.email && (
          <p className="text-sm text-red-500 font-medium">{err.email}</p>
        )}
        <div
          className={`border ${
            err.password ? 'border-red-500' : 'border-white'
          } focus-within:ring-1 ring-white  flex items-center gap-2 justify-center w-[80%] sm:w-[400px]  rounded-lg px-2 py-1 `}>
          <IoKeyOutline className="text-white" />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="  w-full bg-transparent outline-none placeholder:text-white placeholder:text-xs text-white"
            type={show ? 'text' : 'password'}
            placeholder="************"
          />
          {show ? (
            <BiHide
              onClick={() => setShow(!show)}
              className="cursor-pointer text-xl text-white"
            />
          ) : (
            <BiShow
              onClick={() => setShow(!show)}
              className="cursor-pointer text-xl text-white"
            />
          )}
        </div>
        {err.password && (
          <p className="text-sm  text-red-500 font-medium">{err.password}</p>
        )}

        <Link
          className="text-sm  underline text-blue-500"
          to="/forget-password">
          Forget password ?
        </Link>

        <button
          disabled={loading}
          className="w-[80%] text-white disabled:cursor-not-allowed sm:w-[400px] md:py-1 rounded-lg font-medium md:text-lg text-sm py-2 disabled:bg-blue-300 bg-blue-500 ">
          Log in
        </button>
        <span
          onClick={() => navigate('/signup')}
          className="text-stone-300 text-xs flex items-center gap-1 cursor-pointer fixed bottom-2">
          Already have an account?
          <span className="text-blue-800 font-medium"> Sign up</span>
        </span>
      </div>
    </form>
  );
}

export default Login;
