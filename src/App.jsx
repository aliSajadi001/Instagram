import { Route, Routes } from 'react-router-dom';
import Login from './pages/register/Login';
import Home from './pages/Home';
import Signup from './pages/register/Signup';
import { Toaster } from 'react-hot-toast';
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
