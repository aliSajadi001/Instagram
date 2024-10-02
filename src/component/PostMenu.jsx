import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { allPost } from '../redux/postSlice';
import useClose from '../hooks/useClose';
import Axios from '../Axios/axios';

function PostMenu({ setShowMenuPost, postId }) {
  let { post } = useSelector((state) => state?.post);
  let dispatch = useDispatch();
  let [show, setShow] = useState(false);
  let { user } = useSelector((state) => state?.user);

  useEffect(() => {
    if (user?._id === postId?.createBy?._id) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [postId]);

  let menuRef = useRef(null);
  useClose(menuRef, () => setShowMenuPost(false));
  ////////////// Delete post////////////////
  let deletePost = async (id) => {
    try {
      let { data } = await Axios.post(`post/delete-post/${id}`);
      if (data?.success) {
        toast.success(data.message);
        dispatch(allPost(post.filter((pst) => pst?._id !== id)));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      ref={menuRef}
      className="flex items-center justify-center flex-col gap-3 md:w-[300px] p-6 bg-white rounded-lg">
      <button className="font-medium text-sm text-red-600 hover:bg-gray-200 p-2 rounded-md">
        Unfollow
      </button>
      <button className="font-medium text-sm hover:bg-gray-200 p-2 rounded-md">
        Add to favorites
      </button>
      {show && (
        <button
          onClick={() => deletePost(postId?._id)}
          className="font-medium text-sm hover:bg-gray-200 p-2 rounded-md">
          Delete
        </button>
      )}
    </div>
  );
}

export default PostMenu;
