import Nav from '../components/Nav'
import Home from "../components/Home"
import SignUp from "../components/SignUp"
import { useState } from 'react'



//fuction to handle login
const Login = () => {
    const [showModal, setShowModal] = useState(false)
    const [isSignUp, setIsSignUp] = useState(true)
    const authToken = true

//using modal to swutch between login and sign up
    const handleClick = () => {
        setShowModal(true)
        setIsSignUp(false)
    }

    const handleSignUp = () => {

        setShowModal(true)
        setIsSignUp(true)
    }

    return (
        <div className="overlay">
            { }
            <div className="home">
                <h1 className="primary-title">Nesthub®</h1>
                <h5 className="secondary-title">Swipe for your next roommate!</h5>
                <div className="seperateButton">
                    <button className="primary-button" onClick={handleClick}>
                        Login
                    </button>
                    <button className="primary-button" onClick={handleSignUp}>
                        Sign Up
                    </button></div>
                {showModal && isSignUp ? (
                    <SignUp />
                ) : (
                    <Home />
                )}

            </div>
        </div>
    )
}
export default Login