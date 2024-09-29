import { useEffect } from 'react';
import Axios from '../Axios/axios';
import { useDispatch } from 'react-redux';
import { allPost } from '../redux/postSlice';
let useGetPosts = () => {
  let dispatch = useDispatch();
  useEffect(() => {
    let fetch = async () => {
      try {
        let { data } = await Axios.get('post/all-posts');
        if (data?.success) {
          dispatch(allPost(data.allPostes));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, []);
};
export default useGetPosts;
