const { defineConfig } = require('cypress')
const { mergePartially } = require('merge-partially')
const baseConfig = require('./base')

// eslint-disable-next-line import/no-default-export
module.exports = defineConfig(
    mergePartially.shallow(baseConfig, {
        e2e: {
            baseUrl: 'https://www.test.com',
            env: {
                users: {
                    baseUser: {
                        username: 'Test User (C)',
                        email: 'dev-test-user@retain.com'
                    },
                },
            },
        },
    })
)
