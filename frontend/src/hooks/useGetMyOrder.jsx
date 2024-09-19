import { CHECKOUT_API_END_POINT } from '@/utils/contants';
import axios from 'axios';
import { useQuery } from 'react-query';
import useGetMyUser from './useGetMyUser';


export const useGetMyUser = ()=>{
    const accessToken = useSelector((state) => state.auth.accessToken);
    const getMyOrderRequest = async()=>{
        const res = await axios.get(`${CHECKOUT_API_END_POINT}/api/order`, {
            headers:{
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if(!res.ok){
            throw new Error(`failed to get orders`);
        }
        return res.json();
    };

    const {data:orders, isLoading} = useQuery(
        "fetchMyOrders", 
        getMyOrderRequest,
        {
            refetchInterval: 5000, //
        } 
    );
    return {
        orders, isLoading
    }
}

