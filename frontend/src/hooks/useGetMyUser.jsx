import {USER_API_END_POINT} from '../utils/contants';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setuser } from '@/redux/userSlice';

const useGetMyUser = ()=>{
    const dispatch = useDispatch();
    useEffect(()=>{
        const fetchUser = async()=>{
            try {
                const res = await axios.get(`${USER_API_END_POINT}/getuser`, {withCredentials: true});
                if(res.data.success){
                    dispatch(setuser(res.data.user));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchUser();
    },[]);
}

export default useGetMyUser;