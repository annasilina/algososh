/// <reference types="cypress" />

describe('string page', () => {
	beforeEach(() => {
		cy.visit('/recursion');
	});

	it('button should be switch disabled state correctly depends on input value ', () => {
		cy.get('input').should('have.value', '');
		cy.get('[id="reverse-btn"]').should('be.disabled')

		cy.get('input').type('test')
		cy.get('[id="reverse-btn"]').should('be.enabled')
	});

	it('should be reverse string correctly with loader on button and disabled input trough reversing', () => {
		cy.get('input').type('test')
		cy.get('[id="reverse-btn"]').click().wrap({isLoader: true}).get('input').should('be.disabled');

		cy.get("[class^=circle_circle]").each((item, index) => {
			if (index === 0) cy.wrap(item).should('have.css', 'border', '4px solid rgb(210, 82, 225)').contains('t');
			if (index === 1) cy.wrap(item).should('have.css', 'border', '4px solid rgb(0, 50, 255)').contains('e');
			if (index === 2) cy.wrap(item).should('have.css', 'border', '4px solid rgb(0, 50, 255)').contains('s');
			if (index === 3) cy.wrap(item).should('have.css', 'border', '4px solid rgb(210, 82, 225)').contains('t');
		})

		cy.get("[class^=circle_circle]").each((item, index) => {
			if (index === 0) cy.wrap(item).should('have.css', 'border', '4px solid rgb(127, 224, 81)').contains('t');
			if (index === 1) cy.wrap(item).should('have.css', 'border', '4px solid rgb(210, 82, 225)').contains('e');
			if (index === 2) cy.wrap(item).should('have.css', 'border', '4px solid rgb(210, 82, 225)').contains('s');
			if (index === 3) cy.wrap(item).should('have.css', 'border', '4px solid rgb(127, 224, 81)').contains('t');
		})

		cy.get("[class^=circle_circle]").each((item, index) => {
			if (index === 0) cy.wrap(item).should('have.css', 'border', '4px solid rgb(127, 224, 81)').contains('t');
			if (index === 1) cy.wrap(item).should('have.css', 'border', '4px solid rgb(127, 224, 81)').contains('s');
			if (index === 2) cy.wrap(item).should('have.css', 'border', '4px solid rgb(127, 224, 81)').contains('e');
			if (index === 3) cy.wrap(item).should('have.css', 'border', '4px solid rgb(127, 224, 81)').contains('t');
		})

		cy.get('[id="reverse-btn"]').wrap({isLoader: false}).get('input').should('be.enabled');
	})
})

export {}