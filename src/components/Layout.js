import React from "react"
import SideNavbar from "../components/SideNavbar"
import { Row, Col } from "reactstrap"

export default function Layout(props) {
  return (
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
        <Col
          md={10}
          style={{
            width: "100%",
            backgroundColor: "#383838",
            padding: "3rem 3rem",
          }}
        >
          {props.children}
        </Col>
      </Row>
    </body>
  )
}
