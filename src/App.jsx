import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { MyAdventurers } from './pages/MyAdventurers';
import { NewAdventurer } from './pages/NewAdventurer';
import { EditAdventurer } from './pages/EditAdventurer';
import { DeleteConfirmation } from './pages/DeleteConfirmation';
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Navbar } from './components/Navbar';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';

const App = () => {
  const { isAuthenticated } = useContext(AuthContext);
  
  return (
    <BrowserRouter>
      {isAuthenticated && <Navbar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route path="/characters" element={
          <ProtectedRoute>
            <MyAdventurers />
          </ProtectedRoute>
        } />
        
        <Route path="/characters/new" element={
          <ProtectedRoute>
            <NewAdventurer />
          </ProtectedRoute>
        } />
        
        <Route path="/characters/:id/edit" element={
          <ProtectedRoute>
            <EditAdventurer />
          </ProtectedRoute>
        } />
        
        <Route path="/characters/:id/delete" element={
          <ProtectedRoute>
            <DeleteConfirmation />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
