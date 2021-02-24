import React, { useState, useEffect } from "react"
import Layout from "../components/layout"
import { graphql, Link } from "gatsby"
import styles from "./users.module.css"
import { Row, Col } from "reactstrap"

export default function UserPage({ data }) {
  const [filteredUsers, setFilteredUsers] = useState(data.allUsersJson.edges)
  const [page, setPage] = useState(0)
  const [searchQuery, setSearchQuery] = useState("")
  const allUsers = data.allUsersJson.edges
  const [selectedDifficulties, setSelectedDifficulties] = useState([5, 30, 55, 80])
  const [sortBy, setSortBy] = useState("wins")

  function handlePageChange(change) {
    let newPage = page + change
    if (newPage < 0) {
      newPage = 0
    }
    if (newPage * 30 > data.allUsersJson.totalCount) {
      newPage = newPage - 1
    }
    setPage(newPage)
  }

  function handleDifficultySelect(value) {
    if (selectedDifficulties.includes(value)) {
      setSelectedDifficulties(selectedDifficulties.filter(item => item !== value))
    } else {
      let newDifficulties = selectedDifficulties.slice()
      newDifficulties.push(value)
      setSelectedDifficulties(newDifficulties)
    }
  }

  useEffect(() => {
    let filteredQuery = allUsers
    filteredQuery = filteredQuery.map(({ node }) => {
      let wins = node.stats
        .filter(item => selectedDifficulties.includes(item.difficultyClass))
        .map(item => item.wins)
        .reduce((a, b) => a + b, 0)
      node.wins = wins

      let count = node.stats
        .filter(item => selectedDifficulties.includes(item.difficultyClass))
        .map(item => item.count)
        .reduce((a, b) => a + b, 0)
      node.count = count

      let eulerianPoints = node.stats
        .filter(item => selectedDifficulties.includes(item.difficultyClass))
        .map(item => item.eulerianPoints)
        .reduce((a, b) => a + b, 0)
      node.eulerianPoints = eulerianPoints
      return { node }
    })
    if (["wins", "count", "eulerianPoints"].includes(sortBy)) {
      filteredQuery = filteredQuery.sort((a, b) => a.node[sortBy] - b.node[sortBy]).reverse()
    }
    filteredQuery = filteredQuery.map(({ node }, index) => {
      node.place = index + 1
      return { node }
    })
    filteredQuery = filteredQuery.filter(({ node }) => node.username.includes(searchQuery))
    setFilteredUsers(filteredQuery)
  }, [page, searchQuery, allUsers, sortBy, selectedDifficulties])

  return (
    <Layout>
      <h1>User statistics</h1>
      <p>
        On this page you can lookup any player that has ever made it to fastest solvers table. A total of{" "}
        <strong>{data.allUsersJson.totalCount}</strong> users have managed to achieve this outstanding achievement.
      </p>
      <Row className={styles.filterRow}>
        <Col>
          Search:
          <input
            type="text"
            placeholder="Type your username"
            onChange={e => {
              setSearchQuery(e.target.value)
              setPage(0)
            }}
            style={{ backgroundColor: "lightgoldenrodyellow", marginLeft: "10px" }}
          />
          &nbsp; Filter by problem difficulty:
          <div style={{ margin: "0 10px", display: "inline-block" }}>
            <button
              className={
                selectedDifficulties.includes(5) ? styles.filterButtonActive + " " + styles.easy : styles.filterButton
              }
              onClick={() => handleDifficultySelect(5)}
            >
              5%-25%
            </button>
            <button
              className={
                selectedDifficulties.includes(30)
                  ? styles.filterButtonActive + " " + styles.medium
                  : styles.filterButton
              }
              onClick={() => handleDifficultySelect(30)}
            >
              30%-50%
            </button>
            <button
              className={
                selectedDifficulties.includes(55) ? styles.filterButtonActive + " " + styles.hard : styles.filterButton
              }
              onClick={() => handleDifficultySelect(55)}
            >
              55%-75%
            </button>
            <button
              className={
                selectedDifficulties.includes(80)
                  ? styles.filterButtonActive + " " + styles.insane
                  : styles.filterButton
              }
              onClick={() => handleDifficultySelect(80)}
            >
              80%-100%
            </button>
          </div>
          Sort by:
          <select
            style={{ margin: "0 10px" }}
            className={styles.filterSelect}
            onChange={e => setSortBy(e.target.value)}
          >
            <option value="" selected={sortBy === ""}>
              default
            </option>
            <option value="wins" selected={sortBy === "wins"}>
              #First places
            </option>
            <option value="count" selected={sortBy === "count"}>
              #In the fastests solvers table
            </option>
            <option value="eulerianPoints" selected={sortBy === "eulerianPoints"}>
              Total Eulerian points
            </option>
          </select>
        </Col>
      </Row>
      <div style={{ marginTop: "1rem" }}>
        <center>
          <button className={styles.button} onClick={() => handlePageChange(-1)}>
            Previous page
          </button>
          Current page: {page + 1}/{(filteredUsers.length / 30 + 1).toFixed()}
          <button className={styles.button} onClick={() => handlePageChange(1)}>
            Next page
          </button>
        </center>
      </div>
      <br />
      <table>
        <tr>
          <th style={{ width: "5%" }}> </th>
          <th style={{ width: "45%" }}>Username</th>
          <th style={{ width: "16%" }}>First places</th>
          <th style={{ width: "16%" }}>In the fastests solvers table </th>
          <th style={{ width: "16%" }}>Total Eulerian points </th>
        </tr>
        {filteredUsers.slice(page * 30, (page + 1) * 30).map(({ node }, index) => {
          return (
            <tr>
              <td>
                <center>
                  <strong>{node.place}.</strong>
                </center>
              </td>
              <td>
                <Link to={node.id}>{node.username}</Link>
              </td>
              <td>{node.wins}</td>
              <td>{node.count}</td>
              <td>{node.eulerianPoints}</td>
            </tr>
          )
        })}
      </table>
    </Layout>
  )
}

export const query = graphql`
  query {
    allUsersJson(sort: { fields: [username], order: ASC }) {
      totalCount
      edges {
        node {
          username
          id
          stats {
            difficultyClass
            count
            wins
            eulerianPoints
          }
        }
      }
    }
  }
`
