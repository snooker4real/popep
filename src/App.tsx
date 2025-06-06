import { Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Strengths from './pages/Strengths';
import Concept from './pages/Concept';
import Legal from './pages/Legal';
import CGV from './pages/CGV';
import MobileLanguageSwitcher from './components/MobileLanguageSwitcher';
import CoupleGame from './pages/products/CoupleGame';
import DistanceGame from './pages/products/DistanceGame';
import PostpartumGame from './pages/products/PostpartumGame';
import FriendsGame from './pages/products/FriendsGame';

function App() {
  return (
    <>
      <Helmet>
        <html lang="fr" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="POPEP" />
        <meta name="googlebot" content="index, follow" />
        <meta name="revisit-after" content="7 days" />
        <meta name="rating" content="general" />
        <meta name="format-detection" content="telephone=yes" />
        <meta name="theme-color" content="#D46559" />
        <link rel="alternate" hrefLang="fr" href="https://popep.fr" />
        <link rel="alternate" hrefLang="en" href="https://popep.fr/en" />
        <link rel="alternate" hrefLang="es" href="https://popep.fr/es" />
        <link rel="alternate" hrefLang="sw" href="https://popep.fr/sw" />
        <link rel="alternate" hrefLang="x-default" href="https://popep.fr" />
      </Helmet>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/strengths" element={<Strengths />} />
        <Route path="/concept" element={<Concept />} />
        <Route path="/legal" element={<Legal />} />
        <Route path="/cgv" element={<CGV />} />
        <Route path="/products/couple" element={<CoupleGame />} />
        <Route path="/products/distance" element={<DistanceGame />} />
        <Route path="/products/postpartum" element={<PostpartumGame />} />
        <Route path="/products/friends" element={<FriendsGame />} />
      </Routes>
      <Footer />
      <MobileLanguageSwitcher />
    </>
  );
}

export default App;