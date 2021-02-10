import React, { useState, useEffect } from "react"
import Layout from "../components/Layout"
import { graphql, Link } from "gatsby"

export default function UserPage({ data }) {
  const [filteredUsers, setFilteredUsers] = useState(data.allUsersJson.edges.slice(0, 30))
  const [page, setPage] = useState(0)
  const [searchQuery, setSearchQuery] = useState("")

  function filterUsers() {
    setFilteredUsers(
      data.allUsersJson.edges
        .filter(({ node }) => node.username.includes(searchQuery))
        .slice(30 * page, 30 * (page + 1))
    )
  }

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
    filterUsers()
  }, [page, searchQuery])

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
      <button onClick={() => handlePageChange(-1)}>Previous page</button>
      <button onClick={() => handlePageChange(1)}>Next page</button>
      <div>Click on the user too see his achievements</div>
      {filteredUsers.map(({ node }) => (
        <div>
          <Link to={node.fields.slug}>{node.username}</Link>
        </div>
      ))}
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
        }
      }
    }
  }
`
