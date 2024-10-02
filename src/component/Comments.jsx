import { useEffect, useRef, useState } from 'react';
import { CiMenuKebab } from 'react-icons/ci';
import { IoArrowBack } from 'react-icons/io5';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { IoMdHeartEmpty } from 'react-icons/io';
import { ClipLoader } from 'react-spinners';
import { allComments, getPost } from '../redux/commentSlice';
import useClose from '../hooks/useClose';
import Axios from '../Axios/axios';
function Comments({ setShowComments, showComments, setComments, allComment }) {
  let commentRef = useRef(null);
  let dispatch = useDispatch();
  let [text, setText] = useState('');
  useClose(commentRef, () => {
    setShowComments(false);
  });

  useEffect(() => {
    if (showComments) {
      dispatch(allComments([]));
      dispatch(getPost({}));
    }
  }, [showComments]);
  
  let { singlePost } = useSelector((state) => state?.comment);
  let { allcomments } = useSelector((state) => state?.comment);

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
      <div
        ref={commentRef}
        className="sm:w-[80%] lg:w-[60%] h-[400px] rounded-lg flex items-center justify-center z-50">
        <div className="flex w-full h-full object-cover bg-white rounded-lg items-start relative">
          {Object.values(singlePost).length === 0 ? (
            <div className="flex items-center justify-center w-full h-full">
              <ClipLoader color="#000000" />
            </div>
          ) : (
            <>
              <div className=" h-full w-[50%] relative">
                <img
                  src={singlePost?.image[0]}
                  alt="profile"
                  className=" inset-0 w-full h-full object-cover rounded-l-lg"
                />
              </div>
              {/* caption and comments lists */}
              <div className="  flex flex-col items-start justify-start gap-5 h-full p-4 md:pb-[56px] w-[50%] overflow-y-scroll ">
                <div className="flex w-full border-b border-black">
                  {singlePost && (
                    <div className="w-full flex items-center justify-between ">
                      <div className="pb-3 flex items-start gap-3">
                        <img
                          src={singlePost?.createBy?.profile}
                          alt="profile"
                          className="w-10 h-10 rounded-full border border-gray-600"
                        />
                        <div className="flex flex-col items-start ">
                          <p className="text-sm ">
                            {singlePost?.createBy.userName}
                          </p>
                          <p className="text-xs ">{singlePost?.caption}</p>
                        </div>
                      </div>
                      <CiMenuKebab className="text-xl" />
                    </div>
                  )}
                </div>
                {allcomments.length === 0 ? (
                  <div className="w-full flex items-center justify-center">
                    <p className="flex w-full items-center justify-center font-medium text-gray-600">
                      Not found comments
                    </p>
                  </div>
                ) : (
                  <>
                    {allcomments?.map((comment) => (
                      <div
                        key={comment?._id}
                        className="flex items-center justify-center gap-3 ">
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
                <div className="flex items-center gap-3 w-[50%]  bg-white  py-3  justify-center absolute bottom-0 right-0 px-9  ">
                  <IoArrowBack
                    className="text-2xl hover:text-blue-600 cursor-pointer"
                    onClick={() => setShowComments(false)}
                  />
                  <input
                    onChange={(e) => setText(e.target.value)}
                    value={text}
                    type="text"
                    placeholder="add a comment "
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
      </div>
    </>
  );
}

export default Comments;
