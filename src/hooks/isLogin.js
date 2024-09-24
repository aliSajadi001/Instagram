import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { currentUserInfo, setLoading } from '../redux/userSlice';
import Axios from '../Axios/axios';

let isLogin = () => {
  let dispatch = useDispatch();
  useEffect(() => {
    let fetch = async () => {
      try {
        dispatch(setLoading(true));
        let { data } = await Axios.get('isAuth');
        if (data?.success) {
          dispatch(setLoading(false));
          console.log(data.user);
          dispatch(currentUserInfo(data.user));
        }
      } catch (error) {
        dispatch(setLoading(false));
        console.log(error);
      }
    };
    fetch();
  }, []);
};
export default isLogin;
