import './Resources.css';
import NavBar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import React from 'react';

function Resources() {
    return (
        <div className="Resources">
            <NavBar /> 
            <main className="Resources-main">
                <section className="intro-section">
                    <h2>Find Reliable Information</h2>
                    <p>
                        Here are some trusted resources that can help you understand chemotherapy treatments better. 
                        Explore these links for comprehensive information about your treatment options, side effects, and support.
                    </p>
                </section>

                <section className="resource-list">
                    <div className="resource-item">
                        <h3>American Cancer Society</h3>
                        <p>The American Cancer Society provides comprehensive resources on chemotherapy and cancer treatment.</p>
                        <a href="https://www.cancer.org" target="_blank" rel="noopener noreferrer" className="resource-link">Visit Website</a>
                    </div>
                    <div className="resource-item">
                        <h3>National Cancer Institute</h3>
                        <p>The National Cancer Institute offers detailed information about different types of chemotherapy and treatment plans.</p>
                        <a href="https://www.cancer.gov" target="_blank" rel="noopener noreferrer" className="resource-link">Visit Website</a>
                    </div>
                    <div className="resource-item">
                        <h3>CancerCare</h3>
                        <p>CancerCare provides support services and information for those affected by cancer, including chemotherapy.</p>
                        <a href="https://www.cancercare.org" target="_blank" rel="noopener noreferrer" className="resource-link">Visit Website</a>
                    </div>
                    <div className="resource-item">
                        <h3>Healthline</h3>
                        <p>Healthline offers articles on chemotherapy, side effects, and patient experiences.</p>
                        <a href="https://www.healthline.com" target="_blank" rel="noopener noreferrer" className="resource-link">Visit Website</a>
                    </div>
                </section>
            </main>

            <Footer /> {/* Footer at the bottom */}
        </div>
    );
}

export default Resources;
