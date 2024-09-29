import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import SuggesteUsers from './SuggestUsers';

function RightBar() {
  let { user } = useSelector((state) => state?.user);
  return (
    <div className="mt-[100px] w-[200px] break-all ">
      <div className="flex flex-col items-start  ">
        <Link to={`profile/${user?._id}`} className="flex items-center gap-2">
          <img
            src={user?.profile}
            alt="profile"
            className="w-10 h-10 rounded-full border
          "
          />
          <div className="flex flex-col">
            <p className="text-sm ">{user?.userName}</p>
            <p className="text-sm break-all">{user?.bio}</p>
          </div>
        </Link>
        <div className="flex gap-[64px] items-center">
          <p className="font-normal text-sm py-3">SuggesteUsers</p>
          <p className="font-bold text-sm">See All</p>
        </div>
        {/*suggeste user component */}
        <SuggesteUsers />
      </div>
    </div>
  );
}

export default RightBar;
