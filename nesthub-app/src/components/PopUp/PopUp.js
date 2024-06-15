import './PopUp.scss'
import React from 'react';


//Function to show user profile on dashboard
const PopUp = ({user}) => {

    return (
        <div className='profile-card-container'>
            <div className="profile-photo-container">
                {<img src={user.photo} alt="poster photos preview" />}
            </div>
            <div className='text-container'>
            <ul>
                <li><b>Name</b><span>{user.firstName}</span></li>
                <li><b>Gender</b><span>{user.gender}</span></li>
                <li><b>Dietary Preferences</b><span>{user.dietary_preferences}</span></li>
                <li><b>Smoking Preference</b><span>{user.smoking_preference}</span></li>

            </ul>
            </div>
           
        </div>
    )
}

export default PopUp;