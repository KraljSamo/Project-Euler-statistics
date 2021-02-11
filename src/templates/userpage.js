import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import "./userpage.module.css"

export default function UserPage({ data }) {

  function getProblem(number){
    return data.allProblemsJson.edges.filter(({ node }) => node.problem_number === number)[0].node
  }

  return (
    <Layout>
      <h1>User profile: {data.usersJson.username}</h1>
      <p>Nek tekst</p>
      <div>First places: {data.usersJson.standings.filter(item => item.place === 1).length}</div>
      <div>Second places: {data.usersJson.standings.filter(item => item.place === 2).length}</div>
      <div>Third places: {data.usersJson.standings.filter(item => item.place === 3).length}</div>
      <div>Top 10 finishes: {data.usersJson.standings.filter(item => item.place <= 10).length}</div>
      <div>Top 50 finishes: {data.usersJson.standings.filter(item => item.place <= 50).length}</div>
      <div>In the fastest solvers table: {data.usersJson.standings.filter(item => item.place <= 100).length}</div>

      <table>
        <tr>
          <th style={{ width:"10%"}}>Number</th>
          <th style={{ width:"70%"}}>Name</th>
          <th style={{ width:"10%"}}>Difficulty</th>
          <th style={{ width:"10%"}}>Place</th>
        </tr>
        {data.usersJson.standings.sort((a, b) => a.place - b.place).map(item => {
          const problem = getProblem(item.problem)
          return (
            <tr>
              <td><center>{problem.problem_number}</center></td>
              <td><a href={`https://projecteuler.net/problem=${problem.problem_number}`}>{problem.problem_name}</a></td>
              <td><center>{problem.difficulty}%</center></td>
              <td><center>{item.place}</center></td>
            </tr>
          )
        })}
      </table>
    
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    usersJson(fields: { slug: { eq: $slug } }) {
      username
      standings {
        place
        problem
      }
    }
    allProblemsJson{
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
