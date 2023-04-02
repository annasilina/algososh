/// <reference types="cypress" />

import {CHANGING_COLOR, DEFAULT_COLOR} from "../../src/constants/colors";
import {BUTTON_LOADER, CIRCLE_CIRCLE, CIRCLE_HEAD, CIRCLE_INDEX, INPUT} from "../../src/constants/selectors";

describe('stack page', () => {
	beforeEach(() => {
		cy.visit('/stack');
		cy.clock();
		cy.get('[id="add-elem-btn"]').as('addButton');
		cy.get('[id="del-elem-btn"]').as('delButton');
		cy.get('[id="clear-stack-btn"]').as('clearButton');
	})

	it('add element button should be switch disabled state correctly depends on input value', () => {
		cy.get(INPUT).should('have.value', '');
		cy.get('@addButton').should('be.disabled')

		cy.get(INPUT).type('1')
		cy.get('@addButton').should('be.enabled')
	});

	it('add element button should adding elements one by one to the top', () => {
		// adding first element
		cy.get(INPUT).type('1').should('have.value', '1');

		cy.get('@addButton').click();
		cy.get(BUTTON_LOADER).should('be.exist');

		cy.get('@delButton').should('be.disabled');
		cy.get('@clearButton').should('be.disabled');

		cy.get(INPUT).should('be.disabled');

		// checking circles array through adding first element
		cy
			.get('[class^=circle_circle')
			.should('have.length', '1')
			.last()
			.should('have.css', 'border', CHANGING_COLOR)
			.get(CIRCLE_INDEX).last().contains('0')
			.get(CIRCLE_HEAD).last().contains('top');

		cy.tick(500);

		// checking circles array after first element was added
		cy
			.get(CIRCLE_CIRCLE)
			.should('have.length', 1)
			.last()
			.should('have.css', 'border', DEFAULT_COLOR)
			.get(CIRCLE_INDEX).last().contains('0')
			.get(CIRCLE_HEAD).last().contains('top');

		cy.get(BUTTON_LOADER).should('not.exist');

		cy.get('@delButton').should('be.enabled');
		cy.get('@clearButton').should('be.enabled');

		cy.get(INPUT).should('be.enabled');

		// adding second element
		cy.get(INPUT).type('2').should('have.value', '2');

		cy.get('@addButton').click();
		cy.get(BUTTON_LOADER).should('be.exist');
		cy.get('@delButton').should('be.disabled');
		cy.get('@clearButton').should('be.disabled');

		cy.get(INPUT).should('be.disabled');

		// checking circles array through adding second element
		cy
			.get(CIRCLE_CIRCLE)
			.should('have.length', 2)
			.last()
			.should('have.css', 'border', CHANGING_COLOR)
			.get(CIRCLE_INDEX).last().contains('1')
			.get(CIRCLE_HEAD).last().contains('top');

		cy.tick(500);

		// checking circles array after second element was added
		cy
			.get(CIRCLE_CIRCLE)
			.should('have.length', 2)
			.last()
			.should('have.css', 'border', DEFAULT_COLOR)
			.get(CIRCLE_INDEX).last().contains('1')
			.get(CIRCLE_HEAD).last().contains('top');

		cy.get(BUTTON_LOADER).should('not.exist');

		cy.get('@delButton').should('be.enabled');
		cy.get('@clearButton').should('be.enabled');

		cy.get(INPUT).should('be.enabled');

		// adding third element
		cy.get(INPUT).type('3').should('have.value', '3');

		cy.get('@addButton').click();
		cy.get(BUTTON_LOADER).should('be.exist');

		cy.get('@delButton').should('be.disabled');
		cy.get('@clearButton').should('be.disabled');

		cy.get(INPUT).should('be.disabled');

		// checking circles array through adding third element
		cy
			.get(CIRCLE_CIRCLE)
			.should('have.length', 3)
			.last()
			.should('have.css', 'border', CHANGING_COLOR)
			.get(CIRCLE_INDEX).last().contains('2')
			.get(CIRCLE_HEAD).last().contains('top');

		cy.tick(500);

		// checking circles array after third element was added
		cy
			.get(CIRCLE_CIRCLE)
			.should('have.length', 3)
			.last()
			.should('have.css', 'border', DEFAULT_COLOR)
			.get(CIRCLE_INDEX).last().contains('2')
			.get(CIRCLE_HEAD).last().contains('top');

		cy.get(BUTTON_LOADER).should('not.exist');

		cy.get('@delButton').should('be.enabled');
		cy.get('@clearButton').should('be.enabled');

		cy.get(INPUT).should('be.enabled');
	});

	it('del element button should deleting one by one element from the top', () => {
		// adding elements in stack
		cy.get(INPUT).type('1').should('have.value', '1');
		cy.get('@addButton').click();

		cy.tick(500);

		cy.get(INPUT).type('2').should('have.value', '2');
		cy.get('@addButton').click();

		cy.tick(500);

		cy.get(INPUT).type('3').should('have.value', '3');
		cy.get('@addButton').click()

		cy.tick(500);

		// check circles array before deleting
		cy.get(CIRCLE_CIRCLE)
			.should('have.length', 3)
			.each((item, index) => {
				if (index === 0) cy.wrap(item).contains('1')
				if (index === 1) cy.wrap(item).contains('2')
				if (index === 2) cy.wrap(item).contains('3')
			});

		// second step - deleting elements from stack
		// delete first element from the top
		cy.get('@delButton').click()

		cy.get(BUTTON_LOADER).should('be.exist');

		cy.get('@addButton').should('be.disabled');
		cy.get('@clearButton').should('be.disabled');

		cy.get(INPUT).should('be.disabled');

		// checking circles array through deleting first element from the top
		cy.get(CIRCLE_CIRCLE)
			.last().should('have.css', 'border', CHANGING_COLOR);

		cy.tick(500);

		// check circles array after first element was deleted
		cy.get(CIRCLE_CIRCLE)
			.should('have.length', 2)
			.each((item, index) => {
				if (index === 0) cy.wrap(item).contains('1')
				if (index === 1) cy.wrap(item).contains('2')
			});

		cy.get(BUTTON_LOADER).should('not.exist');

		cy.get('@clearButton').should('be.enabled');

		cy.get(INPUT).should('be.enabled');

		// delete second element
		cy.get('@delButton').click();

		cy.get(BUTTON_LOADER).should('be.exist');

		cy.get('@addButton').should('be.disabled');
		cy.get('@clearButton').should('be.disabled');

		cy.get(INPUT).should('be.disabled');

		// checking circles array through deleting second element from the top
		cy.get(CIRCLE_CIRCLE)
			.last().should('have.css', 'border', CHANGING_COLOR);

		cy.tick(500);

		// check circles array after second element was deleted
		cy.get(CIRCLE_CIRCLE)
			.should('have.length', 1)
			.each((item, index) => {
				if (index === 0) cy.wrap(item).contains('1')
			});

		cy.get(BUTTON_LOADER).should('not.exist');

		cy.get('@clearButton').should('be.enabled');

		cy.get(INPUT).should('be.enabled');

		// delete third element
		cy.get('@delButton').click();

		cy.get(BUTTON_LOADER).should('be.exist');

		cy.get('@addButton').should('be.disabled');
		cy.get('@clearButton').should('be.disabled');

		cy.get(INPUT).should('be.disabled');

		// checking circles array through deleting second element from the top
		cy.get(CIRCLE_CIRCLE)
			.last().should('have.css', 'border', CHANGING_COLOR);

		cy.tick(500);

		// checking circles array after third element was deleted
		cy.get(CIRCLE_CIRCLE)
			.should('have.length', 0);

		cy.get(BUTTON_LOADER).should('not.exist');

		cy.get(INPUT).should('be.enabled');
	});

	it('clear stack button should clear all stack elements at one time', () => {
		cy.get(INPUT).type('1').should('have.value', '1');
		cy.get('@addButton').click();

		cy.tick(500);

		cy.get(INPUT).type('2').should('have.value', '2');
		cy.get('@addButton').click();

		cy.tick(500);

		cy.get(INPUT).type('3').should('have.value', '3');
		cy.get('@addButton').click();

		cy.tick(500);

		cy.get('@clearButton').click();

		cy.get(BUTTON_LOADER).should('be.exist');

		cy.get('@addButton').should('be.disabled');
		cy.get('@delButton').should('be.disabled');

		cy.get(INPUT).should('be.disabled');

		cy.tick(500);

		cy.get(CIRCLE_CIRCLE).should('have.length', 0);

		cy.get(BUTTON_LOADER).should('not.exist');

		cy.get('@addButton').should('be.disabled');
		cy.get('@delButton').should('be.disabled');
		cy.get('@clearButton').should('be.disabled');

		cy.get(INPUT).should('be.enabled');
	});
});

export {}