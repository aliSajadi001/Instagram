import { GoHomeFill } from 'react-icons/go';
import { IoSearch } from 'react-icons/io5';
import { MdOutlineExplore } from 'react-icons/md';
import { TbMessages } from 'react-icons/tb';
import { FiTv } from 'react-icons/fi';
import { FaRegHeart } from 'react-icons/fa6';
import { CiCirclePlus } from 'react-icons/ci';
import { IoIosLogOut } from 'react-icons/io';

export let menu = [
  {
    name: 'Home',
    path: '/',
    icon: <GoHomeFill />,
  },
  {
    name: 'Search',
    path: '/search',
    icon: <IoSearch />,
  },
  {
    name: 'Message',
    path: '/message',
    icon: <TbMessages />,
  },
  {
    name: 'Explor',
    path: '/explor',
    icon: <MdOutlineExplore />,
  },
  {
    name: 'Reels',
    path: '/reels',
    icon: <FiTv />,
  },
  {
    name: 'Notification',
    path: '/notification',
    icon: <FaRegHeart />,
  },
  {
    name: 'Create',
    path: '/create-post',
    icon: <CiCirclePlus />,
  },
  {
    name: 'Logout',
    path: '/logout',
    icon: <IoIosLogOut />,
  },
];