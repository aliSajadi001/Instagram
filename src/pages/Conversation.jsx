import { useContext, useEffect, useState } from 'react';
import { FaCamera } from 'react-icons/fa';
import { MdOutlineKeyboardVoice } from 'react-icons/md';
import { GrImage } from 'react-icons/gr';
import { LuSticker } from 'react-icons/lu';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { LiaPhoneSolid } from 'react-icons/lia';
import { BsCameraVideo } from 'react-icons/bs';
import { MdGTranslate } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Axios from '../Axios/axios';
import { getAllChats, getSingleUser } from '../redux/chatSlice';
import { SocketContext } from '../App';
import { IoIosSend } from 'react-icons/io';

function Conversation() {
  let dispatch = useDispatch();
  let { user } = useSelector((state) => state?.user);
  let { socketIo } = useContext(SocketContext);
  let { singleUser, allChats } = useSelector((state) => state?.chat);
  useEffect(() => {
    if (socketIo) {
      socketIo.on('message', (data) => {
        dispatch(getAllChats([...allChats, data]));
      });
    }
    return () => {
      socketIo.off('message');
    };
  }, [socketIo, dispatch, allChats]);
  let [text, setText] = useState('');
  let { id } = useParams();
  /////////////////////////get all messages/////////////////////////
  useEffect(() => {
    let getAllMessages = async () => {
      try {
        dispatch(getAllChats([]));
        let { data } = await Axios.get(`chat/get/${id}`);
        if (data.success) {
          dispatch(getAllChats(data.chat));
        }
      } catch (error) {
        console.log(error);
      }
    };
    getAllMessages();
  }, [id]);
  /////////////////////////send new messages/////////////////////////
  let sendMessage = async () => {
    dispatch(
      getAllChats([
        ...allChats,
        { _id: Math.random(), senderId: user?._id, resiverId: id, text: text },
      ])
    );
    try {
      await Axios.post(`chat/create/${id}`, { text });
      setText('');
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    return () => {
      dispatch(getAllChats(null));
    };
  }, [dispatch]);
  useEffect(() => {
    let chatContainer = document.getElementById('chat');
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }, [allChats]);
  let navigate = useNavigate();
  let goBack = () => {
    dispatch(getSingleUser({}));
    navigate('/message');
  };
  return (
    <>
      <div className="flex  flex-col flex-1 w-full h-screen">
        {/*******************Profile info*******************/}
        <div className=" lg:h-14 md:h-14 py-[10px] w-full ">
          <div className="flex items-center w-full justify-between px-4 h-full">
            <div className="flex items-center gap-5 ">
              <span className="text-xl">
                <FaArrowLeftLong
                  onClick={() => goBack()}
                  className="text-lg font-mono cursor-pointer"
                />
              </span>
              <div className="flex items-center gap-3">
                <img
                  src={singleUser?.profile}
                  alt="profile"
                  className="md:w-10 md:h-10 w-8 h-8 rounded-full border"
                />
                <div>
                  <p className="md:text-sm text-xs">{singleUser?.userName}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xl md:text-2xl">
                <LiaPhoneSolid />
              </span>
              <span className="text-xl md:text-2xl">
                <BsCameraVideo />
              </span>
            </div>
          </div>
        </div>

        {/*********************Messages*********************/}
        <div
          id="chat"
          className="flex items-start flex-1 overflow-y-auto py-5 flex-col gap-7 w-full h-full px-4">
          {allChats &&
            allChats.map((chat) => (
              <div
                className={` flex w-full    ${
                  user?._id === chat.senderId ? 'justify-end' : 'justify-start'
                }  `}
                key={chat._id}>
                <div
                  className={`py-2 relative px-4 text-xs md:text-sm ${
                    user?._id === chat.senderId
                      ? 'bg-blue-500 text-white'
                      : 'bg-stone-200'
                  } rounded-full max-w-[40%] break-all`}>
                  <p>{chat.text}</p>
                </div>
              </div>
            ))}
        </div>

        {/*********************Input*********************/}
        <div className="flex items-center md:h-14 h-11 w-full px-4 pb-2">
          <div className="flex items-center w-full h-full border border-stone-400 px-1 rounded-full border-ston-400 space-x-6 ">
            <div className="w-full flex items-center gap-2">
              <span className="bg-blue-500 rounded-full p-[7px]">
                <FaCamera className="size-4 text-white" />
              </span>
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                type="text"
                placeholder="Message..."
                className="outline-none w-full "
              />
            </div>
            {text ? (
              <>
                <span>
                  <MdGTranslate className="size-5" />
                </span>
                <button
                  onClick={() => sendMessage()}
                  className="text-white bg-blue-700 rounded-2xl py-1 px-3  md:px-2 md:py-1 md:text-2xl font-bold text-lg">
                  <IoIosSend />
                </button>
              </>
            ) : (
              <>
                <span>
                  <MdOutlineKeyboardVoice className="size-5" />
                </span>
                <span>
                  <GrImage className="size-5" />
                </span>
                <span>
                  <LuSticker className="size-5" />
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Conversation;
