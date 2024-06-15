import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import Nav from './Nav';

//setting the state
const FeedbackForm = () => {
    const [formData, setFormData] = useState({
        lastName: "",
        firstName: "",
        dob_day: "",
        dob_month: "",
        dob_year: "",
        gender: "male"
    })


    let navigate = useNavigate()
//function to submit form
    const formSubmit = async (e) => {

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

    const handleOnChange = (e) => {

        const value = e.target.type === "checkbox" ? e.target.checked : e.target.value
        const name = e.target.name

        setFormData({
            ...formData,
            [name]: value,

        })
    }


// feedback form html
    return (
        <>
            <Nav></Nav>
            <div className="register">
                <h2>Feedback Form</h2>

                <form onSubmit={formSubmit}>
                    <section>
                        <label htmlFor="first_name">First Name</label>
                        <input
                            id="first_name"
                            type='text'
                            name="firstName"
                            placeholder="First Name"
                            required={true}

                            onChange={handleOnChange}
                        />
                        <label htmlFor="last_name">Last Name</label>
                        <input
                            id="last_name"
                            type='text'
                            name="lastName"
                            placeholder="Last Name"
                            required={true}

                            onChange={handleOnChange}
                        />

                        <label>Were you able to find a room?</label>
                        <div className="multiple-input-container">
                            <input
                                id="male-gender-identity"
                                type="radio"
                                name="gender"
                                value="Yes"
                                onChange={handleOnChange}
                                checked={formData.gender === "Yes"}
                            />
                            <label htmlFor="male-gender-identity">Yes</label>
                            <input
                                id="female-gender-identity"
                                type="radio"
                                name="No"
                                value="No"
                                onChange={handleOnChange}
                                checked={formData.gender === "No"}
                            />
                            <label htmlFor="female-gender-identity">No</label>
                        </div>
                        <label htmlFor="review">Review</label>
                        <input
                            id="review"
                            type="text-area"
                            name="Review"
                            placeholder="Tell us how we can provide a better experience"
                            onChange={handleOnChange}
                        />
                        <input className="primary-button " type="submit" />
                    </section>
                </form>
            </div>
        </>
    )
}

export default FeedbackForm;