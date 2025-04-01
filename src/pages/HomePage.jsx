import React from "react";
import red from "../assets/img/red.png";
import styles from "../assets/css/homePage.module.css";

export default function HomePage() {
  return (
    <>
      <img src={red} className={styles.jumbo} />
    </>
  );
}
