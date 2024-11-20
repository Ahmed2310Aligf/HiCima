




// src/components/Navbar.jsx
import React, { useContext } from 'react';
import { Navbar, Nav, Container, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaHeart } from 'react-icons/fa'; // Import heart icon
import { langContext } from '../../context/lang';

const Navigation = () => {
  const favoriteCount = useSelector((state) => state.favorites.movies.length); // Get favorite movies count from Redux store
  const { lang, setLang } = useContext(langContext);
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">MovieApp</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/movies">Movies</Nav.Link> {/* New Movies link */}
            <Nav.Link as={Link} to="/favorites">
              Favorites 
              <FaHeart color="red" className="ms-2" /> {/* Heart icon */}
              <Badge bg="secondary" className="ms-1">{favoriteCount}</Badge> {/* Counter */}
            </Nav.Link>
            <button 
            onClick={() => setLang(lang === "En" ? "ar" : "En")} 
            className="lang-toggle-btn"
          > 
            {lang === "En" ? "Arabic" : "English"}
          </button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;

// import React, { useContext } from 'react';
// import { Link } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { FaHeart } from 'react-icons/fa';
// import  LanguageContext from '../../store/slice/Language.js';

// const Navbar = () => {
//   const favoritesCount = useSelector((state) => state.favorites.movies.length); s
//   const { language, toggleLanguage } = useContext(LanguageContext); 

//   return (
//     <nav className="navbar navbar-expand-lg navbar-light bg-light">
//       <Link className="navbar-brand" to="/">
//         Movie App
//       </Link>
//       <div className="collapse navbar-collapse">
//         <ul className="navbar-nav ml-auto">
//           <li className="nav-item">
//             <Link className="nav-link" to="/movies">
//               {language === 'en' ? 'Movies' : 'أفلام'}
//             </Link>
//           </li>
//           <li className="nav-item">
//             <Link className="nav-link" to="/favorites">
//               <FaHeart /> {favoritesCount}
//             </Link>
//           </li>
//           <li className="nav-item">
//             <Link className="nav-link" to="/search">
//               {language === 'en' ? 'Search' : 'بحث'}
//             </Link>
//           </li>
//           {/* Language Toggle Icons */}
//           <li className="nav-item">
//             <button
//               className="btn btn-link nav-link"
//               onClick={() => toggleLanguage('ar')}
//             >
//               <img src="/sd.png" alt="Arabic" style={{ width: '30px' }} />
//             </button>
//           </li>
//           <li className="nav-item">
//             <button
//               className="btn btn-link nav-link"
//               onClick={() => toggleLanguage('en')}
//             >
//               <img src="/usa.png" alt="English" style={{ width: '30px' }} />
//             </button>
//           </li>
//         </ul>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;






