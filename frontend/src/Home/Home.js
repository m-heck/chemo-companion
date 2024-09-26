import './Home.css';
import NavBar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

function Home({ onSignOut, onChatbotClick }) {
  const handleSignOut = () => {
    onSignOut();
  };

  const handleLogoClick = () => {
    onSignOut();
  };

  return (
    <div className="Home">
      <NavBar onSignOut={handleSignOut} onLogoClick={handleLogoClick} onChatbotClick={onChatbotClick} /> 
      <main className="Home-main">
        <section className="hero">
          <h1>Welcome to ChemoCompanion</h1>
          <p>Your trusted partner in managing your health journey.</p>
          <div className="hero-buttons">
            <button className="primary-button">Get Started</button>
            <button className="secondary-button">Learn More</button>
          </div>
        </section>
        <div className="content-section">
          <h2>Features</h2>
          <h3>AI Chatbot for Immediate Support</h3>
          <p>
            Our AI chatbot is available 24/7 to help you manage your symptoms
            and provide personalized recommendations. Whether you have questions
            about side effects or need advice on self-care, our chatbot is here
            for you.
          </p>
          <h3>Real-Time Symptom Tracking</h3>
          <p>
            Easily log your symptoms and share them with your healthcare team,
            ensuring you receive the care you need when you need it.
          </p>
          <h3>Resources and Support</h3>
          <p>
            Access a library of resources designed to help you navigate your
            treatment journey. From articles to support networks, we have you
            covered.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Home;
