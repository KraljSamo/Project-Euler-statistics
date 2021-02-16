import React from "react"
import Layout from "../components/layout"
import CommonStyles from "../styles/common.module.css"
import { Link } from "gatsby"

export default function Home() {
  return (
    <Layout>
      <div style={{ maxWidth: "1080px", margin: "0 auto" }}>
        <h1 className={CommonStyles.sectionTitle}>Project Euler statistics</h1>
        <div>
          <span className={CommonStyles.sectionSubtitle}>What is this page?</span>
          <p>
            Have you ever wondered who is the best solver on Project Euler website of all time? Who has the most 1st
            places? What is your best ranking? How many times did you make it into the fastest solvers table? Which is
            the harders problem ever released? <br />
            Well, this page is here for exactly that reason, to give you additional insight into various different
            metrics and statistics regarding Project Euler problems and users.
          </p>
        </div>
        <div>
          <span className={CommonStyles.sectionSubtitle}>Who is it for?</span>
          <p>
            This page is intented for everybody that is interested in data, statistics and analysis and wants to know
            more about Project Euler problems and its users.
          </p>
        </div>
        <div>
          <span className={CommonStyles.sectionSubtitle}>Where did you get the data?</span>
          <p>
            Data is collected directly from the Project Euler website and is updated once every week. It is then
            rendered into a fast static webpage using GatsbyJS.
          </p>
        </div>
        <div>
          <span className={CommonStyles.sectionSubtitle}>I can't find myself in the tables, can I get in?</span>
          <p>
            Of course. If you are interested to be featured in the statistics then I invite you to join the amazing
            community at Project Euler and start an extremely rewarding journey through mathematical and programming
            problems ranging from easy and up to insane difficulty where you will get familiar with various subjects of
            mathematics, well known and little less known theorems and interesting properties as well as learning many
            algorithms and data structures. If you are up for it, click on the link below!
            <p style={{ margin: "2rem 0" }}>
              <Link to="https://projecteuler.net/about">
                <span style={{ fontSize: "2rem" }}>&gt;&gt;&gt; Project Euler website </span>
              </Link>
            </p>
          </p>
        </div>
        <div>
          <span className={CommonStyles.sectionSubtitle}>
            I have an idea for interesting table/chart/statistics/etc.
          </span>
          <p>
            I'd like to hear it. Please navigate to the feedback section of the website and you can submit your comment
            or suggestions there.
          </p>
        </div>
        <div>
          <span className={CommonStyles.sectionSubtitle}>The page does not look nice on mobile</span>
          <p>
            Sadly I lack the website frontend design skills, however I am trying to improve. Currently the page is
            focused on Desktop browsers but in the future the page will be styled for mobile users also.
          </p>
        </div>
        <div className={CommonStyles.notification}>The page was last updated on 15/02/2021.</div>
      </div>
    </Layout>
  )
}
