import { Link } from "react-router-dom";

export const DeleteConfirmation = () => {
  return (
    <div>
      <h1>Delete Adventurer Page</h1>
      <p>Are you really REALLY sure????</p>
      <Link to="/characters">Cancel</Link>
      <Link to="/characters">Delete Forever</Link>
    </div>
  );
};
