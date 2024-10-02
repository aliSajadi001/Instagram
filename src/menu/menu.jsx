import { GoHomeFill } from 'react-icons/go';
import { IoSearch } from 'react-icons/io5';
import { MdOutlineExplore } from 'react-icons/md';
import { TbMessages } from 'react-icons/tb';
import { FiTv } from 'react-icons/fi';
import { FaRegHeart } from 'react-icons/fa6';
import { MdOutlineAddCircleOutline } from "react-icons/md";
import { MdSecurity } from 'react-icons/md';
import { IoReaderOutline } from 'react-icons/io5';
import { CgProfile } from 'react-icons/cg';
import { IoNotificationsOutline } from 'react-icons/io5';
import { BsShopWindow } from 'react-icons/bs';
import { RiBarChartBoxLine } from 'react-icons/ri';
import { IoNotificationsOffOutline } from 'react-icons/io5';
import { IoHeartDislikeOutline } from 'react-icons/io5';
import { BiBlock } from 'react-icons/bi';
import { IoLockClosedOutline } from 'react-icons/io5';
import { MdOutlineStars } from 'react-icons/md';
import { MdOutlineHideSource } from 'react-icons/md';
import { LiaFacebookMessenger } from 'react-icons/lia';
import { PiThreadsLogo } from 'react-icons/pi';
import { BiMessageRounded } from 'react-icons/bi';
import { RxUpdate } from 'react-icons/rx';
import { TbUserOff } from 'react-icons/tb';
import { PiTextAaBold } from 'react-icons/pi';
import { TfiDownload } from 'react-icons/tfi';
import { IoLanguage } from 'react-icons/io5';
import { CgWebsite } from 'react-icons/cg';
import { LuUsers } from 'react-icons/lu';
import { IoIosHelpBuoy } from 'react-icons/io';
import { MdOutlinePrivacyTip } from 'react-icons/md';
import { FiUser } from 'react-icons/fi';

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
    icon: <MdOutlineAddCircleOutline />,
  },
];

export let smMenu = [
  {
    name: 'Notification',
    path: '/notification',
    icon: <FaRegHeart />,
  },
  {
    name: 'Reels',
    path: '/reels',
    icon: <FiTv />,
  },
  {
    name: 'Search',
    path: '/search',
    icon: <IoSearch />,
  },
  {
    name: 'Home',
    path: '/',
    icon: <GoHomeFill />,
  },
];

export let metaIcons = [
  {
    name: 'Personal details',
    icon: <FiUser />,
  },
  {
    name: 'Password and security',
    icon: <MdSecurity />,
  },
  {
    name: 'Ad preferences',
    icon: <IoReaderOutline />,
  },
];

export let forProfessional = [
  {
    name: 'Professional account',
    icon: <BsShopWindow />,
  },
  {
    name: 'Creator tools and account',
    icon: <RiBarChartBoxLine />,
  },
];
export let profileNotif = [
  {
    name: 'Edit profile',
    icon: <CgProfile />,
  },
  {
    name: 'Nofification',
    icon: <IoNotificationsOutline />,
  },
];

export let whatYouSee = [
  {
    name: 'Muted accounts',
    icon: <IoNotificationsOffOutline />,
  },
  {
    name: 'Like and share counts',
    icon: <IoHeartDislikeOutline />,
  },
];
export let whoCanSeeYourContent = [
  {
    name: 'Account privacy',
    icon: <BiBlock />,
  },
  {
    name: 'Close Friends',
    icon: <IoLockClosedOutline />,
  },
  {
    name: 'Blocked',
    icon: <MdOutlineStars />,
  },
  {
    name: 'Hide story and live',
    icon: <MdOutlineHideSource />,
  },
];
export let others = [
  {
    name: 'Messages and story replies',
    icon: <LiaFacebookMessenger />,
  },
  {
    name: 'Tags and mentions',
    icon: <PiThreadsLogo />,
  },
  {
    name: 'Comments',
    icon: <BiMessageRounded />,
  },
  {
    name: 'Sharing and remixes',
    icon: <RxUpdate />,
  },
  {
    name: 'Restricted accounts',
    icon: <TbUserOff />,
  },
  {
    name: 'Hidden Words',
    icon: <PiTextAaBold />,
  },
];
export let appAbdMedia = [
  {
    name: 'Archiving and downloading',
    icon: <TfiDownload />,
  },
  {
    name: 'Language',
    icon: <IoLanguage />,
  },
  {
    name: 'Website permissions',
    icon: <CgWebsite />,
  },
];
export let forFamilies = [
  {
    name: 'Supervision',
    icon: <LuUsers />,
  },
];
export let infoAndSupport = [
  {
    name: 'Help',
    icon: <IoIosHelpBuoy />,
  },
  {
    name: 'Privacy Center',
    icon: <MdOutlinePrivacyTip />,
  },
  {
    name: 'Account Status',
    icon: <FiUser />,
  },
];
