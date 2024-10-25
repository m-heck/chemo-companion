import './Landing.css';
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer/Footer';
import { useState } from 'react';

function Landing() {
  const navigate = useNavigate();
  const [activeAccordion, setActiveAccordion] = useState(null);

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSignUpClick = () => {
    navigate('/signup');
  };

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  return (
    <div className="Landing">
      <header className="Landing-header">
        <div className="Landing-header-overlay"></div>
        <h1>ChemoCompanion</h1>
        <p>Supporting you through every step of your chemotherapy journey</p>
      </header>

      <main className="Landing-main">
        <section className="intro-section">
          <h2>Welcome to ChemoCompanion</h2>
          <p>
            ChemoCompanion offers personalized support and guidance to chemotherapy patients. 
            Stay connected with your medical team, track your health, and access an AI-driven chatbot 
            for real-time support and advice. HIPAA-compliant, stress-reducing, and always there for you.
          </p>
        </section>

        <section className="auth-section">
          <button className="log-in-button" onClick={handleLoginClick}>Log In</button>
          <button className="signup-button" onClick={handleSignUpClick}>Sign Up</button>
        </section>

        <section className="statistics">
          <div className="statistic">
            <h2>97.4%</h2>
            <p>of patients experience at least one side effect post-chemotherapy.</p>
          </div>
          <div className="statistic">
            <h2>2 million</h2>
            <p>new cancer diagnoses annually in the U.S.</p>
          </div>
          <div className="statistic">
            <h2>30-35%</h2>
            <p>of cancer patients experience psychiatric disorders.</p>
          </div>
        </section>

        <section className="features">
          <h2>Features of ChemoCompanion</h2>
          <ul className="feature-list">
            <li className="feature-item">Real-time health monitoring</li>
            <li className="feature-item">AI chatbot support</li>
            <li className="feature-item">Emergency nurse connections</li>
            <li className="feature-item">VR/AR experiences</li>
            <li className="feature-item">Stress-relief games</li>
            <li className="feature-item">Seamless communication with healthcare providers</li>
          </ul>

          <p>
            ChemoCompanion is designed to address the unique challenges faced by chemotherapy patients. 
            With real-time health monitoring and AI support, patients can track their symptoms and receive 
            guidance tailored to their specific needs. Our platform aims to bridge the gap between patients 
            and healthcare providers, ensuring that individuals have access to the resources and support they need.
          </p>
          <p>
            We understand that every patient's journey is different. Therefore, ChemoCompanion offers 
            personalized experiences that adapt to each individual's treatment plan. Through innovative 
            technologies like VR and AR, patients can engage in stress-relief activities that promote 
            mental well-being during their treatment journey.
          </p>
          <p>
            Ultimately, ChemoCompanion aims to empower patients with the tools and information necessary 
            to navigate their chemotherapy experience effectively. By fostering a supportive community and 
            providing accessible resources, we strive to improve the quality of life for cancer patients 
            and their families.
          </p>
        </section>

        <section className="accordion">
          <h2 className="learn-more">Learn More</h2>
          <div className="accordion-item">
            <div className="accordion-header" onClick={() => toggleAccordion(0)}>
              What is ChemoCompanion?
            </div>
            <div className={`accordion-content ${activeAccordion === 0 ? 'active' : ''}`}>
              <p>ChemoCompanion is a support app designed specifically for chemotherapy patients, providing tools to help manage their treatment journey effectively.</p>
            </div>
          </div>
          <div className="accordion-item">
            <div className="accordion-header" onClick={() => toggleAccordion(1)}>
              How does the AI chatbot work?
            </div>
            <div className={`accordion-content ${activeAccordion === 1 ? 'active' : ''}`}>
              <p>The AI chatbot is available 24/7 to answer patient questions, provide information about side effects, and offer emotional support.</p>
            </div>
          </div>
          <div className="accordion-item">
            <div className="accordion-header" onClick={() => toggleAccordion(2)}>
              What are the future plans for ChemoCompanion?
            </div>
            <div className={`accordion-content ${activeAccordion === 2 ? 'active' : ''}`}>
              <p>Future plans include improved AI personalization and training, the ability to chat in real-time with your healthcare provider, and additional account management features.</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Landing;
