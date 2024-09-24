import { useLocation } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { menu } from '../menu/menu';
function LeftBar({ setPath, path }) {
  let user = useSelector((state) => state?.user?.user);
  let { pathname } = useLocation();
  return (
    <div className="flex flex-col gap-5 items-start justify-start  duration-300 transition-transform  ease-in-out bg-white z-50 pl-5 pr-2 pt-4 h-screen">
      {pathname.startsWith('/message') ? (
        <></>
      ) : (
        <>
          <img
            className="w-[130px] h-[35px] hidden lg:block"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/2560px-Instagram_logo.svg.png"
            alt="insta"
          />
        </>
      )}
      {menu.map((icon, index) => (
        <button
          className={`flex items-center gap-2 justify-center hover:scale-105 hover:text-red-500 duration-100 transition-all ${
            path === icon.path ? 'border-red-500 border-l-2' : ''
          }`}
          key={index}
          onClick={() => setPath(icon.path)}>
          <span className="text-xl">{icon.icon}</span>
          {pathname.startsWith('/message') ? (
            <></>
          ) : (
            <span className="text-xs font-medium hidden lg:block">
              {icon.name}
            </span>
          )}
        </button>
      ))}
      <button
        onClick={() => setPath(`/profile/${user?._id}`)}
        className="flex items-center justify-center gap-2 ">
        <img
          className="rounded-full w-[34px] h-[34px] border"
          src={user?.profile}
          alt="profile"
        />
        {pathname.startsWith('/message')?<></>:(
          <p className="text-sm font-medium hidden lg:block">profile</p>
        )}
      </button>
      {Object.keys(user).length > 0 ? (
        <button className="text-sm font-bold text-gray-800 ">Log Out</button>
      ) : (
        ''
      )}
    </div>
  );
}

export default LeftBar;
