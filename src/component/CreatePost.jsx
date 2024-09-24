import { useEffect, useRef, useState } from 'react';
import Picker from 'emoji-picker-react';
import { BsEmojiSmile } from 'react-icons/bs';
import { PiImageThin } from 'react-icons/pi';
import { PiVideoCameraThin } from 'react-icons/pi';
import { CiBookmarkRemove } from 'react-icons/ci';
import { FaArrowLeftLong } from 'react-icons/fa6';
import dataUrlToBlob from 'dataurl-to-blob';
import { useDispatch, useSelector } from 'react-redux';
import PropagateLoader from 'react-spinners/PropagateLoader';
import { allPost } from '../redux/postSlice';
import Axios from '../Axios/axios';
import useClose from '../hooks/useClose';
import uploadFile from '../hellper/cloudinary';

function CreatePost({ setOpenCreatePost, setPath }) {
  let dispatch = useDispatch();
  let { post } = useSelector((state) => state?.post);
  const [show, setShow] = useState(false);
  const textRef = useRef(null);
  const emojiRef = useRef(null);
  const [corsur, setCorsur] = useState();
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState('');
  const [image, setImage] = useState('');
  useEffect(() => {
    textRef.current.selectionEnd = corsur;
  }, [corsur]);

  //////////////////get files////////////////////////
  let handleChange = (e) => {
    let file = e.target.files[0];
    let dataUrl = new FileReader();
    dataUrl.readAsDataURL(file);
    dataUrl.onload = (result) => {
      setImage(result.target.result);
    };
    console.log(image);
  };

  /////////////////////emoji picker function///////////
  let hendleEmoji = ({ emoji }, e) => {
    let ref = textRef.current;
    ref.focus();
    let start = text.substring(0, ref.selectionStart);
    let end = text.substring(ref.selectionStart);
    let newText = start + emoji + end;
    setText(newText);
    setCorsur(start.length + emoji.length);
  };
  let commentRef = useRef(null);
  useClose(emojiRef, () => setShow(false));
  useClose(commentRef, () => setOpenCreatePost(false));

  ////////////////////send Post////////////////////////
  let handleSubmit = async (e) => {
    e.preventDefault();
    if (image?.length) {
      let file = dataUrlToBlob(image);
      try {
        setLoading(true);
        let url = await uploadFile(file);
        if (url.url) {
          let { data } = await Axios.post('post/create-post', {
            caption: text,
            image: url?.url,
          });
          if (data.success) {
            setLoading(false);
            dispatch(allPost([data?.post, ...post]));
            setOpenCreatePost(false);
            setPath('/');
          }
        } else {
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    } else {
      alert('Image is empty');
    }
  };
  let handleClose = () => {
    setOpenCreatePost(false);
    setPath('/');
  };
  return (
    <div className="flex h-screen w-[100%] justify-center ">
      <form
        onSubmit={handleSubmit}
        ref={commentRef}
        className="flex md:w-[40%] md:h-[70%] w-full mt-2 justify-around gap-2 flex-col bg-white rounded-lg ">
        <div className="border-b border-black w-full py-1 relative">
          <p className="flex items-center justify-center  text-sm font-medium">
            Create new post
          </p>
          <button className="absolute top-1 hover:scale-125 left-3 text-xl text-blue-600">
            <FaArrowLeftLong
              className=" text-blue-600"
              onClick={() => handleClose()}
            />
          </button>
        </div>

        {image && (
          <div className="flex  w-full h-[300px] ">
            <div className=" h-full w-full">
              <div className="w-full h-[200px] relative">
                <CiBookmarkRemove
                  className="absolute top-2 left-2 cursor-pointer text-red-400 text-2xl "
                  onClick={() => setImage('')}
                />
                <img className="w-full h-full " src={image} alt="dp" />
              </div>
            </div>
          </div>
        )}
        {!image && (
          <div className="w-full flex  items-center justify-center">
            <div className="w-[90%] flex items-center flex-col gap-6  justify-center  border rounded-md h-32 ">
              <div className="relative flex items-center justify-center opacity-50 cursor-pointer">
                <div>
                  <PiVideoCameraThin className="text-6xl px-1 -rotate-45 absolute top-4 left-[28px] " />
                </div>
                <PiImageThin className="text-6xl  rounded-lg px-1 " />
              </div>
              <label
                htmlFor="post"
                className="bg-blue-500 cursor-pointer rounded-[9px] px-2 py-1 text-white text-sm font-medium">
                Upload in computer
              </label>
            </div>
          </div>
        )}

        <input
          type="file"
          id="post"
          accept="image/*"
          onChange={handleChange}
          hidden
        />
        <div className=" flex relative justify-center w-full p-3">
          <textarea
            ref={textRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="flex w-full placeholder:text-sm px-3 placeholder:font-medium outline-none border rounded-md h-"
            placeholder="Caption"></textarea>
          <div className="absolute bottom-5 right-6">
            <div className="absolute -top-5 -left-5">
              <div ref={emojiRef}>
                <BsEmojiSmile
                  className={`${
                    show ? 'text-blue-500' : ''
                  } text-xl cursor-pointer`}
                  onClick={() => setShow((prev) => !prev)}
                />
                {show && (
                  <Picker
                    onEmojiClick={hendleEmoji}
                    width={260}
                    height={300}
                    style={{
                      position: 'absolute',
                      right: '20px',
                      bottom: '17px',
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        {loading ? (
          <div className="flex items-center justify-center mb-6">
            <PropagateLoader
              color="#0500ff"
              cssOverride={{}}
              loading
              size={10}
              speedMultiplier={2}
            />
          </div>
        ) : (
          <button
            disabled={loading}
            className="text-white py-1 px-3 mx-3 my-2 rounded-[10px] font-medium text-sm bg-blue-500 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center">
            Post
          </button>
        )}
      </form>
    </div>
  );
}

export default CreatePost;
