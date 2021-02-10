import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"

export default function BlogPost({ data }) {
  return <Layout>Hello, this is me!! {data.usersJson.username}</Layout>
}

export const query = graphql`
  query($slug: String!) {
    usersJson(fields: { slug: { eq: $slug } }) {
      username
    }
  }
`
