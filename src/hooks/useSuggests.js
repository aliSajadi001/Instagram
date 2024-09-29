import { useEffect } from 'react';
import Axios from '../Axios/axios';
import { useDispatch } from 'react-redux';
import { getSuggestUser } from '../redux/userSlice';

let useSuggestUser = () => {
  let dispatch = useDispatch();
  useEffect(() => {
    let fetch = async () => {
      try {
        let { data } = await Axios.get('user/suggeste-users');
        if (data?.success) {
          dispatch(getSuggestUser(data.users));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, []);
};

export default useSuggestUser;
