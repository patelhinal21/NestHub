import { useState } from "react";
import axios from "axios";
import './login.scss';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';



//setting state for signup
const SignUp = () => {
	const [data, setData] = useState({ userEmail: "", userPassword: "" });
	const [error, setError] = useState("");
	const [cookies, setCookie, removeCookie] = useCookies(['user']);

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	let navigate = useNavigate();
//submitting details on click
	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(JSON.stringify(data));


		const response = await fetch('http://localhost:8080/auth', {
			method: "POST",
			headers: {
				'Content-type': 'application/json'
			},
			body: JSON.stringify(data)


		})

		const result = response.json();
		console.log(data.userEmail);
		console.log(response.status);




		if (response.status === 201) {
			setCookie('email', data.userEmail)
			navigate('/OnBoarding');
		} else if (response.status === 409) {
			window.alert("User Email Exists already");
		} else if (response.status === 403) {
			window.alert("Password not Strong enough. Use Capitals, Special chars, numbers, and 10 digits");
		}

	};

	return (

		<div className="login">
			<h2>Sign Up</h2>


			<form onSubmit={handleSubmit}>
				<section>
					<label htmlFor="email">Username</label>
					<input
						type="email"
						placeholder="Email"
						name="userEmail"
						onChange={handleChange}
						value={data.userEmail}
						required

					/>
					<label htmlFor="password">Password</label>
					<input
						type="password"
						placeholder="Password"
						name="userPassword"
						onChange={handleChange}
						value={data.userPassword}
						required

					/>
					<label htmlFor="password-check">Confirm Password</label>
					<input
						type="password"
						id="password-check"
						name="password-check"
						placeholder="Confirm password"
						required={true}
					/>
					{/* <button type="submit" className="primary-button" >
						Sign Up
					</button>			 */}
					{/*<Link to="/OnBoarding">*/}
					<button type="submit" className="primary-button submit" >
						Sign Up
					</button>


				</section>
			</form>

		</div>

	);
};

export default SignUp;