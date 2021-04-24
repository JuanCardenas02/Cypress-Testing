/// <reference types="cypress" />

var RandomPriceNumber = Math.floor(Math.random() * 400) + 1

describe ('Dev Creating Item', () => {

    before('Logging in', () => {

        cy.visit('https://dev.vendoo.co/login')

        cy.get('input[name="email"]').clear().type('fake@gmail.com')
        cy.get('input[name="password"]').clear().type('ValidPassword123')

        cy.get('button[type="submit"]').click()

        cy.url({timeout : 40000}).should('eq', 'https://dev.vendoo.co/app')

    })

    beforeEach('Setting Viewport Mac', () => {
        cy.viewport("macbook-13")
    })


    it('Confirming all "Create New Item" buttons have correct URL.', () => {

        cy.contains('New Item', { timeout: 15000 }).click().url({timeout: 15000}).should('contain', '/app/item/new')
        cy.go('back')
        cy.contains('Create New Item', { timeout: 15000 }).click().url().should('contain', '/app/item/new')
        cy.go('back')
        cy.get('a[href="/app/item/new"]').first().click().url().should('contain', '/app/item/new')
        
    })

    it('Typing in Title', () => {
        cy.get('input[name="generalDetails.title"]').type('Generating Random Title to this item')
    })

    it('Typing in Description', () => {
        cy.get('textarea[name="generalDetails.description"]').type('Typing in new description for this item Cypress Testing Newest')
    })

    it('Typing in Random Price', () => {
        cy.get('input[name="generalDetails.price"]').type(RandomPriceNumber)
    })

    it('Uploading Images', () => {
        //Uploading image using file attach
        cy.get('input[id="imageInput"]').attachFile('VansTesting1.png')

        //Uploading image using drag and drop
        cy.contains('Upload Image(s)').attachFile('VansTesting2.png', {subjectType: 'drag-n-drop'})

        //Uploading multiple images at once
        cy.get('input[id="imageInput"]').attachFile(['VansTesting3.png', 'VansTesting4.png', 'VansTesting5.png', 'VansTesting6.png', 'VansTesting7.png', 'VansTesting8.png', 'VansTesting9.png', 'VansTesting10.png', 'VansTesting11.png', 'VansTesting12.png', 'VansTesting13.png', 'VansTesting14.png', 'VansTesting15.png', 'ImageCyTesting16.jpg'])
    })

    it('Saving info', () => {
        cy.get('button[role="save"]', {timeout: 40000}).click()
    })

    it('Confirming edit URL', () => {
        //New URL should contain item ID number
        cy.contains('Vendoo Item ID', {timeout: 15000}).siblings().invoke('text').then((itemIdNum) => {
        cy.url({timeout: 30000}).should('contain', itemIdNum)
        })

    })

    it('Confirming you cannot upload more than 16 images', () => {
        //Show error message after trying to upload a new image.
        cy.contains('Max 16 images are allowed').should('not.exist')
        cy.get('input[id="imageInput"]').attachFile('VansTesting1.png')
        cy.contains('Max 16 images are allowed').should('exist')
    })

    it('Confirming information typed in', () => {
        //Confirming title
        cy.get('input[name="generalDetails.title"]').should('have.attr', 'value').and('eq', 'Generating Random Title to this item')

        //Confirming description
        cy.get('textarea[name="generalDetails.description"]').should('have.text', 'Typing in new description for this item Cypress Testing Newest')

        //Confirming price
        cy.get('input[name="generalDetails.price"]').should('have.attr', 'value').and('eq', RandomPriceNumber.toString())
    })

    it('Logging Out', () => {
        cy.visit('https://dev.vendoo.co/app')
        cy.get('a[href="/app/#"]', {timeout: 15000}).click({force: true})
    })



})


