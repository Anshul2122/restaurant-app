import UserProfileForm from '@/forms/user-profile-form/UserProfileForm';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';

const UserProfilePage = () => {
    const {user, loading} = useSelector(store=>store.auth);
    
  return (
    <UserProfileForm user = {user}  loading={loading}/>
  )
}

export default UserProfilePage