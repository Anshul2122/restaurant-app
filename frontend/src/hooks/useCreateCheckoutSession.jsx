import { CHECKOUT_API_END_POINT } from '@/utils/contants';
import axios from 'axios';
import { useMutation } from 'react-query';
import { useSelector } from 'react-redux';

export const useCreateCheckoutSession = () => {
    const accessToken = useSelector((state) => state.auth.accessToken);
    const createCheckoutSessionRequest = async(checkoutSessionRequest)=>{

        const res = await axios.post(`${CHECKOUT_API_END_POINT}/checkout/create-checkout-session`, {
            method:"POST",
            headers:{
                Authorization:`Bearer ${accessToken}`,
                "Content-Type":"application/json",
            },
            body:JSON.stringify(checkoutSessionRequest),
        });

        if(!res.ok){
            throw new Error("Error creating checkout session")
        }
        return res.json();
    };

    const {mutateAsync:createCheckoutSession, isloading, error, reset}= useMutation(createCheckoutSessionRequest);

    if(error){
        console.log("error ",error);
        reset();
    }
  return {
    createCheckoutSession,
    isloading,
  };
};
