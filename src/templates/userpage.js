import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import styles from "./userpage.module.css"
import { Row, Col } from "reactstrap"

export default function UserPage({ data }) {
  function getProblem(number) {
    return data.allProblemsJson.edges.filter(({ node }) => node.problem_number === number)[0].node
  }

  return (
    <Layout>
      <h1>User: {data.usersJson.username}</h1>
      <div className="alert" style={{ backgroundColor: "#f7d281", border: "1px solid #523203" }}>
        <Row className={styles.summary}>
          <Col>1st places: {data.usersJson.standings.filter(item => item.place === 1).length}</Col>
          <Col>2nd places: {data.usersJson.standings.filter(item => item.place === 2).length}</Col>
          <Col>3rd places: {data.usersJson.standings.filter(item => item.place === 3).length}</Col>
        </Row>
        <Row className={styles.summary}>
          <Col>Top 10 finishes: {data.usersJson.standings.filter(item => item.place <= 10).length}</Col>
          <Col>Top 50 finishes: {data.usersJson.standings.filter(item => item.place <= 50).length}</Col>
          <Col>In the fastests solvers table: {data.usersJson.standings.length}</Col>
        </Row>
      </div>

      <table>
        <tr>
          <th style={{ width: "10%" }}>Number</th>
          <th style={{ width: "70%" }}>Name</th>
          <th style={{ width: "10%" }}>Difficulty</th>
          <th style={{ width: "10%" }}>Place</th>
        </tr>
        {data.usersJson.standings
          .sort((a, b) => a.place - b.place)
          .map(item => {
            const problem = getProblem(item.problem)
            return (
              <tr>
                <td>
                  <center>{problem.problem_number}</center>
                </td>
                <td>
                  <a href={`https://projecteuler.net/problem=${problem.problem_number}`}>{problem.problem_name}</a>
                </td>
                <td>
                  <center>{problem.difficulty}%</center>
                </td>
                <td>
                  <center>{item.place}</center>
                </td>
              </tr>
            )
          })}
      </table>
    </Layout>
  )
}

export const query = graphql`
  query($id: String!) {
    usersJson(id: { eq: $id }) {
      username
      rankings {
        place
        problem
      }
    }
    allProblemsJson {
      edges {
        node {
          problem_number
          problem_name
          difficulty
        }
      }
    }
  }
`
