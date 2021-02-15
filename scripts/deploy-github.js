const ghpages = require("gh-pages")

ghpages.publish(
  "public",
  {
    branch: "master",
    repo: "https://github.com/KraljSamo/project-euler-statistics.git",
  },
  () => {
    console.log("Deploy Complete!")
  }
)
