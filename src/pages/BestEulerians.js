import React from "react"
import Layout from "../components/Layout"
import styles from "../styles/common.module.css"
import { Col, Row } from "reactstrap"

export default function BestEuleriansPage() {
  return (
    <Layout>
      <div className={styles.sectionTitle}> Alltime best eulerians</div>
      <Row>
        <Col md={4}>Most total eulerian points</Col>
        <Col md={4}>Most 1st places</Col>
        <Col md={4}>Most top 10 places</Col>
      </Row>
    </Layout>
  )
}
