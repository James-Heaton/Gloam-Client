import { Link } from "react-router-dom";

export const NewAdventurer = () => {
  return (
    <div>
      <h1>New Adventurer Page</h1>
      <p>Create Adventurer For Will Go Here</p>
      <Link to="/characters">Create Character</Link>
      <Link to="/characters">Back</Link>
    </div>
  );
};
