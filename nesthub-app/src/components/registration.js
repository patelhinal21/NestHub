
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './registration.scss'
import { useCookies } from 'react-cookie';
import FileBase64 from 'react-file-base64';
import { useForm, Controller } from "react-hook-form";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";


//setting state to register user
const OnBoarding = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const [user, setUser] = useState(null);
    const [formData, setFormData] = useState({
        lastName: "",
        firstName: "",
        dob_day: "",
        dob_month: "",
        dob_year: "",
        gender: "male",
        userEmail: cookies.email,
        phone: "",
        role: "finder",
        file: [],
        photo: '',
        dietary_preferences: "vegetarian",
        smoking_preference: "smoking"

    })

    let navigate = useNavigate()
    //logic to submit data onclick
    const handleSubmit = async (e) => {

        console.log('submitted')
        e.preventDefault()

        console.log(formData.userEmail)
        console.log("FormDATA", JSON.stringify(formData))
        const response = await fetch(`http://localhost:8080/details/${formData.userEmail}`, {
            method: "PUT",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(formData)
        })

        const result = await response.json();
        if (result.role === "poster") {
            navigate("/postroom");
        }
        else {
            navigate("/dashboard");
        }

        console.log(response.status);


    }
    const handleChange = (e) => {

        const value = e.target.type === "checkbox" ? e.target.checked : e.target.value
        const name = e.target.name

        setFormData({
            ...formData,
            [name]: value,

        })
    }


    const handlePhotoChange = (e) => {
        console.log('e', e)
        setFormData({
            ...formData,
            file: e.target.files[0],
            photo: URL.createObjectURL(e.target.files[0])

        })


    }


    const [value, setValue] = useState();


    return (
        <>


            <div className="register">
                <h2>CREATE ACCOUNT</h2>

                <form onSubmit={handleSubmit}>
                    <section>
                        <label htmlFor="first_name">First Name</label>
                        <input
                            id="first_name"
                            type='text'
                            name="firstName"
                            placeholder="First Name"
                            required={true}

                            onChange={handleChange}
                        />
                        <label htmlFor="last_name">Last Name</label>
                        <input
                            id="last_name"
                            type='text'
                            name="lastName"
                            placeholder="Last Name"
                            required={true}

                            onChange={handleChange}
                        />

                        <label>Birthday</label>
                        <div className="multiple-input-container">
                            <input
                                id="dob_day"
                                type="number"
                                name="dob_day"
                                placeholder="DD"
                                required={true}

                                onChange={handleChange}
                            />

                            <input
                                id="dob_month"
                                type="number"
                                name="dob_month"
                                placeholder="MM"
                                required={true}

                                onChange={handleChange}
                            />

                            <input
                                id="dob_year"
                                type="number"
                                name="dob_year"
                                placeholder="YYYY"
                                required={true}

                                onChange={handleChange}
                            />
                        </div>

                        <label>Gender</label>
                        <div className="multiple-input-container">
                            <input
                                id="male-gender-identity"
                                type="radio"
                                name="gender"
                                value="male"
                                onChange={handleChange}
                                checked={formData.gender === "male"}
                            />
                            <label htmlFor="male-gender-identity">Male</label>
                            <input
                                id="female-gender-identity"
                                type="radio"
                                name="gender"
                                value="female"
                                onChange={handleChange}
                                checked={formData.gender === "female"}
                            />
                            <label htmlFor="female-gender-identity">Female</label>
                            <input
                                id="other-gender-identity"
                                type="radio"
                                name="gender"
                                value="other"
                                onChange={handleChange}
                                checked={formData.gender === "other"}
                            />
                            <label htmlFor="other-gender-identity">Other</label>
                        </div>

                        <PhoneInput

                            defaultCountry="US"
                            className="phoneInput"
                            value={value}
                            onChange={value => setValue(value)}
                            placeholder="Enter phone number"
                            required={true}
                        />
                        {value && isValidPhoneNumber(value) ? "Valid Phone" : "Invalid Phone"}


                        <label>Role</label>
                        <div className="multiple-input-container">
                            <input
                                id="finder-role-identity"
                                type="radio"
                                name="role"
                                value="finder"
                                onChange={handleChange}
                                checked={formData.role === "finder"}
                            />
                            <label htmlFor="finder-role-identity">Finder</label>
                            <input
                                id="poster-role-identity"
                                type="radio"
                                name="role"
                                value="poster"
                                onChange={handleChange}
                                checked={formData.role === "poster"}
                            />
                            <label htmlFor="poster-role-identity">Poster</label>
                        </div>

                        <label>Dietary Preferences</label>

                        <div className="multiple-input-container">

                            <input

                                id="vegetarian"

                                type="radio"

                                name="dietary_preferences"

                                value="vegetarian"

                                onChange={handleChange}

                                checked={formData.dietary_preferences === "vegetarian"}

                            />

                            <label htmlFor="vegetarian">Vegetarian</label>

                            <input

                                id="non-vegetarian"

                                type="radio"

                                name="dietary_preferences"

                                value="non-vegetarian"

                                onChange={handleChange}

                                checked={formData.dietary_preferences === "non-vegetarian"}

                            />

                            <label htmlFor="non-vegetarian">Non Vegetarian</label>

                        </div>

                        <label>Smoking Preferences</label>

                        <div className="multiple-input-container">

                            <input

                                id="smoking"

                                type="radio"

                                name="smoking_preference"

                                value="smoking"

                                onChange={handleChange}

                                checked={formData.smoking_preference === "smoking"}

                            />

                            <label htmlFor="smoking">Smoking</label>

                            <input

                                id="non-smoking"

                                type="radio"

                                name="smoking_preference"

                                value="non-smoking"

                                onChange={handleChange}

                                checked={formData.smoking_preference === "non-smoking"}

                            />

                            <label htmlFor="non-smoking">Non Smoking</label>

                        </div>


                        <label htmlFor="url">Profile Photo</label>
                        { }
                        <FileBase64
                            multiple={false}
                            onDone={({ base64 }) => setFormData({
                                ...formData, photo: base64
                            })} />
                        <div className="photo-container">
                            {formData.photo !== '' ? <img src={formData.photo} alt="profile pic preview" /> : ""}
                        </div>
                        <input className="primary-button " type="submit" />

                    </section>

                </form>
            </div>
        </>
    )
}

export default OnBoarding