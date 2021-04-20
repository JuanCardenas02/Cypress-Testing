/// <reference types="cypress" />

describe ('Dev Vendoo form registering', () => {


    it('Loading Dev page', () => {

        cy.visit('https://dev.vendoo.co/register')

    })

    it('Visitting register page', () => {

        //Visiting Register page
        cy.visit('dev.vendoo.co')
        cy.contains("Register").click()

    })


    it('Getting error messages from all fields', () =>{

    

        // Clicking on the typing fields
        cy.get('input[name="firstName"]').click()
        cy.get('input[name="lastName"]').click()
        cy.get('input[name="email"]').click()
        cy.get('input[name="password"]').click()
        cy.get('input[name="securityTest"]').click()
        cy.get('button[type="submit"]').click()

        //Getting error messages
        cy.contains('First Name is required').should('exist')
        cy.contains('Last Name is required').should('exist')
        cy.contains('Email is required').should('exist')
        cy.contains('Password is required').should('exist')
        cy.contains('Security Test is required').should('exist')

    })

    it('Filling the form', () => {

    

        //Filling in the form
        cy.get('input[name="firstName"]').type('JuansTest')
        cy.get('input[name="lastName"]').type('BigMind')
        cy.get('input[name="email"]').type('fake6@gmail.com')
        cy.get('input[name="password"]').type('ValidPassword123')

        //Solving Security test
        cy.get('label[for="securityTest"]').invoke('text').then((SecText) => {

            var numb = SecText.match(/\d/g);
            numb = numb.join("");

            var n = SecText[18];

        if(n === "+") {
        
            var Number1 = parseInt(numb[0]);
            var Number2 = parseInt(numb[1]);
        
            var Answer = Number1 + Number2;
        
            //Filling Security Test field
            cy.get('input[name="securityTest"]').type(Answer)

        
        }
        else if(n === "-"){

            var Number1 = parseInt(numb[0]);
            var Number2 = parseInt(numb[1]);
        
            var Answer = Number1 - Number2;


            //Filling Security Test field
            cy.get('input[name="securityTest"]').type(Answer)

        }
        })

    })

    it('Error message for used email', () => {

        cy.get('input[name="email"]').clear().type('fake@gmail.com')
        cy.get('button[type="submit"]').click()

        cy.wait(15000)

        cy.contains('The email address is already in use by another account.').should('exist')


    })

    it('Registering account and making sure to land on inventory after clicking Get Started', () => {

        //Registering the Account
        //Generating Random String
        function GenrateRandonEmail() {
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        
            for (var i = 0; i < 10; i++)
              text += possible.charAt(Math.floor(Math.random() * possible.length));
        
            return text;
          }
          //Assigning @gmail to string
          var RandomEmailSuccess = GenrateRandonEmail() + "@gmail.com"


        cy.get('input[name="email"]').clear().type(RandomEmailSuccess)
        cy.get('button[type="submit"]').click()

        cy.wait(30000)

        //Confirming Page URLs
        cy.url().should('eq', 'https://dev.vendoo.co/app/onboarding')
        cy.contains('Get Started').click()
        cy.url().should('eq', 'https://dev.vendoo.co/app')


    })
    


})