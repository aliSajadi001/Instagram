import { useEffect } from 'react';
import Axios from '../Axios/axios';
import { useDispatch } from 'react-redux';
import { getProfile } from '../redux/userSlice';

let useGetProfile = (id) => {
  let dispatch = useDispatch();
  useEffect(() => {
    let fetch = async () => {
      try {
        let { data } = await Axios.get(`user/get-profile/${id}`);
        if (data?.success) {
          dispatch(getProfile(data.user));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, [id]);
};
export default useGetProfile;
