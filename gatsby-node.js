const path = require(`path`)
const slugify = require("slugify")
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `UsersJson`) {
    const slug = slugify(node.username)
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    query {
      allUsersJson {
        edges {
          node {
            id
          }
        }
      }
    }
  `)

  result.data.allUsersJson.edges.forEach(({ node }) => {
    createPage({
      path: `/users/${node.id}`,
      component: path.resolve(`./src/templates/userpage.js`),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        id: node.id,
      },
    })
  })
}
