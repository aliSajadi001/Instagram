import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IoPersonAddOutline } from 'react-icons/io5';
import { IoAdd } from 'react-icons/io5';
import { LuTv } from 'react-icons/lu';
import { LuContact2 } from 'react-icons/lu';
import { LuGrid } from 'react-icons/lu';
import { useEffect, useState } from 'react';
import Axios from '../Axios/axios';
import { PiCameraLight } from 'react-icons/pi';
import { getProfileInfo } from '../redux/userSlice';
import useGetProfile from '../hooks/useGetProfile';
import { FaAngleDown } from 'react-icons/fa6';
import { CiAt } from 'react-icons/ci';
import { CiSquarePlus } from 'react-icons/ci';
import { LuMenu } from 'react-icons/lu';

function Profile() {
  let dispatch = useDispatch();
  let { id } = useParams();
  useGetProfile(id);
  let { profile, user } = useSelector((state) => state?.user);
  let [followers, setFollowers] = useState(0);
  let [following, setFollowing] = useState(0);
  let [isFollow, setIsFollow] = useState(user?.following?.includes(id));
  let [isFollowing, setIsFollowing] = useState(user?.following?.includes(id));
  let isMyAccount = user?._id === profile?._id;
  useEffect(() => {
    setFollowers(profile?.followers?.length);
    setFollowing(profile?.following?.length);
    return () => {
      setFollowers(0);
      setFollowing(0);
    };
  }, [profile]);
  let [tab, setTab] = useState('post-profile');
  let [loading, setLoading] = useState(false);
  //////////////// Get profile posts////////////////
  useEffect(() => {
    dispatch(getProfileInfo([]));
    let fetchPosts = async () => {
      try {
        setLoading(true);
        let { data } = await Axios.get(`post/${tab}/${id}`);
        if (data.success) {
          setLoading(false);
          dispatch(getProfileInfo(data.posts));
        }
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    fetchPosts();
  }, [tab]);
  let { profileInfo } = useSelector((state) => state?.user);

  //////////// Followe functionalety/////////////////////
  let handleFollowe = async () => {
    try {
      let { data } = await Axios.post(`user/follow-unfollow/${id}`);
      if (data?.success) {
        setIsFollow(!isFollow);
        setIsFollowing(!isFollowing);
        setFollowers(followers + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //////////// UnFollowe functionalety/////////////////////

  let handleUnFollowe = async () => {
    try {
      let { data } = await Axios.post(`user/follow-unfollow/${id}`);
      if (data?.success) {
        setIsFollow(!isFollow);
        setIsFollowing(!isFollowing);
        setFollowers(followers - 1);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex justify-center w-full h-screen ">
      {Object.keys(profile).length === 0 ? (
        <div className="flex  justify-center w-full h-full">
          <span className="loader"></span>
        </div>
      ) : (
        <>
          <div className="flex justify-start flex-col w-full gap-3 px-2">
            <div className="flex items-center justify-between pt-3 md:hidden">
              <div className="flex items-center gap-[2px]">
                <p className="font-bold md:hidden">{profile?.userName}</p>
                <FaAngleDown className="text-xs" />
              </div>
              <div className="flex items-center space-x-3">
                <CiAt className="size-5 " />
                <CiSquarePlus className="size-5 " />
                <LuMenu className="size-5" />
              </div>
            </div>
            <div className="flex mt-5 md:justify-center w-full md:gap-14 gap-4">
              {/* profile page left */}
              <div className="flex flex-col ">
                <img
                  src={profile.profile}
                  alt="profile"
                  className="md:w-[130px] md:h-[130px] w-[50px] h-[50px] rounded-full border"
                />
              </div>
              {/* profile page right */}
              <div className="flex flex-col gap-3  ">
                <div className="md:flex items-center md:gap-2 hidden ">
                  <p className="font-medium">{profile?.userName}</p>
                  {isMyAccount ? (
                    <>
                      <Link
                        to="/edit-profile"
                        className="font-normal bg-stone-100 rounded-lg px-1">
                        Edit profile
                      </Link>
                      <p className="font-normal bg-stone-100 rounded-lg px-1">
                        View archive
                      </p>
                      <p className="font-normal bg-stone-100 rounded-lg px-1">
                        Ad tools
                      </p>
                      <img
                        src="https://marketplace.canva.cn/-cOTM/MAEwov-cOTM/1/tl/canva-buildable-instagram-ui-settings-icon-MAEwov-cOTM.png"
                        className="w-5 h-5 rounded-full"
                      />
                    </>
                  ) : isFollowing ? (
                    <>
                      <button
                        onClick={() => handleUnFollowe()}
                        className="bg-stone-300 hover:bg-stone-400 px-2 py-[1px] text-sm font-medium rounded-md ">
                        Unfollow
                      </button>
                      <button className="bg-stone-300 hover:bg-stone-400 px-2 py-[1px] text-sm font-medium rounded-md ">
                        Message
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleFollowe()}
                        className="bg-blue-500 hover:bg-blue-600 px-7 py-[1px] text-sm font-medium rounded-md text-white">
                        Follow
                      </button>
                    </>
                  )}
                </div>
                <div className="flex items-center space-x-5">
                  <p className="font-normal md:font-bold text-xs md:text-sm flex flex-col md:flex-row items-center md:gap-2">
                    <span className="md:text-lg text-sm font-bold ">
                      {profile?.post?.length}
                    </span>
                    posts
                  </p>
                  <p className="font-normal md:font-bold text-xs md:text-sm flex flex-col md:flex-row items-center md:gap-2">
                    <span className="md:text-lg text-sm font-bold">
                      {followers}
                    </span>
                    followers
                  </p>
                  <p className="font-normal md:font-bold text-xs md:text-sm flex flex-col md:flex-row items-center md:gap-2">
                    <span className="md:text-lg text-sm font-bold">
                      {following}
                    </span>
                    following
                  </p>
                </div>
                <p className="font-medium md:block hidden">{profile?.bio}</p>
              </div>
            </div>
            <p className="font-normal md:hidden text-xs w-full ">
              {profile?.bio}
            </p>
            <div className="flex items-center gap-2 w-full justify-between md:hidden ">
              {isMyAccount ? (
                <>
                  <button className="text-xs font-normal md:font-bold bg-stone-100 rounded-md px-5 py-[4px] ">
                    Edit profile
                  </button>
                  <button className="text-xs font-normal md:font-bold bg-stone-100 rounded-md px-5 py-[4px] ">
                    Share profile
                  </button>
                </>
              ) : (
                <>
                  {isFollow ? (
                    <button className="text-xs text-white font-bold bg-blue-500 hover:bg-blue-600 rounded-[5px] px-7 py-[4px] ">
                      Following
                    </button>
                  ) : (
                    <button className="text-xs text-white font-bold bg-blue-500 hover:bg-blue-600 rounded-[5px] px-7 py-[4px] ">
                      Follow
                    </button>
                  )}
                  <button className="text-xs font-bold bg-stone-300 hover:bg-stone-400 rounded-[5px] px-7 py-[4px] ">
                    Message
                  </button>
                </>
              )}

              <button>
                <IoPersonAddOutline className=" bg-zinc-100 rounded-md   size-6 px-1 py-[1px]" />
              </button>
            </div>
            <div>
              <button className=" border p-2 rounded-full">
                <IoAdd className="size-18" />
              </button>
            </div>
            <div className="flex justify-center w-full h-full ">
              <div className="flex flex-col md:pl-32 gap-7 md:w-[80%] w-full  items-center">
                {/*icons */}
                <div className="flex items-center w-full justify-around border-b">
                  <button
                    onClick={() => setTab('post-profile')}
                    className={`w-[80px] md:w-[140px] pb-2 ${
                      tab === 'post-profile'
                        ? 'border-b border-black duration-1000  ease-in-out transition-all'
                        : ''
                    }  flex items-center justify-center`}>
                    <LuGrid />
                  </button>
                  <button
                    onClick={() => setTab('post-saves')}
                    className={`w-[80px] md:w-[140px] ${
                      tab === 'post-saves'
                        ? 'border-b border-black duration-1000 ease-in-out transition-all'
                        : ''
                    } pb-2 flex items-center justify-center`}>
                    <LuTv />
                  </button>
                  <button
                    onClick={() => setTab('/')}
                    className={`w-[80px] hidden md:block md:w-[140px] pb-2 ${
                      tab === '/'
                        ? 'border-b border-black duration-1000  ease-in-out transition-all'
                        : ''
                    } flex items-center justify-center`}>
                    <LuContact2 />
                  </button>
                </div>
                {loading ? (
                  <>
                    <div className="flex  justify-center w-full h-full">
                      <span className="loader"></span>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      {Object.values(profileInfo).length === 0 ? (
                        <div className="flex items-center justify-center w-full h-[90vh]">
                          <p className=" flex flex-col items-center justify-center md:gap-3 gap-2">
                            <PiCameraLight className="md:size-28 md:border-4 size-16 border-2 border-black p-2 rounded-full " />
                            <p className="font-medium md:text-2xl ">
                              No Posts Yet
                            </p>
                          </p>
                        </div>
                      ) : (
                        <>
                          <div className="w-full  grid grid-cols-3 md:grid-cols-4 gap-[1px]">
                            {profileInfo?.map((post) => (
                              <section key={post._id}>
                                <img
                                  src={post.image}
                                  alt="ppst"
                                  className="w-full h-[90px] md:h-[140px]"
                                />
                              </section>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Profile;
