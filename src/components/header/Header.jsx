import React, { useState, useEffect } from "react";
import styles from "../../assets/css/header.module.css";
import logo from "../../assets/img/logo.png";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useGamesContext } from "../../context/GamesContext";

export default function Header() {
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("");
  const [game, setGame] = useState("");

  const { setSearch } = useGamesContext();
  const navigate = useNavigate();
  const location = useLocation();

  const handleCloseSearchBar = (e) => {
    e.stopPropagation();
    setIsSearchBarOpen(false);
  };

  const searchGame = (e) => {
    e.preventDefault();
    setSearch(game);
    if (location.pathname !== "/search") {
      navigate("/search");
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setBackgroundColor(styles.blackBackground);
      } else {
        setBackgroundColor("");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className={`${styles.header} ${backgroundColor}`}>
        <div className={styles.headerContainer}>
          {/* Logo Section */}
          <div className={styles.logo}>
            <NavLink to="/" className={styles.logoLink}>
              <img src={logo} alt="Logo" className={styles.logoImage} />
              <span className={styles.logoText}>Price Comparator</span>
            </NavLink>
          </div>

          {/* Search Bar Section */}
          <div className={styles.searchBarContainer}>
            <ul
              className={`${styles.searchBarList} ${
                isSearchBarOpen
                  ? `${styles.paddingNone} ${styles.justifyContentEnd}`
                  : ""
              }`}
            >
              {!isSearchBarOpen && (
                <>
                  <li className={styles.searchBarItem}>
                    <i className="fa-solid fa-desktop me-1"></i>
                    <p>PC</p>
                  </li>
                  <li className={styles.searchBarItem}>
                    <i className="fa-brands fa-playstation me-1"></i>
                    <p>Playstation</p>
                  </li>
                  <li className={styles.searchBarItem}>
                    <i className="fa-brands fa-xbox me-1"></i>
                    <p>Xbox</p>
                  </li>
                  <li className={styles.searchBarItem}>
                    <i className="fa-brands fa-yahoo me-1"></i>
                    <p>Nintendo</p>
                  </li>
                </>
              )}

              <li
                onClick={() => setIsSearchBarOpen(true)}
                className={
                  isSearchBarOpen
                    ? styles.searchBarExpanded
                    : styles.searchBarIconContainer
                }
              >
                {isSearchBarOpen && (
                  <input
                    type="text"
                    className={styles.searchInput}
                    placeholder="Cerca un gioco..."
                    onChange={(e) => setGame(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        searchGame(e);
                      }
                    }}
                  />
                )}

                {!isSearchBarOpen ? (
                  <i className="fa-solid fa-magnifying-glass"></i>
                ) : (
                  <i
                    className="fa-solid fa-arrow-right"
                    onClick={searchGame}
                    style={{ cursor: "pointer" }}
                  ></i>
                )}

                {isSearchBarOpen && (
                  <div
                    className={styles.searchBarCloseButton}
                    onClick={handleCloseSearchBar}
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </div>
                )}
              </li>
            </ul>
          </div>

          {/* User Actions Section */}
          <div className={styles.userActions}></div>
        </div>

        {/* Hidden Menu (for mobile or responsiveness) */}
        <div className={styles.hiddenMenu}>
          <li className={styles.searchBarItemHidden}>
            <i className="fa-solid fa-desktop me-1"></i>
            <p>PC</p>
          </li>
          <li className={styles.searchBarItemHidden}>
            <i className="fa-brands fa-playstation me-1"></i>
            <p>Playstation</p>
          </li>
          <li className={styles.searchBarItemHidden}>
            <i className="fa-brands fa-xbox me-1"></i>
            <p>Xbox</p>
          </li>
          <li className={styles.searchBarItemHidden}>
            <i className="fa-brands fa-yahoo me-1"></i>
            <p>Nintendo</p>
          </li>
        </div>
      </header>
    </>
  );
}
