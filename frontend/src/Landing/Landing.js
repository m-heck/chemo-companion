import '../App/App.css';

function Landing() {
  return (
    <div className="Landing">
      <header className="App-header">
        <h1>ChemoCompanion</h1>
        <p>Your trusted companion through chemotherapy, offering support, guidance, and resources.</p>
      </header>

      <main className="App-main">
        <section className="features-section">
          <h2>What’s Coming Soon</h2>
          <ul>
            <li>Empathetic AI Chatbot for Guidance and Support</li>
            <li>Medical Staff Chat Page</li>
            <li>Stress-Relief Activities (VR/AR)</li>
            <li>Real-Time Health Statistics Sharing</li>
            <li>Account Management Tools</li>
            <li>Resource Library</li>
          </ul>
        </section>

        <section className="login-section">
          <h2>Log in to Your Account</h2>
          <p>Access your health stats, communicate with your medical team, and more.</p>
          <button className="login-button">Login</button>
        </section>
      </main>

      <footer className="App-footer">
        <p>© 2024 ChemoCompanion - HIPAA Compliant Care for Chemotherapy Patients</p>
      </footer>
    </div>
  );
}

export default Landing;
