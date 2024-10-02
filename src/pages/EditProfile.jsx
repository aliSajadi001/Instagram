import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import uploadFile from '../hellper/cloudinary';
import {
  appAbdMedia,
  forFamilies,
  forProfessional,
  infoAndSupport,
  metaIcons,
  others,
  profileNotif,
  whatYouSee,
  whoCanSeeYourContent,
} from '../menu/menu';
import { useLocation, useNavigate } from 'react-router-dom';
import Axios from '../Axios/axios';
import toast from 'react-hot-toast';
import { currentUserInfo } from '../redux/userSlice';
function EditProfile() {
  let navigate = useNavigate();
  let { pathname } = useLocation();
  let { user } = useSelector((state) => state?.user);
  let dispatch = useDispatch();
  let [userName, setUserName] = useState(user?.userName);
  let [bio, setBio] = useState(user?.bio);
  let [loading, setLoading] = useState(false);
  let [profile, setProfile] = useState(user?.profile);
  let [gender, setGender] = useState(user?.gender);
  ////////////////// convert image to dataUrl/////////////
  let handleImage = async (image) => {
    try {
      setLoading(true);
      let data = await uploadFile(image);
      if (data) {
        setProfile(data.url);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);

      console.log(error);
    }
  };
  useEffect(() => {
    if (pathname === '/edit-profile') {
      document.body.style.overflow = 'hidden';
    }
  }, [pathname]);
  ////////////////Send and Get changed information//////////////
  let handleSubmit = async () => {
    try {
      setLoading(true);
      let { data } = await Axios.post('user/edit-profile', {
        profile,
        userName,
        bio,
        gender,
      });
      if (data?.success) {
        dispatch(
          currentUserInfo({
            profile: data.user.profile,
            userName: data.user.userName,
            bio: data.user.bio,
            _id: data.user._id,
          })
        );
        toast.success(data.message);
        navigate(`/profile/${user._id}`);
      } else {
        toast.error(data.message);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <div className="flex justify-end w-full h-full ">
      <div className=" flex md:w-5/6  h-screen ">
        {/***********settings section***********/}

        <div className="w-1/4  p-4 flex flex-col gap-3  overflow-y-scroll scrollbar-thin scrollbar-track-black hidden lg:block">
          <p className="font-medium pl-9">Settings</p>
          {/*Box */}
          <div className="w-full bg-white p-4 flex flex-col justify-start gap-3 rounded-lg shadow-md shadow-stone-200">
            <img
              className="w-20 h-16 "
              src="https://static.vecteezy.com/system/resources/previews/004/542/673/non_2x/metaverse-all-apps-icons-logos-facebook-instagram-messenger-portal-facebook-portal-oculus-facebook-apps-meta-apps-from-meta-from-facebook-applications-free-vector.jpg"
              alt=""
            />

            <div className="flex flex-col justify-start w-full ">
              <p className="font-medium lg:text-lg md:text-sm">
                Accounts Center
              </p>
              <p className="text-xs text-stone-300 break-all">
                Manage your connected experiences and account settings across
                Meta technologies
              </p>
            </div>

            <div className="flex flex-col justify-start gap-1 text-stone-300">
              {metaIcons.map((icon, index) => (
                <div
                  className="flex items-center justify-start gap-3"
                  key={index}>
                  <span className="text-stone-400">{icon.icon}</span>
                  <p className=" text-xs">{icon.name}</p>
                </div>
              ))}
            </div>
            <p className="text-blue-500 font-medium text-sm">
              See more in Accounts Center
            </p>
          </div>
          <div className="px-3 flex flex-col justify-start gap-2">
            <p className="text-sm text-slate-400">How your use Instagram</p>
            <div className="flex flex-col justify-start ">
              {profileNotif.map((icon, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3  hover:bg-stone-300 w-full rounded-lg px-2 py-3">
                  <span className="text-lg text-stone-700">{icon.icon}</span>
                  <p className="text-xs text-stone-600 ">{icon.name}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="px-3 flex flex-col justify-start gap-2">
            <p className="text-sm text-slate-400">For professional </p>
            <div className="flex flex-col justify-start ">
              {forProfessional.map((icon, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3  hover:bg-stone-300 w-full rounded-lg px-2 py-3">
                  <span className="text-lg text-stone-700">{icon.icon}</span>
                  <p className="text-xs text-stone-600 ">{icon.name}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="px-3 flex flex-col justify-start gap-2">
            <p className="text-sm text-slate-400">What You See</p>
            <div className="flex flex-col justify-start ">
              {whatYouSee.map((icon, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3  hover:bg-stone-300 w-full rounded-lg px-2 py-3">
                  <span className="text-lg text-stone-700">{icon.icon}</span>
                  <p className="text-xs text-stone-600 ">{icon.name}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="px-3 flex flex-col justify-start gap-2">
            <p className="text-sm text-slate-400">Who Can See Your Content</p>
            <div className="flex flex-col justify-start ">
              {whoCanSeeYourContent.map((icon, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3  hover:bg-stone-300 w-full rounded-lg px-2 py-3">
                  <span className="text-lg text-stone-700">{icon.icon}</span>
                  <p className="text-xs text-stone-600 ">{icon.name}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="px-3 flex flex-col justify-start gap-2">
            <p className="text-sm text-slate-400">
              How others can interact you
            </p>
            <div className="flex flex-col justify-start ">
              {others.map((icon, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3  hover:bg-stone-300 w-full rounded-lg px-2 py-3">
                  <span className="text-lg text-stone-700">{icon.icon}</span>
                  <p className="text-xs text-stone-600 ">{icon.name}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="px-3 flex flex-col justify-start gap-2">
            <p className="text-sm text-slate-400">Your app and media</p>
            <div className="flex flex-col justify-start ">
              {appAbdMedia.map((icon, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3  hover:bg-stone-300 w-full rounded-lg px-2 py-3">
                  <span className="text-lg text-stone-700">{icon.icon}</span>
                  <p className="text-xs text-stone-600 ">{icon.name}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="px-3 flex flex-col justify-start gap-2">
            <p className="text-sm text-slate-400">Your app and media</p>
            <div className="flex flex-col justify-start ">
              {forFamilies.map((icon, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3  hover:bg-stone-300 w-full rounded-lg px-2 py-3">
                  <span className="text-lg text-stone-700">{icon.icon}</span>
                  <p className="text-xs text-stone-600 ">{icon.name}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="px-3 flex flex-col justify-start gap-2">
            <p className="text-sm text-slate-400">Your app and media</p>
            <div className="flex flex-col justify-start ">
              {infoAndSupport.map((icon, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3  hover:bg-stone-300 w-full rounded-lg px-2 py-3">
                  <span className="text-lg text-stone-700">{icon.icon}</span>
                  <p className="text-xs text-stone-600 ">{icon.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/***************edit profile section***************/}
        <div className="flex w-full flex-1 justify-start  overflow-y-scroll">
          <div className="flex flex-col h-screen p-5 lg:px-28 md:px-16 py-10 w-full gap-9">
            <p className="font-medium text-xl">Edit profile</p>
            <div className="w-full space-y-9 pb-20">
              <div className="flex w-full bg-stone-100 rounded-[11px] p-2 justify-between items-center">
                <div className="w-[50px] h-[50px] rounded-full border relative">
                  {loading && (
                    <div className="absolute inset-0 w-[100%] h-[100%] bg-white bg-opacity-50 rounded-full flex items-center justify-center ">
                      <span className="loader"></span>
                    </div>
                  )}
                  <img
                    src={profile}
                    alt="profile"
                    className="rounded-full w-full h-full "
                  />
                </div>
                <label
                  aria-disabled={loading}
                  htmlFor="image"
                  className={`px-3 py-1 bg-blue-500 text-white font-medium rounded-[7px] disabled:cursor-not-allowed text-sm cursor-pointer ${
                    loading ? 'hidden' : 'block'
                  }`}>
                  Change photo
                </label>
                <input
                  type="file"
                  placeholder=""
                  className="hidden"
                  maxLength={1}
                  id="image"
                  accept="image/*"
                  onChange={(e) => handleImage(e.target.files[0])}
                />
              </div>
              {/******************website******************/}
              <div className="flex flex-col w-full gap-3">
                <p className="text-lg font-medium">Name</p>
                <input
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="outline-none w-full border border-stone-300 text-sm font-normal rounded-2xl px-3 py-3 "
                />
              </div>
              {/******************website******************/}
              <div className="flex flex-col justify-start gap-3 w-full">
                <p className=" font-medium w-full">Website</p>
                <div className="flex flex-col w-full items-start">
                  <span className="font-normal text-stone-400 bg-stone-100 w-full flex items-center justify-start p-2 rounded-2xl border border-stone-300 text-lg">
                    patelsuffs.netlify.app + 1
                  </span>
                  <p className="text-stone-400 break-all text-sm">
                    Editing your links is only available on mobile. Visit the
                    instagram app and edit your profile to change the website in
                    your bio.
                  </p>
                </div>
              </div>
              {/******************Bio section******************/}
              <div className="flex flex-col w-full gap-3">
                <p className="text-lg font-medium">Bio</p>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  maxLength={200}
                  cols={40}
                  contextMenu="bio"
                  className="outline-none w-full border border-stone-300 text-sm font-normal rounded-2xl px-3 py-1"></textarea>
              </div>
              {/******************Gender******************/}
              <div className="flex flex-col w-full gap-3">
                <p className="text-lg font-medium">Gender</p>
                <select
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full p-4 border rounded-2xl border-stone-300 outline-none">
                  <option value="male">Male</option>
                  <option value="woman">Woman</option>
                  <option value="customized">Customized</option>
                </select>
                <p className="text-sm text-stone-400">
                  This won't be part of your public profile.
                </p>
              </div>
              {/******************Show account******************/}
              <div className="flex flex-col w-full gap-3 ">
                <p className="text-lg font-medium">
                  Show account suggestions on profile
                </p>
                <div className=" flex items-center gap-10 justify-between border border-stone-300 rounded-3xl p-4">
                  <div className="flex flex-col justify-start break-all ">
                    <p className="font-normal">
                      Show account suggestions on profile
                    </p>
                    <p className="text-stone-400 text-sm">
                      Choose whether people can see similar account suggestions
                      on your profile, and whether your account can be suggested
                      on other profile
                    </p>
                  </div>
                  <label className="inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked />
                    <div className="relative w-11 h-6 bg-blue-400 rounded-full peer peer-focus:ring-4   peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-black"></div>
                  </label>
                </div>
              </div>
              <div className="w-full flex items-start justify-end">
                <button
                  disabled={loading}
                  onClick={() => handleSubmit()}
                  className="px-24 text-white bg-blue-500 disabled:bg-blue-200 rounded-lg py-2 font-medium">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
