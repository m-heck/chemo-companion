import './Landing.css';
import Footer from '../Footer/Footer';

function Landing({ onLoginClick }) {
  return (
    <div className="Landing">
      <header className="App-header">
        <h1>ChemoCompanion</h1>
        <p>Your trusted companion through chemotherapy, offering support, guidance, and resources.</p>
      </header>

      <main className="Landing-main">
        <section className="intro-section">
          <h2>Introduction</h2>
          <p>ChemoCompanion is designed to support chemotherapy patients by offering valuable resources and enabling smooth communication with their medical teams. We tackle current gaps by providing real-time health stats, an empathetic AI chatbot, emergency nurse connections, and stress-relief activities. Our goal is to reduce stress, improve care, and ensure privacy with HIPAA compliance. We offer tailored experiences for both patients and medical staff to make interactions efficient, secure, and supportive throughout the treatment process.</p>
        </section>

        <section className="login-section">
          <h2>Log in to Your Account</h2>
          <button className="login-button" onClick={onLoginClick}>Login</button>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Landing;
