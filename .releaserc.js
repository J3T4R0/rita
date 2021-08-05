module.exports = {
    branches: ['main', {name: 'next', channel: 'next'}],
    "plugins": [
        "@semantic-release/commit-analyzer",
        "@semantic-release/release-notes-generator",
        "@semantic-release/npm",
        ["@semantic-release/github", {
            "assets": ["dist_zip/dist.zip", "dist_zip/schema.zip"]
        }],
        ["@semantic-release/git", {
            "assets": ["package.json"],
            "message": "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}"
        }],
    ],
    "preset": "angular"
}
