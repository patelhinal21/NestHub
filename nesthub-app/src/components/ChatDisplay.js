import Chat from './Chat'
import ChatInput from './ChatInput'
import { useState, useEffect } from "react"



const ChatDisplay = ({ user, clickedUser }) => {
    const userEmail = user?.userEmail
    const clickedUserEmail = clickedUser?.userEmail
    const [usersMessages, setUsersMessages] = useState(null)
    const [clickedUsersMessages, setClickedUsersMessages] = useState(null)

//Function to get messages for chat history from user1 to user2
    const getUsersMessages = async () => {
        try {
            const response = await fetch(`http://localhost:8080/getMessages/${userEmail}/${clickedUserEmail}`, {
                method: "GET",
                headers: {
                    'Content-type': 'application/json'
                },

            })
            const result = await response.json();
            console.log("resutl", result);
            setUsersMessages(result)
        } catch (error) {
            console.log(error)
        }
    }

//Function to get messages for chat history from user2 to user1
    const getClickedUsersMessages = async () => {
        try {
            const response = await fetch(`http://localhost:8080/getMessages/${clickedUserEmail}/${userEmail}`, {
                method: "GET",
                headers: {
                    'Content-type': 'application/json'
                },
            })

            const result = await response.json();
            console.log("resutl", result);
            setClickedUsersMessages(result)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getUsersMessages()
        getClickedUsersMessages()
    }, [usersMessages, clickedUsersMessages])

    const messages = []

    usersMessages?.forEach(message => {
        const formattedMessage = {}
        formattedMessage['name'] = user?.firstName
        formattedMessage['img'] = user?.photo
        formattedMessage['message'] = message.message
        formattedMessage['timestamp'] = message.timestamp
        messages.push(formattedMessage)
    })

    clickedUsersMessages?.forEach(message => {
        const formattedMessage = {}
        formattedMessage['name'] = clickedUser?.firstName
        formattedMessage['img'] = clickedUser?.photo
        formattedMessage['message'] = message.message
        formattedMessage['timestamp'] = message.timestamp
        messages.push(formattedMessage)
    })

    //function to arrange the messages according to the timestamp
    const descendingOrderMessages = messages?.sort((a, b) => a.timestamp.localeCompare(b.timestamp))
    
    
    return (
        <>
            <Chat descendingOrderMessages={descendingOrderMessages} />
            <ChatInput
                user={user}
                clickedUser={clickedUser} getUserMessages={getUsersMessages} getClickedUsersMessages={getClickedUsersMessages} />
        </>
    )
}

export default ChatDisplay