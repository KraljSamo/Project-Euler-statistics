import React, { useState, useEffect } from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import styles from "./userpage.module.css"
import { Row, Col } from "reactstrap"

export default function UserPage({ data }) {
  const [userRankings, setUserRankings] = useState([])
  const [sortParamter, setSortParameter] = useState("place")
  const [ordering, setOrdering] = useState("ascending")

  function getProblem(number) {
    return data.allProblemsJson.edges.filter(({ node }) => node.problem_number === number)[0].node
  }

  useEffect(() => {
    let rankingsWithProblemData = data.usersJson.rankings
      .map(item => {
        let problem = getProblem(item.problem)
        item.difficulty = problem.difficulty
        item.problem_name = problem.problem_name
        return item
      })
      .sort((a, b) => a[sortParamter] - b[sortParamter])
    if (ordering === "descending") {
      rankingsWithProblemData = rankingsWithProblemData.reverse()
    }
    setUserRankings(rankingsWithProblemData)
  }, [data.usersJson.rankings, sortParamter, ordering])

  return (
    <Layout>
      <h1>User: {data.usersJson.username}</h1>
      <div className="alert" style={{ backgroundColor: "#f7d281", border: "1px solid #523203" }}>
        <Row className={styles.summary}>
          <Col>
            <strong>1st places:</strong> {data.usersJson.rankings.filter(item => item.place === 1).length}
          </Col>
          <Col>
            <strong>2nd places:</strong> {data.usersJson.rankings.filter(item => item.place === 2).length}
          </Col>
          <Col>
            <strong>3rd places:</strong> {data.usersJson.rankings.filter(item => item.place === 3).length}
          </Col>
        </Row>
        <Row className={styles.summary}>
          <Col>
            <strong>Top 10 finishes:</strong> {data.usersJson.rankings.filter(item => item.place <= 10).length}
          </Col>
          <Col>
            <strong>Top 50 finishes:</strong> {data.usersJson.rankings.filter(item => item.place <= 50).length}
          </Col>
          <Col>
            <strong>In the fastests solvers table:</strong> {data.usersJson.rankings.length}
          </Col>
        </Row>
      </div>
      <Row className="ml-2 mt-3 mb-3">
        Sort by:
        <select style={{ margin: "0px 10px" }} onChange={e => setSortParameter(e.target.value)} value={sortParamter}>
          <option value="place">Place</option>
          <option value="problem">Problem number</option>
          <option value="difficulty">Difficulty</option>
        </select>
        Ordering:
        <select style={{ margin: "0px 10px" }} onChange={e => setOrdering(e.target.value)} value={ordering}>
          <option value="ascending">Ascending</option>
          <option value="descending">Descending</option>
        </select>
      </Row>
      <table>
        <thead>
          <tr>
            <th style={{ width: "10%" }}>Number</th>
            <th style={{ width: "70%" }}>Name</th>
            <th style={{ width: "10%" }}>Difficulty</th>
            <th style={{ width: "10%" }}>Place</th>
          </tr>
        </thead>
        <tbody>
          {userRankings.map((item, index) => {
            return (
              <tr key={index}>
                <td>
                  <center>{item.problem}</center>
                </td>
                <td>
                  <a href={`https://projecteuler.net/problem=${item.problem}`}>{item.problem_name}</a>
                </td>
                <td>
                  <center>{item.difficulty}%</center>
                </td>
                <td>
                  <center>{item.place}</center>
                </td>
              </tr>
            )
          })}
        </tbody>
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
