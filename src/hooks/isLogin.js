import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { currentUserInfo, setLoading } from '../redux/userSlice';
import Axios from '../Axios/axios';
import { useNavigate } from 'react-router-dom';
let isLogin = () => {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  useEffect(() => {
    let fetch = async () => {
      try {
        dispatch(setLoading(true));
        let { data } = await Axios.get('isAuth');
        if (data?.success) {
          dispatch(setLoading(false));
          dispatch(currentUserInfo(data.user));
        } else {
          navigate('/login');
          dispatch(setLoading(false));
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
