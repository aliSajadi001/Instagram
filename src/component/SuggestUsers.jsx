import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import useSuggestUser from '../hooks/useSuggests';

function SuggesteUsers() {
  useSuggestUser();
  let { suggestUsers } = useSelector((state) => state?.user);
  return (
    <div className="w-full  h-[350px] overflow-y-auto scrollbar-thin scrollbar-track-black  ">
      {suggestUsers?.length === 0 ? (
        <p className="font-medium text-gray-600">User note found</p>
      ) : (
        <div className="flex flex-col gap-3 w-full h-full">
          {suggestUsers.map((user) => (
            <div
              key={user._id}
              className="flex items-center justify-between w-full">
              <div>
                <Link
                  to={`profile/${user._id}`}
                  key={user._id}
                  className="flex items-start gap-2 w-full h-full">
                  <img
                    src={user.profile}
                    alt="profile"
                    className="w-10 h-10 rounded-full border"
                  />
                  <div className="flex flex-col items-start">
                    <p className="text-sm ">{user.userName}</p>
                    <p className="text-sm ">{user.bio}</p>
                  </div>
                </Link>
              </div>
              <p className="text-blue-400 text-sm font-medium">Follow</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SuggesteUsers;
