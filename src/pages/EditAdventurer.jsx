import { Link } from "react-router-dom";

export const EditAdventurer = () => {
  return (
    <div>
      <h1>Edit Adventurer Page</h1>
      <p>Edit Adventurer Form Will Go Here</p>
      <Link to="/characters">Save Changes</Link>
      <Link to="/characters">Back</Link>
    </div>
  );
};
