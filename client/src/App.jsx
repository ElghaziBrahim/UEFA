import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Hero from './componants/Home/Hero';
import Main from './componants/Home/Main';
import Dashboard from './componants/Dashboard/Dashboard';
import Navbar from './componants/Navbar';

function App() {
  return (
    <Router>
      <div >
        <Navbar />
        <Routes>
          <Route exact path="/" element={
            <main>
              <Hero />
              <Main />
            </main>
          } />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;