import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { MyAdventurers } from './pages/MyAdventurers';
import { NewAdventurer } from './pages/NewAdventurer';
import { EditAdventurer } from './pages/EditAdventurer';
import { DeleteConfirmation } from './pages/DeleteConfirmation';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/characters" element={<MyAdventurers />} />
        <Route path="/characters/new" element={<NewAdventurer />} />
        <Route path="/characters/:id/edit" element={<EditAdventurer />} />
        <Route path="/characters/:id/delete" element={<DeleteConfirmation />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
