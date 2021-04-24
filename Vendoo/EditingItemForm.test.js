/// <reference types="cypress" />

//Saving Global Item ID Number
var GlobalItemIDNumber = ''

//First set of variables to save and confirm
var TitleRandomString1 = ''
var DescriptionRandomString1 = ''
var SKURandomString1 = ''
var RandomZipCode1 = ''
var RandomPrice1 = ''
var RandomCostPrice1 = ''
var InternalNotesRandomString1 = ''

////Second set of variables to save and confirm
var TitleRandomString2 = ''
var DescriptionRandomString2 = ''
var SKURandomString2 = ''
var RandomZipCode2 = ''
var RandomPrice2 = ''
var RandomCostPrice2 = ''
var InternalNotesRandomString2 = ''


function RandomPriceNumber(){
    var RanNum = Math.floor(Math.random() * 400) + 1;
    return RanNum;
}

function RandomZipCode(){
    var RanZip = ""

    for(var i = 0; i < 5; i++){
        var RanZipNumb = Math.floor(Math.random()* 10)
        RanZip += RanZipNumb
    }

    return RanZip
}

function GenrateRandonString(LengthStr) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 ";

    for (var i = 0; i < LengthStr; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    
}



describe ('Dev Editing Items', () => {

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


    it('Creating New item and filling in item details', () => {
        cy.contains('New Item', { timeout: 15000 }).click().url({timeout: 15000}).should('contain', '/app/item/new')

        //Saving and typing item randomized string for Title
        TitleRandomString1 = GenrateRandonString(15)
        cy.get('input[name="generalDetails.title"]').type(TitleRandomString1)

        //Saving and typing item randomized string for Description
        DescriptionRandomString1 = GenrateRandonString(120)
        cy.get('textarea[name="generalDetails.description"]').type(DescriptionRandomString1)

        //Filling in brand
        cy.get('input[name="generalDetails.brand"]').type('Eagle Creek{enter}')

        //Filling in Condition
        cy.get('input[name="generalDetails.condition"]').type('New With Defects{enter}')

        //Filling in Color
        cy.get('input[name="generalDetails.primaryColor"]').type('Silver{enter}')

        //Filling in Secondary Color
        cy.get('input[name="generalDetails.secondaryColor"]').type('Tan{enter}')

        //Filling in SKU and Saving it
        SKURandomString1 = GenrateRandonString(8)
        cy.get('input[name="generalDetails.sku"]').type(SKURandomString1)

        //Saving and Typing Random ZipCode
        RandomZipCode1 = RandomZipCode()
        cy.get('input[name="generalDetails.zipCode"]').type(RandomZipCode1)

        //Typing in Tags
        cy.get('input[name="generalDetails.tags"]').type('vintage, retro, vans')

        //Selecting a Category
        cy.get('button[role="category-input"]').click()
        cy.contains('Cameras & Photo').click()
        cy.contains('Digital Cameras').click()

        //Typing in Weight
        cy.get('input[name="generalDetails.weight.pounds"]').clear().type('1')
        cy.get('input[name="generalDetails.weight.ounces"]').clear().type('2')

        //Typing in Dimensions 
        cy.get('input[name="generalDetails.dimensions.length"]').clear().type('3')
        cy.get('input[name="generalDetails.dimensions.width"]').clear().type('4')
        cy.get('input[name="generalDetails.dimensions.height"]').clear().type('5')

        //Saving price
        RandomPrice1 = RandomPriceNumber()
        cy.get('input[name="generalDetails.price"]').type(RandomPrice1)

        //Typing Cost of Item
        RandomCostPrice1 = RandomPriceNumber()
        cy.get('input[name="generalDetails.cost"]').type(RandomCostPrice1)

        //Saving and typing item randomized string for Vendoo Internal Notes
        InternalNotesRandomString1 = GenrateRandonString(80)
        cy.get('textarea[name="generalDetails.notes"]').type(InternalNotesRandomString1)

    })

    it('Saving and making sure the URL contains item ID number', () => {

        cy.get('button[role="save"]', {timeout: 40000}).click()
        //New URL should contain item ID number
        cy.contains('Vendoo Item ID', {timeout: 15000}).siblings().invoke('text').then((itemIdNum) => {
        cy.url({timeout: 30000}).should('contain', itemIdNum)
        GlobalItemIDNumber = itemIdNum;
        })

        

    })

    it("Confirming item's details ", () => {
        //Confirming Title
        cy.get('input[name="generalDetails.title"]', {timeout:10000}).should('have.attr', 'value').and('eq', TitleRandomString1)

        //Confirming Description
        cy.get('textarea[name="generalDetails.description"]').should('have.text', DescriptionRandomString1)

        //Confirming Brand
        cy.get('input[name="generalDetails.brand"]').should('have.attr', 'value').and('eq', 'Eagle Creek')

        //Confirming Condition
        cy.get('input[name="generalDetails.condition"]').should('have.attr', 'value').and('eq', 'New With Defects')

        //Confirming Color
        cy.get('input[name="generalDetails.primaryColor"]').should('have.attr', 'value').and('eq', 'Silver')

        //Confirming Secondary Color
        cy.get('input[name="generalDetails.secondaryColor"]').should('have.attr', 'value').and('eq', 'Tan')

        //Confirming SKU
        cy.get('input[name="generalDetails.sku"]').should('have.attr', 'value').and('eq', SKURandomString1)

        //Confirming ZipCode
        cy.get('input[name="generalDetails.zipCode"]').should('have.attr', 'value').and('eq', RandomZipCode1.toString())

        //Confirming Tags
        cy.get('input[name="generalDetails.tags"]').should('have.attr', 'value').and('eq', 'vintage, retro, vans')

        //Confirming Category
        cy.contains('Digital Cameras').should('exist')

        //Confirming Weight
        cy.get('input[name="generalDetails.weight.pounds"]').should('have.attr', 'value').and('eq', '1')
        cy.get('input[name="generalDetails.weight.ounces"]').should('have.attr', 'value').and('eq', '2')

        //Confirming Dimensions 
        cy.get('input[name="generalDetails.dimensions.length"]').should('have.attr', 'value').and('eq', '3')
        cy.get('input[name="generalDetails.dimensions.width"]').should('have.attr', 'value').and('eq', '4')
        cy.get('input[name="generalDetails.dimensions.height"]').should('have.attr', 'value').and('eq', '5')

        //Confirming price
        cy.get('input[name="generalDetails.price"]').should('have.attr', 'value').and('eq', RandomPrice1.toString())

        //Confirming Cost of Item
        cy.get('input[name="generalDetails.cost"]').should('have.attr', 'value').and('eq', RandomCostPrice1.toString())

        //Confirming Vendoo Internal Notes
        cy.get('textarea[name="generalDetails.notes"]').should('have.text', InternalNotesRandomString1)
    })

    it('Editing item information and saving', () => {
        //Reloading the Page
        cy.reload()

        //Editing all the info and saving it once more

        //Saving and typing item randomized string for Title
        TitleRandomString2 = GenrateRandonString(15)
        cy.get('input[name="generalDetails.title"]', {timeout:15000}).clear().type(TitleRandomString2)

        //Saving and typing item randomized string for Description
        DescriptionRandomString2 = GenrateRandonString(120)
        cy.get('textarea[name="generalDetails.description"]').clear().type(DescriptionRandomString2)

        //Filling in brand
        cy.get('input[name="generalDetails.brand"]').clear().type('X-Plus{enter}')

        //Filling in Condition
        cy.get('input[name="generalDetails.condition"]').clear().type('Pre-Owned{enter}')

        //Filling in Color
        cy.get('input[name="generalDetails.primaryColor"]').clear().type('Purple{enter}')

        //Filling in Secondary Color
        cy.get('input[name="generalDetails.secondaryColor"]').clear().type('Cream{enter}')

        //Filling in SKU and Saving it
        SKURandomString2 = GenrateRandonString(8)
        cy.get('input[name="generalDetails.sku"]').clear().type(SKURandomString2)

        //Saving and Typing Random ZipCode
        RandomZipCode2 = RandomZipCode()
        cy.get('input[name="generalDetails.zipCode"]').clear().type(RandomZipCode2)

        //Typing in Tags
        cy.get('input[name="generalDetails.tags"]').clear().type('modern, gray, shoes')

        //Selecting a Category
        cy.get('button[role="category-input"]').click()
        cy.contains('All', {timeout:10000}).click()

        //Making sure the "All" button was clicked
        if(cy.contains('All')){
            cy.contains('All').click()
        }

        cy.contains('Jewelry & Watches', {timeout:10000}).click()
        cy.contains('Loose Beads').click()
        cy.contains('Shell, Bone, Coral').click()

        //Typing in Weight
        cy.get('input[name="generalDetails.weight.pounds"]').clear().type('6')
        cy.get('input[name="generalDetails.weight.ounces"]').clear().type('7')

        //Typing in Dimensions 
        cy.get('input[name="generalDetails.dimensions.length"]').clear().type('8')
        cy.get('input[name="generalDetails.dimensions.width"]').clear().type('9')
        cy.get('input[name="generalDetails.dimensions.height"]').clear().type('10')

        //Saving price
        RandomPrice2 = RandomPriceNumber()
        cy.get('input[name="generalDetails.price"]').clear().type(RandomPrice2)

        //Typing Cost of Item
        RandomCostPrice2 = RandomPriceNumber()
        cy.get('input[name="generalDetails.cost"]').clear().type(RandomCostPrice2)

        //Saving and typing item randomized string for Vendoo Internal Notes
        InternalNotesRandomString2 = GenrateRandonString(80)
        cy.get('textarea[name="generalDetails.notes"]').clear().type(InternalNotesRandomString2)

        //Saving new details
        cy.get('button[role="save"]', {timeout: 40000}).click()
        cy.contains('Saving', {timeout:20000}).should('not.exist')
    })



    it('Going back to inventory page', () => {
        cy.visit('https://dev.vendoo.co/app')
        cy.reload()
    })

    it('Going back to the same item and reloading', () => {
        cy.visit('https://dev.vendoo.co/app/item/'+GlobalItemIDNumber, {timeout: 40000, failOnStatusCode: false})
        cy.reload()
    })

    it('Confirming new (second) information has been saved correctly', () => {
        
        //Confirming Title
        cy.get('input[name="generalDetails.title"]', {timeout:20000}).should('have.attr', 'value').and('eq', TitleRandomString2)

        //Confirming Description
        cy.get('textarea[name="generalDetails.description"]').should('have.text', DescriptionRandomString2)

        //Confirming Brand
        cy.get('input[name="generalDetails.brand"]').should('have.attr', 'value').and('eq', 'X-Plus')

        //Confirming Condition
        cy.get('input[name="generalDetails.condition"]').should('have.attr', 'value').and('eq', 'Pre-Owned')

        //Confirming Color
        cy.get('input[name="generalDetails.primaryColor"]').should('have.attr', 'value').and('eq', 'Purple')

        //Confirming Secondary Color
        cy.get('input[name="generalDetails.secondaryColor"]').should('have.attr', 'value').and('eq', 'Cream')

        //Confirming SKU
        cy.get('input[name="generalDetails.sku"]').should('have.attr', 'value').and('eq', SKURandomString2)

        //Confirming ZipCode
        cy.get('input[name="generalDetails.zipCode"]').should('have.attr', 'value').and('eq', RandomZipCode2.toString())

        //Confirming Tags
        cy.get('input[name="generalDetails.tags"]').should('have.attr', 'value').and('eq', 'modern, gray, shoes')

        //Confirming Category
        cy.contains('Loose Beads').should('exist')
        cy.contains('Shell, Bone, Coral').should('exist')

        //Confirming Weight
        cy.get('input[name="generalDetails.weight.pounds"]').should('have.attr', 'value').and('eq', '6')
        cy.get('input[name="generalDetails.weight.ounces"]').should('have.attr', 'value').and('eq', '7')

        //Confirming Dimensions 
        cy.get('input[name="generalDetails.dimensions.length"]').should('have.attr', 'value').and('eq', '8')
        cy.get('input[name="generalDetails.dimensions.width"]').should('have.attr', 'value').and('eq', '9')
        cy.get('input[name="generalDetails.dimensions.height"]').should('have.attr', 'value').and('eq', '10')

        //Confirming price
        cy.get('input[name="generalDetails.price"]').should('have.attr', 'value').and('eq', RandomPrice2.toString())

        //Confirming Cost of Item
        cy.get('input[name="generalDetails.cost"]').should('have.attr', 'value').and('eq', RandomCostPrice2.toString())

        //Confirming Vendoo Internal Notes
        cy.get('textarea[name="generalDetails.notes"]').should('have.text', InternalNotesRandomString2)


    })





    it('Logging Out', () => {
        cy.visit('https://dev.vendoo.co/app')
        cy.get('a[href="/app/#"]', {timeout: 15000}).click({force: true})
    })

})