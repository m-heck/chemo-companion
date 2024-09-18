import './Home.css';
import NavBar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

function Home({ onSignOut }) {
  const handleSignOut = () => {
    onSignOut();
  };

  const handleLogoClick = () => {
    onSignOut();
  };

  return (
    <div className="Home">
      <NavBar onSignOut={handleSignOut} onLogoClick={handleLogoClick} />
      <main className="Home-main">
        <h2>Welcome to ChemoCompanion</h2>
        <p>Explore features, manage your health, and stay connected with your care team.</p>
      </main>
      <Footer />
    </div>
  );
}

export default Home;
