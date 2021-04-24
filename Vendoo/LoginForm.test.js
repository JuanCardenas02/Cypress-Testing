/// <reference types="cypress" />

describe ('Dev Login Form', () => {

    beforeEach(() => {

        cy.viewport("macbook-13")
    })

    it('Loading Dev page', () => {

        cy.visit('https://dev.vendoo.co')

    })

    it('Typing in incorrect password', () => {

        cy.contains("The password is invalid or the user does not have a password.").should('not.exist')

        cy.get('input[name="email"]').type('fake@gmail.com')
        cy.get('input[name="password"]').type('WrongPassword')

        cy.get('button[type="submit"]').click()

        cy.contains("The password is invalid or the user does not have a password.", {timeout: 15000}).should('exist')

    })

    it('Typing in REAL password', () => {

        cy.get('input[name="email"]').clear().type('fake@gmail.com')
        cy.get('input[name="password"]').clear().type('ValidPassword123')

        cy.get('button[type="submit"]').click()

        cy.url({timeout : 30000}).should('eq', 'https://dev.vendoo.co/app')

    })

    it('Logging Out', () => {
        cy.get('a[href="/app/#"]', {timeout: 15000}).click({force: true})
    })


})