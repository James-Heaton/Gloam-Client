import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { MyAdventurers } from "./pages/MyAdventurers";
import { NewAdventurer } from "./pages/NewAdventurer";
import { EditAdventurer } from "./pages/EditAdventurer";
import { DeleteConfirmation } from "./pages/DeleteConfirmation";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Navbar } from "./components/Navbar";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import GamePage from "./components/game/GamePage";
import { GameProvider } from "./context/GameProvider";
import { Landing } from "./pages/Landing";
import { About } from "./pages/About";
import { Rules } from "./pages/Rules";
import backgroundImage from "./assets/images/main-bg2.webp";

const AppContent = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const location = useLocation();
  
  // Hide navbar on login/register pages
  const showNavbar = isAuthenticated && location.pathname !== '/' && location.pathname !== '/register';

  // Check if we're on a page that should fade in
  const shouldFadeIn = location.pathname === '/landing';

  return (
    <div
      className={`min-h-screen bg-cover bg-center bg-fixed ${shouldFadeIn ? 'animate-fadeIn' : ''}`}
      style={{ 
        backgroundImage: `url(${backgroundImage})`,
        backgroundPosition: 'center calc(0% + 4rem)'
      }}
    >
      {showNavbar && <div className={shouldFadeIn ? 'animate-fadeIn' : ''}><Navbar /></div>}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/landing"
            element={
              <ProtectedRoute>
                <Landing />
              </ProtectedRoute>
            }
          />

          <Route
            path="/rules"
            element={
              <ProtectedRoute>
                <Rules />
              </ProtectedRoute>
            }
          />

          <Route
            path="/about"
            element={
              <ProtectedRoute>
                <About />
              </ProtectedRoute>
            }
          />

          <Route
            path="/characters"
            element={
              <ProtectedRoute>
                <MyAdventurers />
              </ProtectedRoute>
            }
          />

          <Route
            path="/characters/new"
            element={
              <ProtectedRoute>
                <NewAdventurer />
              </ProtectedRoute>
            }
          />

          <Route
            path="/characters/:id/edit"
            element={
              <ProtectedRoute>
                <EditAdventurer />
              </ProtectedRoute>
            }
          />

          <Route
            path="/characters/:id/delete"
            element={
              <ProtectedRoute>
                <DeleteConfirmation />
              </ProtectedRoute>
            }
          />

          <Route
            path="/game"
            element={
              <ProtectedRoute>
                <GameProvider>
                  <GamePage />
                </GameProvider>
              </ProtectedRoute>
            }
          />
        </Routes>
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;