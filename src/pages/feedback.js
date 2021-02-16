import React, { useState } from "react"
import Layout from "../components/layout"
import styles from "./feedback.module.css"
import { Row, Col } from "reactstrap"
import Axios from "axios"

export default function Feedback() {
  const [username, setUsername] = useState("")
  const [message, setMessage] = useState("")

  async function handleSubmit(e) {
    e.preventDefault()
    let fullMessage = `${username}:
    ${message}`
    try {
      await Axios.post(
        "https://discord.com/api/webhooks/811308110597193749/u3BYZPWq6hiAwsRQ9txzDmfn2q5oEWrvA77q9BLO0ZjFCiooKo6_rjBs7mZvAh_Wf7gS",
        { content: fullMessage }
      )
      setUsername("")
      setMessage("")
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <Layout>
      <div style={{ maxWidth: "50%", margin: "10% auto" }}>
        <h2>
          <i>Have a suggestion? A comment? Leave it here!</i>
        </h2>{" "}
        <br />
        <form onSubmit={e => handleSubmit(e)}>
          <Row>
            <Col md={2}>
              <label for="username">
                <strong>Username: &nbsp;&nbsp;&nbsp;</strong>
              </label>
            </Col>
            <Col md={10}>
              <input
                type="text"
                id="username"
                className={styles.textInput}
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder={"Can be left empty"}
              />
            </Col>
          </Row>
          <Row>
            <Col md={2}>
              <label for="message">
                <strong>Message: </strong>
              </label>
            </Col>
            <Col md={10}>
              <textarea
                id="message"
                className={styles.textArea}
                value={message}
                onChange={e => setMessage(e.target.value)}
                rows={10}
              />
            </Col>
          </Row>
          <Row>
            <Col className={"d-flex justify-content-end"}>
              <button type="submit" className={styles.button}>
                Send it!
              </button>
            </Col>
          </Row>
        </form>
      </div>
    </Layout>
  )
}
