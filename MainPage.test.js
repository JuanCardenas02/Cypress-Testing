/// <reference types="cypress" />

describe ('Main Page Testing', () => {


    it('Correct page title', () => {

        //Visiting main page
        cy.visit('https://www.vendoo.co/')
        cy.get('h1').should('have.text', 'Crossposting Made Easy!')

    })

    it('All register buttons have correcr url', () => {

        //Confirming all "Get Started" buttons have the correct url.
        cy.get('a[href="https://web.vendoo.co/register"]').should('have.attr', 'href').and('eq', 'https://web.vendoo.co/register')

    })

    it('Main header buttons', () => {

        //Confirming all header buttons have correct URL.
        cy.get('a[href="/marketplaces"]').should('have.attr', 'href')
        .and('eq', '/marketplaces')

        cy.get('a[href="/pricing"]').should('have.attr', 'href')
        .and('eq', '/pricing')

        cy.get('a[href="https://blog.vendoo.co/"]').should('have.attr', 'href')
        .and('eq', 'https://blog.vendoo.co/')

        cy.get('a[href="/faqs"]').should('have.attr', 'href')
        .and('eq', '/faqs')

        cy.get('a[href="https://web.vendoo.co/login"]').should('have.attr', 'href')
        .and('eq', 'https://web.vendoo.co/login')

    })


})