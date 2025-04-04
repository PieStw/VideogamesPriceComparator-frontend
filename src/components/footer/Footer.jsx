import styles from "../../assets/css/footer.module.css";

export default function Footer() {
  return (
    <footer>
      <div className={styles.mailList}>
        <div className={styles.container}>
          <h2>Join our newsletter and don't miss any promotions!</h2>
          <h6>
            And be the first to receive our private offers, newsletters, and
            deals of the week
          </h6>
          <form className="row mt-3">
            <input
              className={`${styles.inputName} col-12 mt-3`}
              type="text"
              placeholder="Enter your name"
              required
            />

            <input
              className={`${styles.inputLastName} col-12 mt-3 `}
              type="text"
              placeholder="Enter your last name"
              required
            />

            <input
              className={`${styles.inputEmail} col-12 mt-3`}
              type="email"
              placeholder="Enter your email"
              required
            />
            <button className={`${styles.button} mt-3`} type="submit">
              Subscribe
            </button>
          </form>
        </div>
      </div>
      <div className={styles.endPage}>
        <ul className={styles.socialMedia}>
          <li>About Us</li>
          <li>Contact Us</li>
          <li>Privacy Policy</li>
          <li>Terms of Service</li>
          <li>FAQ</li>
        </ul>
        <p>© 2025 Your Company Name. All rights reserved.</p>
      </div>
    </footer>
  );
}
