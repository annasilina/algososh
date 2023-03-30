/// <reference types="cypress" />

describe('stack pages', () => {
	beforeEach(() => {
		cy.visit('/stack');
		cy.clock()
		cy.get('[id="add-elem-btn"]').as('addButton');
		cy.get('[id="del-elem-btn"]').as('delButton');
		cy.get('[id="clear-stack-btn"]').as('clearButton');
	})

	it('add element button should be switch disabled state correctly depends on input value', () => {
		cy.get('input').should('have.value', '');
		cy.get('@addButton').should('be.disabled')

		cy.get('input').type('1')
		cy.get('@addButton').should('be.enabled')
	});

	it('add element button should adding elements one by one to the top', () => {
		// adding first element
		cy.get('input').type('1').should('have.value', '1');
		cy.get('@addButton').click().wrap({isLoader: true});

		// make alias for circles array
		cy.get('[class^=circle_circle]').as('circles');

		// checking circles array through adding element
		cy
			.get('@circles')
			.should('have.length', 1)
			.last()
			.should('have.css', 'border', '4px solid rgb(210, 82, 225)')
			.contains('1')
			.wrap({index: 0, head: 'top'});

		cy.tick(500);

		// checking circles array after element was added
		cy
			.get('@circles')
			.should('have.length', 1)
			.last()
			.should('have.css', 'border', '4px solid rgb(0, 50, 255)')
			.contains('1')
			.wrap({index: 0, head: 'top'});

		cy.get('@addButton').wrap({isLoader: false});

		// adding second element
		cy.get('input').type('2').should('have.value', '2');
		cy.get('@addButton').click().wrap({isLoader: true});

		// checking circles array through adding element
		cy
			.get('@circles')
			.should('have.length', 2)
			.last()
			.should('have.css', 'border', '4px solid rgb(210, 82, 225)')
			.contains('2')
			.wrap({index: 1, head: 'top'});

		cy.tick(500);

		// checking circles array after element was added
		cy
			.get('@circles')
			.should('have.length', 2)
			.last()
			.should('have.css', 'border', '4px solid rgb(0, 50, 255)')
			.contains('2')
			.wrap({index: 1, head: 'top'});

		cy.get('@addButton').wrap({isLoader: false});

		// adding third element
		cy.get('input').type('3').should('have.value', '3');
		cy.get('@addButton').click().wrap({isLoader: true});

		// checking circles array through adding element
		cy
			.get('@circles')
			.should('have.length', 3)
			.last()
			.should('have.css', 'border', '4px solid rgb(210, 82, 225)')
			.contains('3')
			.wrap({index: 2, head: 'top'});

		cy.tick(500);

		// checking circles array after element was added
		cy
			.get('@circles')
			.should('have.length', 3)
			.last()
			.should('have.css', 'border', '4px solid rgb(0, 50, 255)')
			.contains('3')
			.wrap({index: 2, head: 'top'});

		cy.get('@addButton').wrap({isLoader: false});
	});

	it('del element button should deleting one by one element from the top', () => {
		// adding elements in stack
		cy.get('input').type('1').should('have.value', '1');
		cy.get('@addButton').click().wrap({isLoader: true});

		cy.tick(500);
		cy.get('@addButton').wrap({isLoader: false});

		cy.get('input').type('2').should('have.value', '2');
		cy.get('@addButton').click().wrap({isLoader: true});

		cy.tick(500);
		cy.get('@addButton').wrap({isLoader: false});

		cy.get('input').type('3').should('have.value', '3');
		cy.get('@addButton').click().wrap({isLoader: true});

		cy.tick(500);
		cy.get('@addButton').wrap({isLoader: false});

		// make alias for circles array
		cy.get('[class^=circle_circle]').as('circles');

		// check circles array before deleting
		cy.get('@circles')
			.should('have.length', 3)
			.each((item, index) => {
				if (index === 0) cy.wrap(item).contains('1');
				if (index === 1) cy.wrap(item).contains('2');
				if (index === 2) cy.wrap(item).contains('3').wrap({index: index, head: 'top'});
			});

		// second step - deleting elements from stack
		// add modified state for element, that should be deleted
		cy.get('@delButton').click()
			.get('@circles')
			.last().should('have.css', 'border', '4px solid rgb(210, 82, 225)');

		cy.tick(500);

		// check circles array after deleting element from top
		cy.get('@circles')
			.should('have.length', 2)
			.each((item, index) => {
				if (index === 0) cy.wrap(item).contains('1').wrap({index: index});
				if (index === 1) cy.wrap(item).contains('2').wrap({index: index, head: 'top'});
			});

		// add modified state for element, that should be deleted
		cy.get('@delButton').click()
			.get('@circles')
			.last().should('have.css', 'border', '4px solid rgb(210, 82, 225)');

		cy.tick(500);

		// check circles array after deleting element from top
		cy.get('@circles')
			.should('have.length', 1)
			.each((item, index) => {
				if (index === 0) cy.wrap(item).contains('1').wrap({index: index, head: 'top'});
			});

		// add modified state for element, that should be deleted
		cy.get('@delButton').click()
			.get('@circles')
			.last().should('have.css', 'border', '4px solid rgb(210, 82, 225)');

		cy.tick(500);

		// check circles array after deleting the last element
		cy.get('@circles')
			.should('have.length', 0);
	});

	it('clear stack button should clear all stack in one time', () => {
		cy.get('input').type('1').should('have.value', '1');
		cy.get('@addButton').click().wrap({isLoader: true});

		cy.tick(500);
		cy.get('@addButton').wrap({isLoader: false});

		cy.get('input').type('2').should('have.value', '2');
		cy.get('@addButton').click().wrap({isLoader: true});

		cy.tick(500);
		cy.get('@addButton').wrap({isLoader: false});

		cy.get('input').type('3').should('have.value', '3');
		cy.get('@addButton').click().wrap({isLoader: true});

		cy.tick(500);
		cy.get('@addButton').wrap({isLoader: false});

		cy.get('@clearButton').click().wrap({isLoader: true});

		cy.tick(500);
		cy.get('[class^=circle_circle]').should('have.length', 0);

		cy.get('@clearButton').wrap({isLoader: false});
	});
});

export {}