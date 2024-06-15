import { useEffect, useState } from "react";
import { json } from "react-router-dom";
import { useCookies } from "react-cookie";

//Logic to display matches accoriding to filtering the roles and prefrences
const MatchesDisplay = ({ matches, setClickedUser }) => {

  const [cookies, setCookie, removeCookie] = useCookies(null);
  const userEmail = cookies.email

  const [matchedUser, setMatchedUsers] = useState(null)
  const matchedUserEmails = matches.map(({ userEmail }) => userEmail)
 
  //function to get matches
  const getMatchedUsers = async () => {
    const response = await fetch(`http://localhost:8080/getMatches`, {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(matchedUserEmails)

    })
    const result = await response.json();
    setMatchedUsers(result)
  };

  useEffect(() => {
    getMatchedUsers()
  }, [matches])

  const filteredMatches = matchedUser?.filter(
    (matchedProfile) =>
      matchedProfile.matches?.filter((profile) => profile.userEmail === userEmail)
        .length > 0);

  return (
    <div className="matches-display">
      {filteredMatches?.map((match, _id) => (

        <div key={{ _id }} className="match-card" onClick={() => setClickedUser(match)}>
          <div className="img-container">
            <img src={match?.photo} alt={match?.firstName} />
          </div>
          <h5>{match?.firstName}</h5>
        </div>
      ))}
    </div>
  );
};

export default MatchesDisplay;
