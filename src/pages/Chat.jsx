import { useDispatch, useSelector } from 'react-redux';
import { FaRegEdit } from 'react-icons/fa';
import { getSingleUser } from '../redux/chatSlice';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { FaArrowLeftLong } from 'react-icons/fa6';

function Chat({ setPath }) {
  let dispatch = useDispatch();
  let { user } = useSelector((state) => state?.user);
  let { suggestUsers } = useSelector((state) => state?.user);
  let { onlineUsers } = useSelector((state) => state?.io);
  let { singleUser } = useSelector((state) => state?.chat);
  let { pathname } = useLocation();
  let goBack = () => {
    setPath('/');
  };
  return (
    <div className="flex w-full md:ml-[83px] h-screen ">
      {/********* Conversation listes *********/}
      <div
        className={`md:w-[260px] lg:w-[300px] break-all border-r md:block h-screen w-full ${
          Object.keys(singleUser).length === 0 ? 'block' : 'hidden'
        } `}>
        <div className="flex flex-col  md:border-b">
          <div className="flex justify-between items-center px-3 lg:h-20 md:h-12 text-xl">
            <div className="flex items-center justify-center gap-4">
              <FaArrowLeftLong
                onClick={() => goBack()}
                className="cursor-pointer font-mono text-lg mt-2 block md:hidden"
              />
              <p className="font-medium">{user?.userName}</p>
            </div>
            <span className="text-xl">
              <FaRegEdit />
            </span>
          </div>
          <div className="flex items-center md:justify-around justify-between w-full font-medium text-sm gap-3">
            <p className="border-b border-black w-full flex items-center justify-center text-xs py-2 hidden md:block">
              Primary
            </p>
            <p className="w-full  flex items-center justify-center text-xs py-2 text-stone-500 hidden md:block">
              General
            </p>
            <p className="w-full flex items-center justify-center text-xs py-2 text-stone-500 hidden md:block">
              Requests
            </p>
            <p className="w-full  flex justify-center  text-xs py-2 text-black font-medium  md:hidden">
              Messages
            </p>
            <p className="w-full flex justify-center  text-xs py-2 text-black   md:hidden">
              Request
            </p>
          </div>
        </div>
        <div className="w-full h-[515px] overflow-y-scroll  flex-col  justify-start p-3">
          <div className="flex flex-col  justify-center">
            <img
              src={user?.profile}
              className="w-12 h-12 rounded-full"
              alt=""
            />
            <p className="text-stone-500 text-xs ">Your note</p>
          </div>
          <div className="flex flex-col justify-start gap-2 pt-5">
            {suggestUsers &&
              suggestUsers.map((user) => {
                let online = onlineUsers.includes(user._id);
                return (
                  <Link
                    onClick={() => dispatch(getSingleUser(user))}
                    to={`/message/${user._id}`}
                    className="flex items-center gap-3 "
                    key={user._id}>
                    <img
                      src={user.profile}
                      alt="profile"
                      className="w-10 h-10 rounded-full border"
                    />
                    <div className="flex flex-col justify-start ">
                      <p className="text-sm">{user.userName}</p>
                      {online ? (
                        <p className=" greenText text-xs font-medium">online</p>
                      ) : (
                        <p className="text-red-500 text-xs font-medium">
                          offline
                        </p>
                      )}
                    </div>
                  </Link>
                );
              })}
          </div>
        </div>
      </div>

      {pathname === '/message' ? (
        <div className="w-full h-full hidden md:flex flex-col items-center justify-center gap-3 ">
          <img
            src="https://cdn.iconscout.com/icon/premium/png-256-thumb/messenger-1867903-1580059.png?f=webp"
            alt="message"
            className="w-20 h-20 rounded-full border-2 border-black p-5"
          />
          <div className="flex flex-col items-center justify-center">
            <p className="font-medium">Your message</p>
            <p className="text-stone-400 text-sm">
              Send a message to start a chat
            </p>
          </div>

          <button className="text-white text-sm bg-blue-600 font-medium rounded-[8px] py-1 px-6">
            Send message
          </button>
        </div>
      ) : (
        <div
          className={`flex w-full ${
            Object.keys(singleUser).length > 0 ? 'block' : 'hidden'
          } md:block `}>
          <Outlet />
        </div>
      )}
    </div>
  );
}

export default Chat;
