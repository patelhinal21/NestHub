import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'

// Funtion to display photo and logout button
const ChatHeader = ({ user }) => {
    const [cookies, setCookie, removeCookie] = useCookies(['user'])
    let navigate = useNavigate()
    const logout = () => {
        removeCookie('email', cookies.email);
        navigate('/');
    }

    return (
        <div className="chat-container-header">
            <div className="profile">
                <div className="img-container">
                    <img src={`${user.photo}`} />
                </div>
                <h3> {!user ? "loading" : `${user.firstName} ${user.lastName}`}  </h3>
            </div>
            <i className="log-out-icon" onClick={logout}>⇦Logout</i>
        </div>
    )
}

export default ChatHeader