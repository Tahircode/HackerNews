import { Routes, Route } from "react-router-dom";
import {Navbar} from "./components/Navbar.jsx";
import {ProtectedRoute} from "./components/ProtectedRoute.jsx";
import {Home} from "./pages/Home.jsx";
import {Login} from "./pages/Login.jsx";
import {Register} from "./pages/Register.jsx";
import {Bookmarks} from "./pages/Bookmarks.jsx";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/bookmarks"
          element={
            <ProtectedRoute>
              <Bookmarks />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

export default App;