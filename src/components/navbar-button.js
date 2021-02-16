import React from "react"
import { Link } from "gatsby"
import styles from "./navbar-button.module.css"

export default function NavbarButton(props) {
  const className = styles.navbarButton
  return (
    <div className={className}>
      <Link to={props.to}>
        <span style={{ marginLeft: "1.5vw", fontSize: "1vw" }}>
          {props.name}
          {props.development ? (
            <>
              {" "}
              - soon <sup>TM</sup>
            </>
          ) : (
            ""
          )}
        </span>
      </Link>
    </div>
  )
}
