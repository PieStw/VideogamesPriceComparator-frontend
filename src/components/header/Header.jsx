import React, { useState, useEffect } from "react";
import styles from "../../assets/css/header.module.css";
import logo from "../../assets/img/logo.png";
import { NavLink } from "react-router-dom";

export default function Header() {
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("");

  const handleCloseSearchBar = (e) => {
    e.stopPropagation();
    setIsSearchBarOpen(false);
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

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`${styles.header} ${backgroundColor}`}>
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
                <i className="fa-solid fa-desktop me-1"></i> PC
              </li>
              <li className={styles.searchBarItem}>
                <i className="fa-brands fa-playstation me-1"></i> PlayStation
              </li>
              <li className={styles.searchBarItem}>
                <i className="fa-brands fa-xbox me-1"></i> Xbox
              </li>
              <li className={styles.searchBarItem}>
                <i className="fa-brands fa-yahoo me-1"></i> Nintendo
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
              />
            )}
            <i className="fa-solid fa-magnifying-glass"></i>
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
    </header>
  );
}
