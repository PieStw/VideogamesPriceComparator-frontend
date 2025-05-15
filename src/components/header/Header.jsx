import React, { useState, useEffect } from "react";
import styles from "../../assets/css/header.module.css";
import logo from "../../assets/img/logo.png";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useGamesContext } from "../../context/GamesContext";

export default function Header() {
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("");
  const [game, setGame] = useState("");

  const { setFilters, getGames } = useGamesContext();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      setFilters({
        search: "",
        platform: "",
        genre: "",
      });
    }
  }, [location.pathname]);

  const platforms = [
    { name: "PC", value: 4, icon: "fa-desktop" },
    { name: "Playstation", value: 18, icon: "fa-brands fa-playstation" },
    { name: "Xbox", value: 1, icon: "fa-brands fa-xbox" },
    { name: "Nintendo", value: 7, icon: "fa-gamepad" },
  ];

  const handleCloseSearchBar = (e) => {
    e.stopPropagation();
    setIsSearchBarOpen(false);
  };

  function goToSearchPage() {
    if (location.pathname !== "/search") {
      navigate("/search");
    }
  }

  function applyFilters({ search = "", platform = "", genre = "" }) {
    setFilters({ search, platform, genre });
    goToSearchPage();
    getGames(1, { search, platform, genre });
  }

  function handleSearchButton(e) {
    e.preventDefault();
    const selectedPlatform = platforms.find(
      (p) => p.name === e.currentTarget.value
    );
    if (selectedPlatform) {
      applyFilters({ platform: selectedPlatform.value });
    }
  }

  function searchGame(e) {
    e.preventDefault();
    applyFilters({ search: game });
  }

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
              {!isSearchBarOpen &&
                platforms.map((platform) => (
                  <button
                    key={platform.name}
                    className={styles.searchBarItem}
                    onClick={handleSearchButton}
                    value={platform.name}
                  >
                    <i className={`fa-solid ${platform.icon} me-1`}></i>
                    <p>{platform.name}</p>
                  </button>
                ))}

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
          {platforms.map((platform) => (
            <li key={platform.name} className={styles.searchBarItemHidden}>
              <i className={`fa-solid ${platform.icon} me-1`}></i>
              <p>{platform.name}</p>
            </li>
          ))}
        </div>
      </header>
    </>
  );
}
