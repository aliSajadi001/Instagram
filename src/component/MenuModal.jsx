import { useRef } from 'react';
import openAndClose from '../hooke/open&close';

function MenuModal({ setOpenModal }) {
  let modalRef = useRef(null);
  openAndClose(modalRef, () => {
    setOpenModal(false);
  });
  return (
    <div
      ref={modalRef}
      className="flex z-50 items-center justify-center flex-col bg-white px-2 rounded-lg md:w-[200px] py-3 lg:w-[300px]">
      <p className="text-sm font-medium border-b  cursor-pointer w-full flex justify-center py-2">
        Report
      </p>
      <p className="text-sm font-medium border-b text-red-500 cursor-pointer w-full flex justify-center py-2">
        Unfollow
      </p>
      <p className="text-sm font-medium border-b cursor-pointer w-full flex justify-center py-2">
        Add to followers
      </p>
      <p className="text-sm font-medium border-b cursor-pointer w-full flex justify-center py-2">
        Go to post
      </p>
      <p className="text-sm font-medium border-b cursor-pointer w-full flex justify-center py-2">
        Shar to...
      </p>
      <p className="text-sm font-medium border-b cursor-pointer w-full flex justify-center py-2">
        Copy link
      </p>
      <p className="text-sm font-medium border-b cursor-pointer w-full flex justify-center py-2">
        Embed
      </p>
      <p className="text-sm font-medium border-b cursor-pointer w-full flex justify-center py-2">
        About
      </p>
      <p className="text-sm font-medium  cursor-pointer w-full flex justify-center py-2 ">
        Cancel
      </p>
    </div>
  );
}

export default MenuModal;
