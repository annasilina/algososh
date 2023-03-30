/// <reference types="cypress" />

describe('fibonacci page', () => {
	beforeEach(() => {
		cy.visit('/fibonacci');
	});

	it('button should be switch disabled state correctly depends on input value', () => {
		cy.get('input').should('have.value', '');
		cy.get('[id="calculate-btn"]').should('be.disabled')

		cy.get('input').type('1')
		cy.get('[id="calculate-btn"]').should('be.enabled')
	});

	it('input should not have a not number value', () => {
		cy.get('input').type('test').should('have.value', '');
	});

	it('should be calculate fibonacci values correctly with loader on button and disabled input trough calculation', function () {
		cy.get('input').type('5').should('have.value', '5');
		cy.get('[id="calculate-btn"]').click().wrap({isLoader: true})
		cy.get('input').should('be.disabled');

		cy.get('[class^=circle_circle]').wrap({letter: '0'}).wrap({index: 0});
		cy.get('[class^=circle_circle]').wrap({letter: '1'}).wrap({index: 1});
		cy.get('[class^=circle_circle]').wrap({letter: '1'}).wrap({index: 2});
		cy.get('[class^=circle_circle]').wrap({letter: '2'}).wrap({index: 3});
		cy.get('[class^=circle_circle]').wrap({letter: '3'}).wrap({index: 4});
		cy.get('[class^=circle_circle]').wrap({letter: '5'}).wrap({index: 5});

		cy.get('[id="calculate-btn"]').wrap({isLoader: false});
	})
})

export {}