import React from "react"
import { Link } from "gatsby"
import styles from "./NavbarButton.module.css"

export default function NavbarButton(props) {
  return (
    <div className={styles.navbarButton}>
      <Link to={props.to}>
        <span style={{ marginLeft: "1.5rem" }}>{props.name}</span>
      </Link>
    </div>
  )
}
