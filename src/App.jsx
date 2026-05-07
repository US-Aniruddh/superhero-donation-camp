import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import SpiderMan from './pages/SpiderMan';
import Batman from './pages/Batman';
import Donors from './pages/Donors';

function App() {
  return (
    <ThemeProvider>
      <div className="app-container" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <main className="main-content" style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/spiderman" element={<SpiderMan />} />
            <Route path="/batman" element={<Batman />} />
            <Route path="/donors/:hero" element={<Donors />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
