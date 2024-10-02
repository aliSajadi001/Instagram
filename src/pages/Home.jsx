import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { FaRegSquarePlus } from 'react-icons/fa6';
import { LuSend } from 'react-icons/lu';
import Post from '../component/Post';
import useGetPosts from '../hooks/useGetPosts';
import RightBar from '../component/RightBar';
import useGetStoris from '../hooks/useGetStoris';
import { FiPlus } from 'react-icons/fi';

function Home({ setPath }) {
  useGetStoris();
  useGetPosts();
  let { post } = useSelector((state) => state?.post);
  let { user } = useSelector((state) => state?.user);
  let { storis } = useSelector((state) => state?.user);
  let [isFixed, setFixed] = useState(false);
  let handleScroll = () => {
    if (window.scrollY > 70) {
      setFixed(true);
    } else {
      setFixed(false);
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
  }, []);
  return (
    <>
      <div className="flex justify-center md:gap-8 w-full lg:gap-20  relative z-30  md:ml-[160px]">
        <div
          className={`flex flex-col gap-4 sm:mb-60  items-center sm:w-[50%] md:w-[90%] lg:w-[30%] ${
            isFixed ? 'md:mr-[380px]' : ''
          }`}>
          <div className="flex flex-col w-full items-center justify-center">
            <div className="w-full flex items-center justify-between px-3 md:hidden">
              <FaRegSquarePlus
                className="text-xl cursor-pointer "
                onClick={() => setPath('/create-post')}
              />
              <img
                className="w-[120px] h-[30px]  md:hidden"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/2560px-Instagram_logo.svg.png"
                alt="insta"
              />
              <LuSend
                className="text-xl cursor-pointer "
                onClick={() => setPath('/message')}
              />
            </div>
            {/******************storis*******************/}
            <div className="w-screen md:w-full overflow-x-auto scrollbar-thin scrollbar-track-black flex items-start  gap-3 p-3 ">
              {/******************My stori***************/}
              <div className="min-w-[50px] min-h-[50px] sm:w-[50px] sm:h-[50px] md:w-[50px] md:h-[50px] rounded-full p-[2px]  relative ">
                <div className="w-[50px] h-[50px]">
                  <img
                    src={user?.profile}
                    className="w-full h-full rounded-full flex items-center justify-center "
                  />
                </div>
                <span className="absolute bg-blue-600 rounded-full border border-white text-white top-7 left-9 p-[2px]">
                  <FiPlus />
                </span>
              </div>
              {/******************Other storis***********/}
              <div className="flex items-center justify-start gap-3">
                {storis &&
                  storis.map((stori, i) => (
                    <div
                      key={i}
                      className="flex flex-col items-center  w-full ">
                      <div className="w-[50px] h-[50px] rounded-full p-[2px] border border-red-600">
                        <img
                          src={stori?.profile}
                          alt="profile"
                          className="rounded-full w-full h-full"
                        />
                      </div>
                      <p className="text-xs">{stori?.userName}</p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col items-start gap-5 ">
            {post && post.map((pst) => <Post key={pst._id} pst={pst} />)}
          </div>
        </div>
        <div
          className={`hidden lg:block transition-all duration-500 ease-in-out lg:pl-[100px] ${
            isFixed ? 'fixed -top-[62px] right-[190px]' : ''
          }`}>
          <RightBar />
        </div>
      </div>
    </>
  );
}

export default Home;
