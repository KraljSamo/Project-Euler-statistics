import React from "react"
import NavbarButton from "./navbar-button"
import styles from "./side-navbar.module.css"

export default function SideNavbar(props) {
  return (
    <div>
      <span className={styles.mainTitle}> Project Euler</span>
      <br />
      <div className={styles.secondaryTitle}>Statistics</div>
      <br />
      <br />
      <br />
      <NavbarButton to="/" name="Homepage" />
      <NavbarButton to="/users" name="User statistics" />
      <NavbarButton to="/best-eulerians" name="Hall of fame" />
      <NavbarButton to="/problem-difficulty" name="Problem difficulty" />
      <NavbarButton to="/historic-eulerians" name="Historic Eulerians" />
      <NavbarButton to="/feedback" name="Feedback" />
    </div>
  )
}
