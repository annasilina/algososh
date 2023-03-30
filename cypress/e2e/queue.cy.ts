/// <reference types="cypress" />

describe('queue page', () => {
	beforeEach(() => {
		cy.visit('/queue');
		cy.clock()
		cy.get('[id="add-btn"]').as('addButton');
		cy.get('[id="delete-btn"]').as('delButton');
		cy.get('[id="clear-btn"]').as('clearButton');
		cy.get('[class^=circle_circle]').as('circles');
	});

	// it('add element button should be switch disabled state correctly depends on input value', () => {
	// 	cy.get('input').should('have.value', '');
	// 	cy.get('@addButton').should('be.disabled')
	//
	// 	cy.get('input').type('1')
	// 	cy.get('@addButton').should('be.enabled')
	// });
	//

	it('add element button should adding elements one by one to the tail', () => {
		// adding first element
		cy.get('input').type('1').should('have.value', '1');
		cy.get('@addButton').click().wrap({isLoader: true});

		// checking circles array through adding element
		cy
			.get('@circles').each((item, index) => {
			if (index === 0) cy.wrap(item).should('have.css', 'border', '4px solid rgb(210, 82, 225)')
				.wrap({index: 0, head: 'head', tail: 'tail'});
		})

		cy.tick(500);

		// checking circles array after element was added
		cy
			.get('@circles').each((item, index) => {
			if (index === 0) cy.wrap(item).should('have.css', 'border', '4px solid rgb(0, 50, 255)')
				.contains('1')
				.wrap({index: 0, head: 'head', tail: 'tail'});
		})

		cy.get('@addButton').wrap({isLoader: false});

		// adding second element
		cy.get('input').type('2').should('have.value', '2');
		cy.get('@addButton').click().wrap({isLoader: true});

		// checking circles array through adding element
		cy
			.get('@circles').each((item, index) => {
			if (index === 0) cy.wrap(item).should('have.css', 'border', '4px solid rgb(0, 50, 255)')
				.contains('1')
				.wrap({index: 0, head: 'head'});
			if (index === 1) cy.wrap(item).should('have.css', 'border', '4px solid rgb(210, 82, 225)')
				.wrap({index: 1, tail: 'tail'});
		})

		cy.tick(500);

		// checking circles array after element was added
		cy
			.get('@circles').each((item, index) => {
			if (index === 0) cy.wrap(item).should('have.css', 'border', '4px solid rgb(0, 50, 255)')
				.contains('1')
				.wrap({index: 0, tail: 'tail'});
			if (index === 1) cy.wrap(item).should('have.css', 'border', '4px solid rgb(0, 50, 255)')
				.contains('2')
				.wrap({index: 1, tail: 'tail'});
		})

		cy.get('@addButton').wrap({isLoader: false});

		// cy.tick(500);
		//
		// // checking circles array after element was added
		// cy
		// 	.get('@circles')
		// 	.should('have.length', 2)
		// 	.last()
		// 	.should('have.css', 'border', '4px solid rgb(0, 50, 255)')
		// 	.contains('2')
		// 	.wrap({index: 1, head: 'top'});
		//
		// cy.get('@addButton').wrap({isLoader: false});
		//
		// // adding third element
		// cy.get('input').type('3').should('have.value', '3');
		// cy.get('@addButton').click().wrap({isLoader: true});
		//
		// // checking circles array through adding element
		// cy
		// 	.get('@circles')
		// 	.should('have.length', 3)
		// 	.last()
		// 	.should('have.css', 'border', '4px solid rgb(210, 82, 225)')
		// 	.contains('3')
		// 	.wrap({index: 2, head: 'top'});
		//
		// cy.tick(500);
		//
		// // checking circles array after element was added
		// cy
		// 	.get('@circles')
		// 	.should('have.length', 3)
		// 	.last()
		// 	.should('have.css', 'border', '4px solid rgb(0, 50, 255)')
		// 	.contains('3')
		// 	.wrap({index: 2, head: 'top'});
		//
		// cy.get('@addButton').wrap({isLoader: false});
	});

})

export {}