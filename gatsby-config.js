/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

module.exports = {
  plugins: [
    // {
    //   resolve: "gatsby-plugin-typography",
    //   options: {
    //     pathToConfigModule: "src/utils/typography",
    //   },
    // },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "src",
        path: `${__dirname}/src`,
      },
    },
    "gatsby-transformer-json",
    "gatsby-plugin-react-helmet",
    // {
    //   resolve: "gatsby-plugin-manifest",
    //   options: {
    //     name: "Project Euler statistics",
    //     short_name: "PE statistics",
    //     start_url: "/",
    //     display: "standalone",
    //     icon: "static/favicon.png",
    //   },
    // },
    `gatsby-plugin-offline`,
  ],
  pathPrefix: "/project-euler-statistics",
  siteMetadata: {
    title: "Project Euler Statistics",
    description: "Statistics on Project Euler users and problem difficulties",
    author: "Samo Kralj",
  },
}
