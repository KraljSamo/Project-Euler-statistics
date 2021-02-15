import React from "react"
import SideNavbar from "./side-navbar"
import { Row, Col } from "reactstrap"
import styles from "./layout.module.css"
import SEO from "./seo"

export default function Layout(props) {
  return (
    <>
      <SEO />
      <body style={{ backgroundColor: "#1a1918", color: "orange", overflowX: "hidden" }}>
        <Row>
          <Col
            md={2}
            style={{
              minHeight: "100vh",
              borderRight: "solid #383838",
              width: "100%",
            }}
          >
            <SideNavbar />
          </Col>
          <Col className={styles.content} md={10}>
            {props.children}
          </Col>
        </Row>
      </body>
    </>
  )
}
