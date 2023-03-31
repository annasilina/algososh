/// <reference types="cypress" />

describe('fibonacci page', () => {
	beforeEach(() => {
		cy.visit('/fibonacci');
		cy.clock();
		cy.get('[id="calculate-btn"]').as('calcBtn');
	});

	it('button should be switch disabled state correctly depends on input value', () => {
		cy.get('input').should('have.value', '');
		cy.get('@calcBtn').should('be.disabled')

		cy.get('input').type('1')
		cy.get('@calcBtn').should('be.enabled')
	});

	it('input should not have a not number value', () => {
		cy.get('input').type('test').should('have.value', '');
	});

	it('should be calculate fibonacci values correctly with loader on button and disabled input trough calculation', function () {
		cy.get('input').type('5').should('have.value', '5');

		cy.get('@calcBtn').click()
		cy.get('[class^=button_loader]').should('be.exist');

		cy.get('input').should('be.disabled');

		cy.tick(500);


		// cy.get('[class*=circle_index]').as('circle_index');

		cy.get("[class^=circle_content]")
			.should('have.length', 1)
			.last()
			.within(() => {
				cy.contains('0')
				cy.get('[class*=circle_index]').contains('0');
			})

		cy.tick(500);

		cy.get("[class^=circle_content]")
			.should('have.length', 2)
			.last()
			.within(() => {
				cy.contains('1')
				cy.get('[class*=circle_index]').contains('1');
			})

		cy.tick(500);

		cy.get("[class^=circle_content]")
			.should('have.length', 3)
			.last()
			.within(() => {
				cy.contains('1')
				cy.get('[class*=circle_index]').contains('2');
			})

		cy.tick(500);

		cy.get("[class^=circle_content]")
			.should('have.length', 4)
			.last()
			.within(() => {
				cy.contains('2')
				cy.get('[class*=circle_index]').contains('3');
			})

		cy.tick(500);

		cy.get("[class^=circle_content]")
			.should('have.length', 5)
			.last()
			.within(() => {
				cy.contains('3')
				cy.get('[class*=circle_index]').contains('4');
			})

		cy.tick(500);

		cy.get("[class^=circle_content]")
			.should('have.length', 6)
			.last()
			.within(() => {
				cy.contains('5')
				cy.get('[class*=circle_index]').contains('5');
			})

		cy.get('[class^=button_loader]').should('not.exist');
		cy.get('input').should('be.enabled');
	})
})

export {}