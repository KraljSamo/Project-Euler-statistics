const ghpages = require("gh-pages")

ghpages.publish(
    "public",
    {
        branch: "master",
        repo: "https://github.com/KraljSamo/Project-Euler-statistics.git",

    },
    () => {
        console.log("Deploy Complete!")
    }
)