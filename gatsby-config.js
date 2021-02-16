/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

module.exports = {
  siteMetadata: {
    title: "Project Euler Statistics",
    description: "Statistics on Project Euler users and problem difficulties",
    author: "Samo Kralj",
  },
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
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "Project Euler statistics",
        short_name: "PE statistics",
        start_url: "/",
        display: "standalone",
        icon: "static/euler.jpg",
      },
    },
    `gatsby-plugin-offline`,
    "gatsby-plugin-react-helmet",
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: ["G-TKXNR9WNHP"],
        gtagConfig: {
          anonymize_ip: true,
        },
        pluginConfig: {
          head: false,
        },
      },
    },
  ],
  pathPrefix: "/project-euler-statistics",
}
