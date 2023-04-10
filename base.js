const { defineConfig } = require('cypress')
const {
    addCucumberPreprocessorPlugin,
} = require('@badeball/cypress-cucumber-preprocessor')
const browserify = require('@badeball/cypress-cucumber-preprocessor/browserify')

module.exports = defineConfig({
    viewportWidth: 1920,
    viewportHeight: 1080,
    fixturesFolder: 'cypress/fixtures',
    video: false,
    videoUploadOnPasses: false,
    e2e: {
        specPattern: ['**/*.{feature,features}'],
        supportFile: 'cypress/support/index.js',
        env: {
            TAGS: 'not @HiddenFeature',
        },
        async setupNodeEvents(on, config) {
            await addCucumberPreprocessorPlugin(on, config)
            on('file:preprocessor', browserify.default(config))

            const regexp = /(dev|uat|).js/g
            const matchResult = [...config.configFile.matchAll(regexp)]
            const env = matchResult[0][1].toUpperCase()
            config.env.users.baseUser.password =
                config.env[`BASE_USER_PASSWORD_${env}`]

            return config
        },
    },
    scrollBehavior: false,
    defaultCommandTimeout: 10000,
    taskTimeout: 65000,
    pageLoadTimeout: 120000,
    chromeWebSecurity: false,
    requestTimeout: 10000,
})
