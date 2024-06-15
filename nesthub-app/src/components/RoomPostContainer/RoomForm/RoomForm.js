import './RoomForm.scss'
import React from 'react';


const RoomForm = ({ handleChange, handleSubmit, formData, blurHandler, populateData, handleDelete }) => {



    return (
        <>
            <div className='postForm'>
                <form onSubmit={handleSubmit}>

                    <section>
                        <label htmlFor="room_photo">Room Photos</label>
                        <input
                            type="url"
                            name="room_photo"
                            id="room_photo"
                            onChange={handleChange}
                            required={true}
                        />
                        <label htmlFor='title'>Add a catchy title!</label>
                        <input
                            id="title"
                            type='text'
                            name="title"
                            onBlur = {blurHandler}
                            placeholder=" Add title"
                            required={true}
                            value={formData.title}
                            onChange={handleChange}
                        />
                        <label htmlFor='community'>Community</label>
                        <input
                            id="community"
                            type='text'
                            name="community"
                            placeholder=" Add community"
                            required={true}
                            value={formData.community}
                            onChange={handleChange}
                        />
                        <label htmlFor='address'>Address</label>
                        <input
                            id="address"
                            type='text'
                            name="address"
                            placeholder=" Add address"
                            required={true}
                            value={formData.address}
                            onChange={handleChange}
                        />

                        <label htmlFor='fromdate'>From Date</label>
                        <input
                            id="fromdate"
                            type='date'
                            name="from_date"
                            placeholder="Add From Date"
                            required={true}
                            value={formData.from_date}
                            onChange={handleChange}
                        />

                        <label htmlFor='todate'>To Date</label>
                        <input
                            id="todate"
                            type='date'
                            name="to_date"
                            required={true}
                            value={formData.to_date}
                            onChange={handleChange}
                        />

                        <label htmlFor='number_of_rooms'>Number of Rooms Available</label>
                        <input
                            id="number_of_rooms"
                            type='number'
                            name="number_of_rooms"
                            placeholder="Add number of rooms"
                            required={true}
                            value={formData.number_of_rooms}
                            onChange={handleChange}
                        />

                        <label htmlFor='rent_amount'>Total Rent</label>
                        <input
                            id="rent_amount"
                            type='number'
                            name="rent_amount"
                            placeholder="Add rent"
                            required={true}
                            value={formData.rent_amount}
                            onChange={handleChange}
                        />

                        <label htmlFor='sharing_price'>Add sharing room price</label>
                        <input
                            id="sharing_price"
                            type='number'
                            name="sharing_price"
                            placeholder="Add sharing room price"
                            required={true}
                            value={formData.sharing_price}
                            onChange={handleChange}
                        />

                        <label htmlFor='private_room_price'>Add private room price</label>
                        <input
                            id="private_room_price"
                            type='number'
                            name="private_room_price"
                            placeholder="Add private room price"
                            required={true}
                            value={formData.private_room_price}
                            onChange={handleChange}
                        />

                        <label>Which is the nearest T station?</label>
                        <div className="multiple-input-container">
                            <input
                                id="orange"
                                type="radio"
                                name="nearest_station"
                                value="orange"
                                onChange={handleChange}
                                checked={formData.nearest_station === "orange"}
                            />
                            <label htmlFor="orange">Orange Line</label>
                            <input
                                id="green"
                                type="radio"
                                name="nearest_station"
                                value="green"
                                onChange={handleChange}
                                checked={formData.nearest_station === "green"}
                            />
                            <label htmlFor="green">Green Line</label>

                            <input
                                id="silver"
                                type="radio"
                                name="nearest_station"
                                value="silver"
                                onChange={handleChange}
                                checked={formData.nearest_station === "silver"}
                            />
                            <label htmlFor="silver">Silver Line</label>
                        </div>

                        <label>Is it Red Eye accessible?</label>
                        <div className="multiple-input-container">
                            <input
                                id="redeye1"
                                type="radio"
                                name="red_eye_accessibility"
                                value="yes"
                                onChange={handleChange}
                                checked={formData.red_eye_accessibility === "yes"}
                            />
                            <label htmlFor="redeye1">Yes</label>
                            <input
                                id="redeye2"
                                type="radio"
                                name="red_eye_accessibility"
                                value="no"
                                onChange={handleChange}
                                checked={formData.red_eye_accessibility === "no"}
                            />
                            <label htmlFor="redeye2">No</label>
                        </div>

                        <label htmlFor='distance_from_university'>How far is it from Northeastern? </label>
                        <input
                            id="distance_from_university"
                            type='number'
                            name="distance_from_university"
                            placeholder="Add distance from university"
                            required={true}
                            value={formData.distance_from_university}
                            onChange={handleChange}
                        />

                        <label htmlFor='nearby_grocery_stores'>What are the nearby grocery stores? </label>
                        <input
                            id="nearby_grocery_stores"
                            type='text'
                            name="nearby_grocery_stores"
                            placeholder="Add nearby grocery stores"
                            required={true}
                            value={formData.nearby_grocery_stores}
                            onChange={handleChange}
                        />

                        <label htmlFor='amenities'>Amenities</label>
                        <input
                            id="amenities"
                            type='text'
                            name="amenities"
                            placeholder="Add amenities"
                            required={true}
                            value={formData.amenities}
                            onChange={handleChange}
                        />



                        <button className='primary-button' type='submit'>post profile</button>


                    </section>

                </form>
            </div>

        </>
    )

}

export default RoomForm;