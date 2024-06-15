import nestLogo from "../Images/nestLogo.jpeg";

const Nav = ({ authToken, setShowModal, showModal, setIsSignUp }) => {
  const handleClick = () => {
    setShowModal(true);
    setIsSignUp(false);
  };

  return (
    <nav>
      <div className="nav-title">Nesthub</div>
    </nav>
  );
};
export default Nav;