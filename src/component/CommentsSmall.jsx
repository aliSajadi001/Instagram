import { useEffect, useRef, useState } from 'react';
import { IoArrowBack } from 'react-icons/io5';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { IoMdHeartEmpty } from 'react-icons/io';
import { allComments, getPost } from '../redux/commentSlice';
import Axios from '../Axios/axios';
import useClose from '../hooks/useClose';
function CommentSmall({
  showComments,
  setComments,
  allComment,
  setShowComments,
}) {
  let dispatch = useDispatch();
  let [show, setShow] = useState(false);
  let [text, setText] = useState('');
  let commentsRef = useRef(null);
  useEffect(() => {
    if (showComments) {
      dispatch(allComments([]));
      dispatch(getPost({}));
    }
  }, [showComments]);
  useEffect(() => {
    if (showComments) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [showComments]);
  let { singlePost } = useSelector((state) => state?.comment);
  let { allcomments } = useSelector((state) => state?.comment);
  let { user } = useSelector((state) => state?.user);

  let sendComment = async () => {
    try {
      let id = singlePost?._id;
      let { data } = await Axios.post(`post/add-comment/${id}`, {
        text,
      });
      if (data?.success) {
        setText('');
        dispatch(allComments([data.newComment, ...allComment]));
        let updateComments = [data.newComment, ...allComment];
        setComments(updateComments);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="w-full  h-full rounded-lg flex flex-col items-center justify-center relative">
        <div className="flex w-full border-b border-black items-center justify-center relative">
          <p className="flex py-2 items-center justify-center font-medium text-sm">
            Comments
          </p>
          <IoArrowBack
            className="absolute left-5 top-2 cursor-pointer"
            onClick={() => setShowComments(false)}
          />
        </div>
        {Object.values(singlePost).length === 0 ? (
          <div className="flex items-center justify-center w-full h-full pt-3">
            <span className="loader"></span>
          </div>
        ) : (
          <>
            {/* caption and comments lists */}
            <div className="  flex flex-col items-start justify-start gap-5 h-full   w-full ">
              <div className="flex flex-col flex-1 h-full w-full">
                {allcomments.length === 0 ? (
                  <div className="w-full flex items-center justify-center mt-60">
                    <p className="flex flex-col w-full  items-center justify-center font-medium text-xl  text-black">
                      No comments yet
                      <span className="text-sm text-stone-400 font-normal">
                        Start thr conversation
                      </span>
                    </p>
                  </div>
                ) : (
                  <>
                    {allcomments?.map((comment) => (
                      <div
                        key={comment?._id}
                        className="flex items-center justify-center gap-3 p-4">
                        <img
                          src={comment?.createBy?.profile}
                          alt="rofile"
                          className="w-10 h-10 rounded-full border border-gray-500 "
                        />
                        <div className="flex items-center gap-6  w-full">
                          <div className="flex flex-col items-start w-full ">
                            <div className="flex items-center justify-center gap-4">
                              <p className="text-md font-medium max-w-[300px] break-all text-sm font-serif">
                                {comment?.createBy?.userName}
                              </p>
                              <p className="text-xs text-gray-500 ">
                                {moment(comment?.createdAt).fromNow()}
                              </p>
                            </div>
                            <p className="text-xs font-medium max-w-[200px] break-all">
                              {comment?.text}
                            </p>
                            <div className="flex items-center justify-start gap-4 text-xs text-gray-500 ">
                              <p>Reply</p>
                              <p>See translation</p>
                              <p>Copy</p>
                            </div>
                          </div>
                          <div className="flex flex-col items-center justify-center">
                            <IoMdHeartEmpty className="text-gray-500" />
                            <p className="text-xs  ">23</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </div>
              {/*inpute text  */}
              <div className="flex items-center gap-3 w-full  bg-white  py-1  justify-center fixed bottom-0 right-0 px-9  border ">
                <img
                  src={user?.profile}
                  alt="profile"
                  className="w-7 h-7 rounded-full"
                />
                <input
                  onChange={(e) => setText(e.target.value)}
                  value={text}
                  type="text"
                  placeholder="Add a comment for "
                  className="outline-none w-full  placeholder:text-sm placeholder:text-gray-500 rounded-xl py-1 px-1"
                />
                {text && (
                  <>
                    <button
                      onClick={() => sendComment(singlePost._id)}
                      className="text-sm font-medium text-blue-600">
                      post
                    </button>
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default CommentSmall;
