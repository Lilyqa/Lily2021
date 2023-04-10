import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'

Given(`I reload the browser tab`, () => {
    cy.reload()
})
