import React from 'react'

const UserProfilePage = () => {
    const {currentUser, isLoading:isGetLoading} = useGetMyUser();
    const {updateUser, isLoading:isUpdateLoading} = useUpdateMyUser(); 

    if(isGetLoading) {
        return <span>loading...</span>
    }
    if(!currentUser) {
        return <span>unable to load user profile</span>
    }
  return (
    <UserProfileForm currentUser = {currentUser} onSave={updateUser} isLoading={isUpdateLoading}/>
  )
}

export default UserProfilePage