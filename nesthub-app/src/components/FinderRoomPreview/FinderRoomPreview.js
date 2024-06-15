import './FinderRoomPreview.scss'
import React from 'react';

//Function to show preview when user is entering the data
const RoomPreview = ({ formData }) => {
    console.log("Form data", formData);
    return (

        <div className='card-container'>
            <div className="photo-container">
                {<img src={formData.room_photo} alt="room photos preview" />}
            </div>
            <div className='roomTitle'>
                {formData.title}
            </div>
            <div className='text-container'>
                <ul>
                    <li><b>Community</b>  <span>{formData.community}</span></li>
                    <li><b>Address :</b> <span>{formData.address}</span></li>
                    <li><b>Available from</b>  <span>{formData.from_date}</span></li>
                    <li><b>Available to</b> <span>{formData.to_date}</span></li>
                    <li><b>Number of Rooms</b> <span>{formData.number_of_rooms}</span> </li>
                    <li><b>Total Rent</b> <span>{formData.rent_amount}</span> </li>
                    <li><b>Rent for Shared Room</b> <span>{formData.sharing_price}</span></li>
                    <li><b>Rent for Private Room</b> <span>{formData.private_room_price}</span> </li>
                    <li><b>Nearest T Station</b> <span>{formData.nearest_station}</span>  </li>
                    <li><b>Is it red eye accessible?</b><span>{formData.red_eye_accessibility}</span></li>
                    <li><b>What is the distance from the university?</b><span>{formData.distance_from_university}</span></li>
                    <li><b>Nearest grocery stores</b>  <span>{formData.nearby_grocery_stores}</span></li>
                    <li><b>Additional amenities</b> <span>{formData.amenities}</span> </li>
                </ul>
            </div>
        </div>

    )

}

export default RoomPreview;