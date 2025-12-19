import { Link } from "react-router-dom";

export const MyAdventurers = () => {
  return (
    <div>
      <h1>My Adventurers Page</h1>
      <p>My Adventurers List Will Go Here</p>
      <Link to="/characters/1/edit">Edit</Link>
      <Link to="/characters/1/delete">Delete</Link>
      <Link to="/characters/new">Create Character</Link>
      <Link to="/">Sign Out</Link>
    </div>
  );
};
