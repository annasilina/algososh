/// <reference types="cypress" />

import {BUTTON_LOADER, CIRCLE_CONTENT, CIRCLE_INDEX, INPUT} from "../../src/constants/selectors";

describe('fibonacci page', () => {
	beforeEach(() => {
		cy.visit('/fibonacci');
		cy.clock();
		cy.get('[id="calculate-btn"]').as('calcBtn');
	});

	it('button should be switch disabled state correctly depends on input value', () => {
		cy.get(INPUT).should('have.value', '');
		cy.get('@calcBtn').should('be.disabled')

		cy.get(INPUT).type('1')
		cy.get('@calcBtn').should('be.enabled')
	});

	it('input should not have a not number value', () => {
		cy.get(INPUT).type('test').should('have.value', '');
	});

	it('should be calculate fibonacci values correctly with loader on button and disabled input trough calculation', function () {
		cy.get(INPUT).type('5').should('have.value', '5');

		cy.get('@calcBtn').click()
		cy.get(BUTTON_LOADER).should('be.exist');

		cy.get(INPUT).should('be.disabled');

		cy.tick(500);

		cy.get(CIRCLE_CONTENT)
			.should('have.length', 1)
			.last()
			.within(() => {
				cy.contains('0')
				cy.get(CIRCLE_INDEX).contains('0');
			})

		cy.tick(500);

		cy.get(CIRCLE_CONTENT)
			.should('have.length', 2)
			.last()
			.within(() => {
				cy.contains('1')
				cy.get(CIRCLE_INDEX).contains('1');
			})

		cy.tick(500);

		cy.get(CIRCLE_CONTENT)
			.should('have.length', 3)
			.last()
			.within(() => {
				cy.contains('1')
				cy.get(CIRCLE_INDEX).contains('2');
			})

		cy.tick(500);

		cy.get(CIRCLE_CONTENT)
			.should('have.length', 4)
			.last()
			.within(() => {
				cy.contains('2')
				cy.get(CIRCLE_INDEX).contains('3');
			})

		cy.tick(500);

		cy.get(CIRCLE_CONTENT)
			.should('have.length', 5)
			.last()
			.within(() => {
				cy.contains('3')
				cy.get(CIRCLE_INDEX).contains('4');
			})

		cy.tick(500);

		cy.get(CIRCLE_CONTENT)
			.should('have.length', 6)
			.last()
			.within(() => {
				cy.contains('5')
				cy.get(CIRCLE_INDEX).contains('5');
			})

		cy.get(BUTTON_LOADER).should('not.exist');
		cy.get(INPUT).should('be.enabled');
	})
})

export {}