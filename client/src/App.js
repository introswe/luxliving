import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import HomePage from './Pages/Home';
import ProductsPage from './Pages/Products';
import AccountPage from './Pages/Account';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/account" element={<AccountPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
