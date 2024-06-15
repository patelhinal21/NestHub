// import React, {useEffect, useState} from "react";
import './RoomPost.scss';
import RoomForm from './RoomForm/RoomForm.js';
import RoomPreview from './RoomPreview/RoomPreview.js'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useCookies } from 'react-cookie';

const RoomPost = () => {

    const title = "Title goes here"
    const url = "https://i.pinimg.com/originals/74/d3/14/74d31471c7185ff919db2ba08177ca23.jpg"
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const [formData, setFormData] = useState({
        title: "Title goes here",
        community: "",
        address: "",
        from_date: "",
        to_date: "",
        number_of_rooms: "",
        userEmail: cookies.email,
        rent_amount: "",
        sharing_price: "",
        private_room_price: "",
        nearest_station: "",
        red_eye_accessibility: "",
        distance_from_university: "",
        nearby_grocery_stores: "",
        amenities: "",
        room_photo: "https://i.pinimg.com/originals/74/d3/14/74d31471c7185ff919db2ba08177ca23.jpg"
    })

    console.log(cookies);

    let navigate = useNavigate()

    const blurHandler = (e) => {
        if (e.target.name === 'title' && e.target.value === '') {
            setFormData((prevState) => ({
                ...prevState,
                [e.target.name]: title
            }))
        }
    }

    const populateForm = async (e) => {

        const response = await fetch(`http://localhost:8080/getUser/${cookies.email}`, {
            method: "GET",
            headers: {
                'Content-type': 'application/json'
            },
        })
        const result = await response.json();
        console.log(result);

        setFormData((prevState) => ({
            ...prevState,
            title: result.title,
            community: result.community,
            address: result.address,
            from_date: result.from_date.substring(0,result.from_date.indexOf('T')),
            to_date: result.to_date.substring(0,result.to_date.indexOf('T')),
            number_of_rooms: result.number_of_rooms,
            userEmail: result.userEmail,
            rent_amount: result.rent_amount,
            sharing_price: result.sharing_price,
            private_room_price: result.private_room_price,
            nearest_station: result.nearest_station,
            red_eye_accessibility: result.red_eye_accessibility,
            distance_from_university: result.distance_from_university,
            nearby_grocery_stores: result.nearby_grocery_stores,
            amenities: result.amenities,
            room_photo: result.url
        }))
    }

  

    const handleSubmit = async (e) => {

        console.log('submitted')
        console.log(formData)
        // console.log(cookies.email)
        // console.log(formData)
        e.preventDefault();

        // console.log(formData.userEmail)
        // console.log("FormDATA", JSON.stringify(formData))
        const response = await fetch(`http://localhost:8080/details/${formData.userEmail}`, {
            method: "PUT",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(formData)
        })

        const result = await response.json();
        
        console.log(response.status);

        if (response.status === 200) {
            navigate("/dashboard");

        }
        window.alert("Room details posted successfully!");
        // console.log(response.status);
        // console.log(result);
    }

    const handleChange = (e) => {
        console.log('e', e);
        const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
        const name = e.target.name;

        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }))

    }

    return (
        <>
            <div className="mainContainer">
                <div>
                    <RoomForm handleChange={handleChange} handleSubmit={handleSubmit} blurHandler={blurHandler}
                        formData={formData}></RoomForm>
                </div>
                <div>
                    <RoomPreview formData={formData}></RoomPreview>
                    <div className='btn-class'>
                        <button className='view-button' onClick={populateForm}>View Post</button>
                        <button className='update-button'
                        onClick={handleSubmit}>Update Post</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RoomPost;