import { useState} from 'react'

//Function to post messages between users
const ChatInput = ({ user, clickedUser, getUserMessages, getClickedUsersMessages }) => {
    const [textArea, setTextArea] = useState("")
    const userEmail = user?.userEmail
    const clickedUserEmail= clickedUser?.userEmail

    const handleSubmit = async (e) => {
        const message = {
            timestamp: new Date().toISOString(),
            from_emailId: userEmail,
            to_emailId: clickedUserEmail,
            message: textArea
        }


        const response = await fetch(`http://localhost:8080/postMessages`, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(message)
            
        })
            getUserMessages()
            getClickedUsersMessages()
            setTextArea("")
       
    }
        
          
    
    return (
        <div className="chat-input">
            <textarea value={textArea} onChange={(e) => setTextArea(e.target.value)}/>
            <button className="primary-button" onClick={handleSubmit}>Send</button>
        </div>
    )
    }

export default ChatInput