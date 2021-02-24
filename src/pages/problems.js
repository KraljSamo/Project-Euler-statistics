import React, { useState, useEffect } from "react"
import Layout from "../components/layout"
import { graphql, Link } from "gatsby"
import { Row, Col } from "reactstrap"

export default function ProblemsPage({ data }) {
  const [problems, setProblems] = useState([])
  const [sortParameter, setSortParameter] = useState("solvers")
  const [ordering, setOrdering] = useState("ascending")
  const [difficultyFilter, setDifficultyFilter] = useState("")

  useEffect(() => {
    let newProblems = data.allProblemsJson.edges
      .filter(({ node }) => node[sortParameter] !== null)
      .filter(({ node }) => node.problem_number >= 277)
    if (difficultyFilter !== "") {
      newProblems = newProblems.filter(({ node }) => node.difficulty === parseInt(difficultyFilter))
    }
    newProblems = newProblems.sort((a, b) => a.node[sortParameter] - b.node[sortParameter])
    if (ordering === "descending") {
      newProblems = newProblems.reverse()
    }
    setProblems(newProblems)
  }, [data.allProblemsJson.edges, sortParameter, ordering, difficultyFilter])

  return (
    <Layout>
      <h1>Problem statistics</h1>
      <p>
        On this page you can view various problems, its statistics and different aspects of measurement how difficult
        some problem might be.
      </p>
      <Row className="ml-2 mt-3 mb-3">
        Sort by:
        <select style={{ margin: "0px 10px" }} onChange={e => setSortParameter(e.target.value)} value={sortParameter}>
          <option value="problem_number">Problem number</option>
          <option value="solvers">Number of solvers</option>
          <option value="winner_solve_time_in_seconds">1st place solve time</option>
          <option value="top100_solve_time_in_seconds">100th place solve time</option>
        </select>
        Ordering:
        <select style={{ margin: "0px 10px" }} onChange={e => setOrdering(e.target.value)} value={ordering}>
          <option value="ascending">Ascending</option>
          <option value="descending">Descending</option>
        </select>
        Filter by difficulty:
        <select
          style={{ margin: "0px 10px" }}
          onChange={e => setDifficultyFilter(e.target.value)}
          value={difficultyFilter}
        >
          <option value="">All difficulties</option>
          {[...Array(20).keys()]
            .map(item => (item + 1) * 5)
            .map(item => {
              return (
                <option value={item} key={item}>
                  Difficulty {item} %
                </option>
              )
            })}
        </select>
      </Row>
      <table>
        <thead>
          <tr>
            <th style={{ width: "5%" }}> # </th>
            <th style={{ width: "25%" }}>Name</th>
            <th style={{ width: "8%" }}>Difficulty</th>
            <th style={{ width: "8%" }}>Solvers </th>
            <th style={{ width: "27%" }}>1st place solve time</th>
            <th style={{ width: "27%" }}>100th place solve time</th>
          </tr>
        </thead>
        <tbody>
          {problems.map(({ node }, index) => {
            return (
              <tr key={index}>
                <td>
                  <center>
                    <strong>{node.problem_number}</strong>
                  </center>
                </td>
                <td>{node.problem_name}</td>
                <td>{node.difficulty}%</td>
                <td>{node.solvers}</td>
                <td>{node.winner_solve_time_raw}</td>
                <td>{node.top100_solve_time_raw}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </Layout>
  )
}

export const query = graphql`
  query {
    allProblemsJson(sort: { fields: [problem_number], order: DESC }) {
      totalCount
      edges {
        node {
          problem_number
          problem_name
          solvers
          difficulty
          release_date
          winner_solve_time_raw
          winner_solve_time_in_seconds
          top10_solve_time_raw
          top10_solve_time_in_seconds
          top50_solve_time_raw
          top50_solve_time_in_seconds
          top100_solve_time_raw
          top100_solve_time_in_seconds
        }
      }
    }
  }
`
