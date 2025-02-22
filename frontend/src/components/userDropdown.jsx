import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

const UserDropdown = ({ user, user_id, logoutUser }) => {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="primary" id="dropdown-basic">
        {user.username}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item as={Link} to={`/profile/${user_id}`}>
          Profile Details
        </Dropdown.Item>
        <Dropdown.Item onClick={logoutUser}>Log Out</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default UserDropdown;
