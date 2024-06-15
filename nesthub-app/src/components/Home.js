import { useState } from "react";
import './login.scss';
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';



const Login = () => {
	//setting states
	const [data, setData] = useState({ userEmail: "", userPassword: "" });
	const [name, setName] = useState();
	const [error, setError] = useState("");
	const [cookies, setCookie, removeCookie] = useCookies(['user']);
	let navigate = useNavigate();
	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};
	//Function to handle when submit button is clicked
	const handleSubmit = async (e) => {
		e.preventDefault();
		const response = await fetch('http://localhost:8080/login', {
			method: "POST",
			headers: {
				'Content-type': 'application/json'
			},
			body: JSON.stringify(data)


		})

		const result = await response.json();
		setName(result);
		if (response.status === 200) {
			console.log(result.role);
			setCookie('email', data.userEmail);
			navigate('/dashboard');
		} else {
			window.alert("Invalid User-Email or Password");
		}


	};

	return (

		<div className="login">
			<h2>Login</h2>


			<form onSubmit={handleSubmit}>
				<section>
					<label htmlFor="userEmail">Username</label>
					<input
						type="email"
						placeholder="Email"
						name="userEmail"
						onChange={handleChange}
						value={data.email}
						required

					/>
					<label htmlFor="userPassword">Password</label>
					<input
						type="password"
						placeholder="Password"
						name="userPassword"
						onChange={handleChange}
						value={data.password}
						required

					/>
					<button type="submit" className="primary-button submit" >
						Login
					</button>

				</section>
			</form>

		</div>

	);
};

export default Login;