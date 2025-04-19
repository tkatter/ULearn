import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Homepage from './pages/Homepage';

function App() {
  return (
    <Routes>
      <Route index element={<Homepage />} />
      <Route path="login" element={<Login />} />
    </Routes>
  );
}

export default App;
