import React, { useState, useEffect } from "react"
import Layout from "../components/Layout"
import { graphql, Link } from "gatsby"
import "./users.module.css"

export default function UserPage({ data }) {
  const [filteredUsers, setFilteredUsers] = useState(data.allUsersJson.edges)
  const [page, setPage] = useState(0)
  const [searchQuery, setSearchQuery] = useState("")
  const allUsers = data.allUsersJson.edges

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

  useEffect(() => {
    setFilteredUsers(
      allUsers
        .filter(({ node }) => node.username.includes(searchQuery))
        .sort((a, b) => a.node.wins - b.node.wins)
        .reverse()
    )
  }, [page, searchQuery, allUsers])

  return (
    <Layout>
      <h1>User statistics</h1>
      <p>
        On this page you can lookup any player that has ever made it to fastest solvers table. A total of{" "}
        <strong>{data.allUsersJson.totalCount}</strong> users have managed to achieve this outstanding achievement.
      </p>
      Search through usernames:
      <input
        type="text"
        placeholder="Type your username here"
        onChange={e => {
          setSearchQuery(e.target.value)
          setPage(0)
        }}
        style={{ backgroundColor: "lightgoldenrodyellow", width: "500px", marginLeft: "10px" }}
      />
      <div style={{ marginTop: "2rem" }}>
        <center>
          <button onClick={() => handlePageChange(-1)}>Previous page</button>
          Current page: {page + 1}
          <button onClick={() => handlePageChange(1)}>Next page</button>
        </center>
      </div>
      <br />
      <table>
        <tr>
          <th style={{ width: "35%" }}>Username</th>
          <th style={{ width: "35%" }}>First places</th>
          <th style={{ width: "30%" }}>In the fastests solvers table</th>
        </tr>
        {filteredUsers.slice(page * 30, (page + 1) * 30).map(({ node }) => {
          return (
            <tr>
              <td>
                <Link to={node.fields.slug}>{node.username}</Link>
              </td>
              <td>{node.wins}</td>
              <td>{node.count}</td>
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
          fields {
            slug
          }
          username
          count
          wins
        }
      }
    }
  }
`
