/// <reference types="cypress" />

import {CHANGING_COLOR, DEFAULT_COLOR} from "../../src/constants/colors";
import {
	BUTTON_LOADER,
	CIRCLE_CIRCLE,
	CIRCLE_CONTENT,
	CIRCLE_HEAD,
	CIRCLE_INDEX,
	CIRCLE_TAIL,
	INPUT
} from "../../src/constants/selectors";

describe('queue page', () => {
	beforeEach(() => {
		cy.visit('/queue');
		cy.clock();
		cy.get('[id="add-btn"]').as('addButton');
		cy.get('[id="delete-btn"]').as('delButton');
		cy.get('[id="clear-btn"]').as('clearButton');
	});

	it('add element button should be switch disabled state correctly depends on input value', () => {
		cy.get(INPUT).should('have.value', '');
		cy.get('@addButton').should('be.disabled')

		cy.get(INPUT).type('1')
		cy.get('@addButton').should('be.enabled')
	});


	it('add element button should adding elements one by one to the tail', () => {
		// adding first element
		cy.get(INPUT).type('1').should('have.value', '1');
		cy.get('@addButton').click()

		cy.get(BUTTON_LOADER).should('be.exist');

		cy.get('@delButton').should('be.disabled');
		cy.get('@clearButton').should('be.disabled');

		cy.get(INPUT).should('be.disabled');

		// checking circles array through adding first element
		cy
			.get(CIRCLE_CONTENT).each((item, index) => {
			if (index === 0)
				cy
					.wrap(item).within(() => {
					cy.get(CIRCLE_CIRCLE).should('have.css', 'border', CHANGING_COLOR)
					cy.should('have.value', '')
					cy.get(CIRCLE_INDEX).contains('0')
					cy.get(CIRCLE_HEAD).contains('head')
					cy.get(CIRCLE_TAIL).contains('tail');
				});
		})

		cy.tick(500);

		// checking circles array after first element was added
		cy
			.get(CIRCLE_CONTENT).each((item, index) => {
			if (index === 0)
				cy
					.wrap(item).within(() => {
					cy.get(CIRCLE_CIRCLE).should('have.css', 'border', DEFAULT_COLOR)
					cy.get(CIRCLE_INDEX).contains('0')
					cy.get(CIRCLE_HEAD).contains('head')
					cy.get(CIRCLE_TAIL).contains('tail');
				});
		})

		cy.get(BUTTON_LOADER).should('not.exist');

		cy.get('@delButton').should('be.enabled');
		cy.get('@clearButton').should('be.enabled');

		cy.get(INPUT).should('be.enabled');

		// adding second element
		cy.get(INPUT).type('2').should('have.value', '2');
		cy.get('@addButton').click()

		cy.get(BUTTON_LOADER).should('be.exist');

		cy.get('@delButton').should('be.disabled');
		cy.get('@clearButton').should('be.disabled');

		cy.get(INPUT).should('be.disabled');

		// checking circles array through adding second element
		cy
			.get(CIRCLE_CONTENT).each((item, index) => {
			if (index === 0)
				cy
					.wrap(item).within(() => {
					cy.get(CIRCLE_CIRCLE).should('have.css', 'border', DEFAULT_COLOR)
					cy.get(CIRCLE_INDEX).contains('0')
					cy.get(CIRCLE_HEAD).contains('head')
					cy.get(CIRCLE_TAIL).should('be.empty')
				});
			if (index === 1)
				cy
					.wrap(item).within(() => {
					cy.get(CIRCLE_CIRCLE).should('have.css', 'border', CHANGING_COLOR)
					cy.get(CIRCLE_INDEX).contains('1')
					cy.get(CIRCLE_HEAD).should('be.empty')
					cy.get(CIRCLE_TAIL).contains('tail');
				});
		})

		cy.tick(500);

		// checking circles array after second element was added
		cy
			.get(CIRCLE_CONTENT).each((item, index) => {
			if (index === 0)
				cy
					.wrap(item).within(() => {
					cy.get(CIRCLE_CIRCLE).should('have.css', 'border', DEFAULT_COLOR)
					cy.get(CIRCLE_INDEX).contains('0')
					cy.get(CIRCLE_HEAD).contains('head')
					cy.get(CIRCLE_TAIL).should('be.empty')
				});
			if (index === 1)
				cy
					.wrap(item).within(() => {
					cy.get(CIRCLE_CIRCLE).should('have.css', 'border', DEFAULT_COLOR)
					cy.get(CIRCLE_INDEX).contains('1')
					cy.get(CIRCLE_HEAD).should('be.empty')
					cy.get(CIRCLE_TAIL).contains('tail');
				});
		})

		cy.get(BUTTON_LOADER).should('not.exist');

		cy.get('@delButton').should('be.enabled');
		cy.get('@clearButton').should('be.enabled');

		cy.get(INPUT).should('be.enabled');

		//add third element
		cy.get(INPUT).type('3').should('have.value', '3');
		cy.get('@addButton').click()

		cy.get(BUTTON_LOADER).should('be.exist');

		cy.get('@delButton').should('be.disabled');
		cy.get('@clearButton').should('be.disabled');

		cy.get(INPUT).should('be.disabled');

		// checking circles array through adding second element
		cy
			.get(CIRCLE_CONTENT).each((item, index) => {
			if (index === 0)
				cy
					.wrap(item).within(() => {
					cy.get(CIRCLE_CIRCLE).should('have.css', 'border', DEFAULT_COLOR)
					cy.get(CIRCLE_INDEX).contains('0')
					cy.get(CIRCLE_HEAD).contains('head')
					cy.get(CIRCLE_TAIL).should('be.empty')
				});
			if (index === 1)
				cy
					.wrap(item).within(() => {
					cy.get(CIRCLE_CIRCLE).should('have.css', 'border', DEFAULT_COLOR)
					cy.get(CIRCLE_INDEX).contains('1')
					cy.get(CIRCLE_HEAD).should('be.empty')
					cy.get(CIRCLE_TAIL).should('be.empty')
				});
			if (index === 2)
				cy
					.wrap(item).within(() => {
					cy.get(CIRCLE_CIRCLE).should('have.css', 'border', CHANGING_COLOR)
					cy.get(CIRCLE_INDEX).contains('2')
					cy.get(CIRCLE_HEAD).should('be.empty')
					cy.get(CIRCLE_TAIL).contains('tail');
				});
		})

		cy.tick(500);

		// checking circles array after second element was added
		cy
			.get(CIRCLE_CONTENT).each((item, index) => {
			if (index === 0)
				cy
					.wrap(item).within(() => {
					cy.get(CIRCLE_CIRCLE).should('have.css', 'border', DEFAULT_COLOR)
					cy.get(CIRCLE_INDEX).contains('0')
					cy.get(CIRCLE_HEAD).contains('head')
					cy.get(CIRCLE_TAIL).should('be.empty')
				});
			if (index === 1)
				cy
					.wrap(item).within(() => {
					cy.get(CIRCLE_CIRCLE).should('have.css', 'border', DEFAULT_COLOR)
					cy.get(CIRCLE_INDEX).contains('1')
					cy.get(CIRCLE_HEAD).should('be.empty')
					cy.get(CIRCLE_TAIL).should('be.empty')
				});
			if (index === 2)
				cy
					.wrap(item).within(() => {
					cy.get(CIRCLE_CIRCLE).should('have.css', 'border', DEFAULT_COLOR)
					cy.get(CIRCLE_INDEX).contains('2')
					cy.get(CIRCLE_HEAD).should('be.empty')
					cy.get(CIRCLE_TAIL).contains('tail');
				});
		})

		cy.get(BUTTON_LOADER).should('not.exist');

		cy.get('@delButton').should('be.enabled');
		cy.get('@clearButton').should('be.enabled');

		cy.get(INPUT).should('be.enabled');
	});

	it('del element button should deleting one by one element from the head', () => {
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
		cy.get(CIRCLE_CONTENT)
			.each((item, index) => {
				if (index === 0)
					cy
						.wrap(item).within(() => {
						cy.get(CIRCLE_CIRCLE).contains('1')
						cy.get(CIRCLE_INDEX).contains(`${index}`)
						cy.get(CIRCLE_HEAD).contains('head')
						cy.get(CIRCLE_TAIL).should('be.empty')
					});
				if (index === 1)
					cy
						.wrap(item).within(() => {
						cy.get(CIRCLE_CIRCLE).contains('2')
						cy.get(CIRCLE_INDEX).contains(`${index}`)
						cy.get(CIRCLE_HEAD).should('be.empty')
						cy.get(CIRCLE_TAIL).should('be.empty')
					});
				if (index === 2)
					cy
						.wrap(item).within(() => {
						cy.get(CIRCLE_CIRCLE).contains('3')
						cy.get(CIRCLE_INDEX).contains(`${index}`)
						cy.get(CIRCLE_HEAD).should('be.empty')
						cy.get(CIRCLE_TAIL).contains('tail')
					});
			});

		// second step - deleting elements from queue
		// delete first element
		cy.get('@delButton').click()

		cy.get(BUTTON_LOADER).should('be.exist');

		cy.get('@addButton').should('be.disabled');
		cy.get('@clearButton').should('be.disabled');

		cy.get(INPUT).should('be.disabled');

		// check circles array through deleting first element from head
		cy.get(CIRCLE_CONTENT)
			.each((item, index) => {
				if (index === 0)
					cy.wrap(item).within(() => {
						cy.get(CIRCLE_CIRCLE).should('have.css', 'border', CHANGING_COLOR)
					})
			})

		cy.tick(500);

		// check circles array after first element was deleted from the head
		cy.get(CIRCLE_CONTENT)
			.each((item, index) => {
				if (index === 0)
					cy.wrap(item).within(() => {
						cy.get(CIRCLE_CIRCLE)
							.should('have.css', 'border', DEFAULT_COLOR)
							.should('have.value', '')
						cy.get(CIRCLE_INDEX).contains(`${index}`)
						cy.get(CIRCLE_HEAD).should('be.empty')
						cy.get(CIRCLE_TAIL).should('be.empty')
					})
				if (index === 1)
					cy.wrap(item).within(() => {
						cy.get(CIRCLE_CIRCLE).contains('2')
						cy.get(CIRCLE_INDEX).contains(`${index}`)
						cy.get(CIRCLE_HEAD).contains('head')
						cy.get(CIRCLE_TAIL).should('be.empty')
					})
				if (index === 2)
					cy.wrap(item).within(() => {
						cy.get(CIRCLE_CIRCLE).contains('3')
						cy.get(CIRCLE_INDEX).contains(`${index}`)
						cy.get(CIRCLE_HEAD).should('be.empty')
						cy.get(CIRCLE_TAIL).contains('tail');
					})
			});

		cy.get(BUTTON_LOADER).should('not.exist');

		cy.get('@clearButton').should('be.enabled');

		cy.get(INPUT).should('be.enabled');

		// delete second element from the head
		cy.get('@delButton').click();

		cy.get(BUTTON_LOADER).should('be.exist');

		cy.get('@addButton').should('be.disabled');
		cy.get('@clearButton').should('be.disabled');

		cy.get(INPUT).should('be.disabled');

		// check circles array through deleting second element from the head
		cy.get(CIRCLE_CONTENT)
			.each((item, index) => {
				if (index === 1)
					cy.wrap(item).within(() => {
						cy.get(CIRCLE_CIRCLE)
							.should('have.css', 'border', CHANGING_COLOR)
					})
			})

		cy.tick(500);

		// check circles array after deleting second element from the head
		cy.get(CIRCLE_CONTENT)
			.each((item, index) => {
				if (index === 0)
					cy.wrap(item).within(() => {
						cy.get(CIRCLE_CIRCLE).should('have.value', '')
						cy.get(CIRCLE_INDEX).contains(`${index}`)
						cy.get(CIRCLE_HEAD).should('be.empty')
						cy.get(CIRCLE_TAIL).should('be.empty')
					})
				if (index === 1)
					cy.wrap(item).within(() => {
						cy.get(CIRCLE_CIRCLE)
							.should('have.value', '')
							.should('have.css', 'border', DEFAULT_COLOR)
						cy.get(CIRCLE_INDEX).contains(`${index}`)
						cy.get(CIRCLE_HEAD).should('be.empty')
						cy.get(CIRCLE_TAIL).should('be.empty')
					})
				if (index === 2)
					cy.wrap(item).within(() => {
						cy.get(CIRCLE_CIRCLE).contains('3')
						cy.get(CIRCLE_INDEX).contains(`${index}`)
						cy.get(CIRCLE_HEAD).contains('head')
						cy.get(CIRCLE_TAIL).contains('tail');
					})
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

		// check circles array through deleting second element from the head
		cy.get(CIRCLE_CONTENT)
			.each((item, index) => {
				if (index === 2)
					cy.wrap(item).within(() => {
						cy.get(CIRCLE_CIRCLE).should('have.css', 'border', CHANGING_COLOR)
					})
			})

		cy.tick(500);

		// check circles array after deleting the last element
		cy.get(CIRCLE_CONTENT)
			.children().should('be.empty')

		cy.get(CIRCLE_TAIL).should('be.empty');
		cy.get(CIRCLE_HEAD).should('be.empty');

		cy.get(BUTTON_LOADER).should('not.exist');

		cy.get(INPUT).should('be.enabled');
	});

	it('clear element button should deleting all queue elements at one time', () => {
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

		cy.get('@clearButton').click();

		cy.get(BUTTON_LOADER).should('be.exist');

		cy.get('@addButton').should('be.disabled');
		cy.get('@delButton').should('be.disabled');

		cy.get(INPUT).should('be.disabled');

		cy.tick(500);

		// check circles array after deleting the last element
		cy.get(CIRCLE_CONTENT)
			.children().should('be.empty')

		cy.get(CIRCLE_TAIL).should('be.empty');
		cy.get(CIRCLE_HEAD).should('be.empty');

		cy.get(BUTTON_LOADER).should('not.exist');

		cy.get(INPUT).should('be.enabled');
	});
})

export {}