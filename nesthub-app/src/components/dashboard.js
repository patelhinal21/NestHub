import TinderCard from 'react-tinder-card';
import { useState, useEffect } from 'react';
import ChatContainer from './ChatContainer';
import './dashboard.scss';
import { useCookies } from 'react-cookie';
import PopUp from './PopUp/PopUp';
import { useNavigate } from 'react-router-dom';
import Nav from './Nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHouse, faPlus, faTrash, faComment } from '@fortawesome/free-solid-svg-icons';
import RoomPreview from './RoomPostContainer/RoomPreview/RoomPreview';
import FinderRoomPreview from './FinderRoomPreview/FinderRoomPreview.js';



const Dashboard = () => {
  //User details state
  const [user, setUser] = useState({
    lastName: " ",
    firstName: " ",
    dob_day: " ",
    dob_month: " ",
    dob_year: " ",
    gender: " ",
    userEmail: ' ',
    phone: " ",
    role: " ",
    file: [],
    photo: ' ',
    dietary_preferences: " ",
    smoking_preference: " ",
    matches: []

  })
  let navigate = useNavigate()
  const [cards, setCard] = useState([])
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const userEmail = cookies.userEmail
  const [lastDirection, setLastDirection] = useState()
  const [hidePopup, setHidePopup] = useState(false);
  const [posterOfCardIndex, setPosterOfCardIndex] = useState(0);
  const [notSelectedCards, setNotSelectedCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);


  //Function post matches after swiping left and right
  const updateMatch = async (swippedUserEmail) => {
    const response = await fetch(`http://localhost:8080/addMatch/${cookies.email}/${swippedUserEmail}`, {
      method: "PUT",
      headers: {
        'Content-type': 'application/json'
      },

    })
    const result = await response.json();

  }

  //Function to add swiping logix
  const swiped = (direction, userEmail) => {
    if (direction === 'right') {
      updateMatch(userEmail)
    }
    console.log("Calling swiped");
    setLastDirection(direction)

  }

  const outOfFrame = (name) => {
    console.log(name + 'left the screen!')
    console.log("Updating poster index");
    setPosterOfCardIndex(posterOfCardIndex - 1);

  }

  //Fuction to get user details
  const getUser = async () => {
    const response = await fetch(`http://localhost:8080/getUser/${cookies.email}`, {
      method: "GET",
      headers: {
        'Content-type': 'application/json'
      },

    })
    const result = await response.json();
    console.log("resulting USER", result);
    setUser(result)
  };

  //Fuction to get card details
  const getCards = async () => {

    if (!user) {
      console.log("USER NOT AVAILABLE")
      return;

    }
    let passingRole = '';
    if (user.role === 'finder')
      passingRole = 'poster';
    if (user.role === 'poster')
      passingRole = 'finder';


    const response = await fetch(`http://localhost:8080/getCards/${passingRole}`, {
      method: "GET",
      headers: {
        'Content-type': 'application/json'
      },

    })
    const result = await response.json();
    console.log("Cards Result Shekar", result);
    setCard(result);

  };

  //Fuction to delete user details
  const handleDelete = async (e) => {
    try {
      const response = await fetch(`http://localhost:8080/delete/${cookies.email}`, {
        method: "DELETE",
        headers: {
          'Content-type': 'application/json'
        },

      })
      const result = await response.json();
      if (response.status === 200) {
        window.alert("User Deleted successfully!");
        removeCookie('email', cookies.email);
        navigate('/');
      }
    } catch (error) {
      console.log(error)
    }
  }

  //using Userffect to load data when the pages get rendered
  useEffect(() => {

    getUser()

  }, []);

  useEffect(() => {
    getCards();
    setNotSelectedCards(user?.matches.map(({ userEmail }) => userEmail).concat(userEmail));
  }, [user]);

  useEffect(() => {
    setFilteredCards(cards?.filter(cards => !notSelectedCards.includes(cards.userEmail)))
  }, [cards])

  useEffect(() => {
    setPosterOfCardIndex(filteredCards.length - 1);
  }, [filteredCards])

  function Button({ children }) {
    return <button className="primary-button">{children}</button>;
  }

  return (
    <>

      <div>
        {user != null ?
          <div className="dashboard">
            <ChatContainer user={user}></ChatContainer>
            <div className="profile-container">
              <div className="card-container">
                {
                  user.role === "finder"
                    ?
                    filteredCards.map((character) => {

                      console.log(character.userEmail);
                      return <TinderCard className='swipe' key={character.userEmail}
                        onSwipe={(dir) => swiped(dir, character.userEmail)}
                        onCardLeftScreen={() => outOfFrame(character.firstName)}>
                        <FinderRoomPreview formData={character} />
                      </TinderCard>

                    })
                    :

                    filteredCards.map((character) => {

                      console.log(character.userEmail);
                      return <TinderCard className='swipe' key={character.userEmail}
                        onSwipe={(dir) => swiped(dir, character.userEmail)}
                        onCardLeftScreen={() => outOfFrame(character.firstName)}>
                        <div style={{ backgroundImage: 'url(' + character.photo + ')' }}
                          className='card'>
                          <h3>{character.firstName} {character.lastName}</h3>
                        </div>
                      </TinderCard>

                    })
                }


              </div>

            </div>
            <div className='icons'>
              <button className="primary-button" onClick={() => {
                navigate('/postroom')
              }}><FontAwesomeIcon icon={faHouse} /></button>
              <button className="primary-button" onClick={() => {
                navigate('/Onboarding')
              }}><FontAwesomeIcon icon={faPlus} /></button>
              <button className='primary-button' onClick={() => {
                setHidePopup(prev => !prev);
              }}><FontAwesomeIcon icon={faUser} /></button>
              {(hidePopup) && <PopUp setHidePopup={setHidePopup} user={user}></PopUp>}
              {/* <Button onClick={<PopUp/>} >Show Poster Profile</Button> */}
              <button className="primary-button" onClick={handleDelete}><FontAwesomeIcon icon={faTrash} /></button>
              <button className="primary-button" onClick={() => {
                navigate('/FeedbackForm')
              }}><FontAwesomeIcon icon={faComment} /></button>
            </div>
          </div> : <div>Loading</div>}
      </div>
    </>
  )

}

export default Dashboard;