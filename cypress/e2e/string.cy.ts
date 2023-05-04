/// <reference types="cypress" />

import {BUTTON_LOADER, CIRCLE_CIRCLE, INPUT} from "../../src/constants/selectors";
import {CHANGING_COLOR, DEFAULT_COLOR, MODIFIED_COLOR} from "../../src/constants/colors";

describe('string page', () => {
	beforeEach(() => {
		cy.visit('/recursion');
		cy.get('[id="reverse-btn"]').as('reverseBtn');
		cy.clock();
	});

	it('button should be switch disabled state correctly depends on input value ', () => {
		cy.get(INPUT).should('have.value', '');
		cy.get('@reverseBtn').should('be.disabled')

		cy.get(INPUT).type('test')
		cy.get('@reverseBtn').should('be.enabled')
	});

	it('should be reverse string correctly with loader on button and disabled input trough reversing', () => {
		cy.get(INPUT).type('test').should('have.value', 'test');

		cy.get('@reverseBtn').click();
		cy.get(BUTTON_LOADER).should('be.exist');

		cy.get(INPUT).should('be.disabled');

		cy.get(CIRCLE_CIRCLE).each((item, index) => {
			if (index === 0) cy.wrap(item).should('have.css', 'border', CHANGING_COLOR).contains('t');
			if (index === 1) cy.wrap(item).should('have.css', 'border', DEFAULT_COLOR).contains('e');
			if (index === 2) cy.wrap(item).should('have.css', 'border', DEFAULT_COLOR).contains('s');
			if (index === 3) cy.wrap(item).should('have.css', 'border', CHANGING_COLOR).contains('t');
		})

		cy.tick(1000);

		cy.get(CIRCLE_CIRCLE).each((item, index) => {
			if (index === 0) cy.wrap(item).should('have.css', 'border', MODIFIED_COLOR).contains('t');
			if (index === 1) cy.wrap(item).should('have.css', 'border', CHANGING_COLOR).contains('e');
			if (index === 2) cy.wrap(item).should('have.css', 'border', CHANGING_COLOR).contains('s');
			if (index === 3) cy.wrap(item).should('have.css', 'border', MODIFIED_COLOR).contains('t');
		})

		cy.tick(1000);

		cy.get(CIRCLE_CIRCLE).each((item, index) => {
			if (index === 0) cy.wrap(item).should('have.css', 'border', MODIFIED_COLOR).contains('t');
			if (index === 1) cy.wrap(item).should('have.css', 'border', MODIFIED_COLOR).contains('s');
			if (index === 2) cy.wrap(item).should('have.css', 'border', MODIFIED_COLOR).contains('e');
			if (index === 3) cy.wrap(item).should('have.css', 'border', MODIFIED_COLOR).contains('t');
		})

		cy.get(BUTTON_LOADER).should('not.exist');
		cy.get(INPUT).should('be.enabled');
	})
})

export {}