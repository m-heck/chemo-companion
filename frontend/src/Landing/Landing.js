import './Landing.css';
import Footer from '../Footer/Footer';
import { useNavigate } from 'react-router-dom';

function Landing() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSignUpClick = () => {
    navigate('/signup');
  };

  return (
    <div className="Landing">
      <header className="App-header">
        <h1>ChemoCompanion</h1>
        <p>Your trusted companion through chemotherapy, offering support, guidance, and resources.</p>
      </header>

      <main className="Landing-main">
        <section className="intro-section">
          <h2>Introduction</h2>
          <p>ChemoCompanion is designed to support chemotherapy patients by offering valuable resources and enabling smooth communication with their medical teams. We tackle current gaps by providing real-time health stats, an empathetic AI chatbot, emergency nurse connections, and stress-relief activities. Our goal is to reduce stress, improve care, and ensure privacy with HIPAA compliance.</p>
        </section>

        <section className="auth-section">
          <h2>Access Your Account</h2>
          <button className="log-in-button" onClick={handleLoginClick}>Log In</button>
          <button className="signup-button" onClick={handleSignUpClick}>Sign Up</button>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Landing;