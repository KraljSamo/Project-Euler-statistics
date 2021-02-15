import React from "react"
import Layout from "../components/layout"

export default function Feedback() {
  async function handleSubmit(e) {
    e.preventDefault()
  }

  return (
    <Layout>
      <h2>
        <i>Have a suggestion? A comment? Leave it here</i>
      </h2>
      <form onSubmit={e => handleSubmit(e)}>
        <input type="text" />
        <input type="textarea" />
      </form>
    </Layout>
  )
}
