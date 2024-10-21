import './Home.css';
import NavBar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="Home">
      <NavBar /> 
      <main className="Home-main">
        <section className="hero">
          <h1>Welcome to ChemoCompanion</h1>
          <p>Your trusted partner in managing your health journey.</p>
          <div className="hero-buttons">
            <Link to="/chatbot">
              <button className="primary-button">Get Started</button>
            </Link>
            <Link to="/learn-more">
              <button className="secondary-button">Learn More</button>
            </Link>
          </div>
        </section>
        <div className="content-section">
          <h2>Features</h2>
          <h3>AI Chatbot for Immediate Support</h3>
          <p>Our AI chatbot is available 24/7 to help you manage your symptoms and provide personalized recommendations.</p>
          <h3>Real-Time Symptom Tracking</h3>
          <p>Easily log your symptoms and share them with your healthcare team, ensuring you receive the care you need when you need it.</p>
          <h3>Resources and Support</h3>
          <p>Access a library of resources designed to help you navigate your treatment journey.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Home;
