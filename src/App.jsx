import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router';
import Home from './pages/Home';
import Products from './pages/Products';
import Register from './pages/Register';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </Router>
  );
}

export default App;
