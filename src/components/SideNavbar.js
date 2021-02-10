import React from "react"
import NavbarButton from "../components/NavbarButton"
import styles from "./SideNavbar.module.css"

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
      <NavbarButton to="/BestEulerians" name="Best Eulerians" />
      <NavbarButton to="/users" name="User statistics" />
      <NavbarButton to="/ProblemDifficulty" name="Problem difficulty" />
      <NavbarButton to="/HistoricEulerians" name="Historic Eulerians" />
    </div>
  )
}
