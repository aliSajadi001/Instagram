import { useEffect } from 'react';
import Axios from '../Axios/axios';
import { useDispatch } from 'react-redux';
import { getStoris } from '../redux/userSlice';

let useGetStoris = () => {
  let dispatch = useDispatch();
  useEffect(() => {
    let fetch = async () => {
      try {
        let { data } = await Axios.get('user/get-storis');
        if (data?.success) {
          dispatch(getStoris(data.follower));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, []);
};
export default useGetStoris;
