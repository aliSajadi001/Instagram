import { CiMenuKebab } from 'react-icons/ci';
import { FiSend } from 'react-icons/fi';
import { BiMessageRounded } from 'react-icons/bi';
import { RiHeartLine } from 'react-icons/ri';
import { MdOutlineBookmarkBorder } from 'react-icons/md';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { RiHeartFill } from 'react-icons/ri';
import { allPost } from '../redux/postSlice';
import { allComments, getPost } from '../redux/commentSlice';
import { MdBookmark } from 'react-icons/md';
import PostMenu from './PostMenu';
import Axios from '../Axios/axios';
import CommentSmall from './CommentsSmall';
import Comments from './Comments';
import useClose from '../hooks/useClose';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';

function Post({ pst }) {
  let dispatch = useDispatch();
  let { user } = useSelector((state) => state?.user);
  let { post } = useSelector((state) => state?.post);
  let [showComments, setShowComments] = useState(false);
  let commentRef = useRef(null);
  let [ShowCommentsSmall, setShowCommentsSmall] = useState(false);
  let [showMenuPost, setShowMenuPost] = useState(false);
  let [text, setText] = useState('');
  let [singlePost, setSinglePost] = useState(null);
  let [liked, setLiked] = useState(pst?.likes?.includes(user?._id) || false);
  let [likedLength, setLikedLength] = useState(pst?.likes?.length);
  let [comments, setComments] = useState(pst?.comments);
  let [savesLangth, setSavesLangth] = useState(
    user?.saves?.includes(pst._id) || false
  );
  useEffect(() => {
    if (showComments || showMenuPost || ShowCommentsSmall) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [showComments, showMenuPost, ShowCommentsSmall]);

  let handlePost = (p) => {
    setShowMenuPost(true);
    setSinglePost(p);
  };
  /////////////////////////like & dislike/////////////////
  let lokeAndDislike = async (id) => {
    try {
      let action = liked ? 'dislike' : 'like';
      let { data } = await Axios.post(`post/${action}/${id}`);
      if (data?.success) {
        setLikedLength(liked ? likedLength - 1 : likedLength + 1);
        setLiked(!liked);
        toast.success(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //////////////////////send comments/////////////////

  let handleComment = async (id) => {
    try {
      let { data } = await Axios.post(`post/add-comment/${id}`, {
        text,
      });
      if (data?.success) {
        setText('');
        let updateComments = [data.newComment, ...comments];
        setComments(updateComments);
        let updatePost = post?.map((p) =>
          p._id === id ? { ...p, comments: updateComments } : p
        );
        dispatch(allPost(updatePost));
      }
    } catch (error) {
      console.log(error);
    }
  };

  /////////////////////////get all comments/////////////////
  let viewAllComments = async (id) => {
    try {
      let { data } = await Axios.get(`post/getAll-comments/${id}`);
      if (data?.success) {
        dispatch(getPost(data?.post));
        dispatch(allComments(data?.comment));
      }
    } catch (error) {
      console.log(error);
    }
  };

  let ShoeComment = (id) => {
    setShowComments(true);
    setShowCommentsSmall(true);
    viewAllComments(id);
  };
  ///////////////////////////saved posts //////////////////////
  let handleSave = async (id) => {
    try {
      let { data } = await Axios.post(`post/save-post/${id}`);
      if (data?.success) {
        toast.success(data.message);
        setSavesLangth((prev) => !prev);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useClose(commentRef, () => {
    setShowCommentsSmall(false);
  });

  useEffect(() => {
    if (showComments) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [showComments]);
  return (
    <div className="w-full h-full ">
      {/****** Show modal comments in larg computers ******/}
      {showComments && (
        <div className="  fixed inset-0  flex items-center justify-center md:block bg-black bg-opacity-25 z-20 w-full h-full">
          <div className="flex items-center justify-center w-full h-full z-50">
            <Comments
              setShowComments={setShowComments}
              showComments={showComments}
              allComment={comments}
              setComments={setComments}
            />
          </div>
        </div>
      )}
      {/****** Show modal comments in small computers or phons ******/}
      {ShowCommentsSmall && (
        <div className=" bg-white md:hidden fixed z-50 w-full inset-0  rounded-t-2xl overflow-y-auto ">
          <div className="x-50 inset-0">
            <CommentSmall
              setShowComments={setShowCommentsSmall}
              showComments={ShowCommentsSmall}
              allComment={comments}
              setComments={setComments}
            />
          </div>
        </div>
      )}
      {/******** Show modal menus in modal comments ********/}

      {showMenuPost && (
        <div className="fixed inset-0 flex items-center justify-center md:block bg-black bg-opacity-25 z-50 w-[100%] h-[100%]">
          <div className="flex items-center justify-center  h-screen">
            <PostMenu setShowMenuPost={setShowMenuPost} postId={singlePost} />
          </div>
        </div>
      )}
      <div className="w-full  flex flex-col  justify-start items-start ">
        <div className="w-full flex flex-col items-center gap-3 py-3">
          {/*---------------------------menu bar--------------------- */}
          <div className="flex items-center justify-between w-full px-3">
            <Link
              to={`/profile/${pst?.createBy?._id}`}
              className="flex items-center gap-3 w-full">
              <img
                className="w-10 h-10 rounded-full border"
                src={pst?.createBy?.profile}
                alt="profile"
              />
              <p className="text-xs font-normal">{pst?.createBy.userName}</p>
            </Link>

            <div>
              <CiMenuKebab
                onClick={() => handlePost(pst)}
                className="cursor-pointer"
              />
            </div>
          </div>
          {/*---------------------------post image--------------------- */}
          <div className="w-full ">
            <LazyLoadImage src={pst?.image} effect="blur" alt="" />
          </div>
          {/*---------------------------Icons--------------------- */}
          <div className="flex w-full justify-between items-center px-3 text-lg">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                {liked ? (
                  <RiHeartFill
                    className="cursor-pointer text-red-600"
                    onClick={() => lokeAndDislike(pst?._id)}
                  />
                ) : (
                  <RiHeartLine
                    className="cursor-pointer"
                    onClick={() => lokeAndDislike(pst?._id)}
                  />
                )}
                <p className="text-xs font-medium">{likedLength}</p>
              </div>
              <div className="flex items-center gap-1">
                <BiMessageRounded
                  className="cursor-pointer"
                  onClick={() => ShoeComment(pst?._id)}
                />
                <p className="text-xs font-medium">{comments?.length}</p>
              </div>

              <FiSend className="cursor-pointer" />
            </div>
            <div>
              {savesLangth ? (
                <>
                  <MdBookmark
                    className="cursor-pointer"
                    onClick={() => handleSave(pst?._id)}
                  />
                </>
              ) : (
                <>
                  <MdOutlineBookmarkBorder
                    className="cursor-pointer"
                    onClick={() => handleSave(pst?._id)}
                  />
                </>
              )}
            </div>
          </div>
          {/*---------------------------caption --------------------- */}
          <div className="flex flex-col items-start justify-start w-full px-3">
            <p className="text-sm font-normal break-all">
              {pst?.createBy && pst?.createBy?.userName} {pst.caption}
            </p>
            <p
              className="text-sm font-normal text-gray-400 cursor-pointer "
              onClick={() => ShoeComment(pst?._id)}>
              View all comments
            </p>
            {/*-------------------------Comment input ------------------ */}
            <div className="flex items-center gap-5 w-full">
              <input
                onChange={(e) => setText(e.target.value)}
                value={text}
                type="text"
                placeholder="Add a comment"
                className="text-sm placeholder:text-gray-400 w-full outline-none border-b-[1px]  md:block "
              />
              {text && (
                <button
                  onClick={() => handleComment(pst?._id)}
                  className=" text-xs md:text-sm font-normal hover:font-medium text-blue-500 mt-2">
                  Post
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Post;
