module.exports = {
    branches: ['main', {name: 'beta', channel: 'beta', prerelease: true}],
    "plugins": [
        "@semantic-release/commit-analyzer",
        "@semantic-release/release-notes-generator",
        [
            "@semantic-release/changelog",
            {
                "changelogFile": "docs/CHANGELOG.md"
            }
        ],
        ["@semantic-release/exec", {
            "prepareCmd": "npm run doc"
        }],
        "@semantic-release/npm",
        ["@semantic-release/github", {
            "assets": ["dist_zip/dist.zip", "dist_zip/schema.zip"]
        }],
        ["@semantic-release/git", {
            "assets": ["package.json", "docs/*", "docs/**/*"],
            "message": "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}"
        }],
    ],
    "preset": "angular"
}
