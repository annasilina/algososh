/// <reference types="cypress" />

describe('stack pages', () => {
	beforeEach(() => {
		cy.visit('/stack');
		cy.get('[id="add-elem-btn"]').as('addButton');
		cy.get('[id="del-elem-btn"]').as('delButton');
		cy.get('[id="clear-stack-btn"]').as('clearButton');
	})

	// it('add element button should be switch disabled state correctly depends on input value', () => {
	// 	cy.get('input').should('have.value', '');
	// 	cy.get('[id="add-elem-btn"]').should('be.disabled')
	//
	// 	cy.get('input').type('1')
	// 	cy.get('[id="add-elem-btn"]').should('be.enabled')
	// });

	//
	// it('add element button should adding elements one by one', () => {
	// 	cy.get('input').type('t').should('have.value', 't');
	// 	cy.get('[id="add-elem-btn"]').click();
	//
	// });

	// it('del element button should deleting one by one element from the top', () => {
	// 	cy.get('input').type('1').should('have.value', '1');
	// 	cy.get('[id="add-elem-btn"]').click();
	//
	// 	cy.get('input').type('2').should('have.value', '2');
	// 	cy.get('[id="add-elem-btn"]').click();
	//
	// 	cy.get('input').type('3').should('have.value', '3');
	// 	cy.get('[id="add-elem-btn"]').click();
	// 	cy.get('ul#circles').as('circles');
	//
	// 	cy.get('[class^=circle_circle]')
	// 		.should('have.length', 3)
	// 		.each((item, index) => {
	// 		if (index === 0) cy.wrap(item).contains('1');
	// 		if (index === 1) cy.wrap(item).contains('2');
	// 		if (index === 2) cy.wrap(item).contains('3').wrap({index: index, head: 'top'});
	// 	});
	//
	// 	cy.get('[id="del-elem-btn"]').click()
	// 		.get('[class^=circle_circle]')
	// 		.last().should('have.css', 'border', '4px solid rgb(210, 82, 225)');
	//
	// 	cy.get('[class^=circle_circle]')
	// 		.should('have.length', 2)
	// 		.each((item, index) => {
	// 			if (index === 0) cy.wrap(item).contains('1').wrap({index: index});
	// 			if (index === 1) cy.wrap(item).contains('2').wrap({index: index, head: 'top'});
	// 		});
	//
	// 	cy.get('[id="del-elem-btn"]').click()
	// 		.get('[class^=circle_circle]')
	// 		.last().should('have.css', 'border', '4px solid rgb(210, 82, 225)');
	//
	// 	cy.get('[class^=circle_circle]')
	// 		.should('have.length', 1)
	// 		.each((item, index) => {
	// 			if (index === 0) cy.wrap(item).contains('1').wrap({index: index, head: 'top'});
	// 		});
	//
	// 	cy.get('[id="del-elem-btn"]').click()
	// 		.get('[class^=circle_circle]')
	// 		.last().should('have.css', 'border', '4px solid rgb(210, 82, 225)');
	//
	// 	cy.get('[class^=circle_circle]')
	// 		.should('have.length', 0);
	// });

	it('clear stack button should clear stack', () => {
		cy.get('input').type('1').should('have.value', '1');
		cy.get('@addButton').click();

		cy.get('input').type('2').should('have.value', '2');
		cy.get('@addButton').click();

		cy.get('input').type('3').should('have.value', '3');
		cy.get('@addButton').click();

		cy.get('@clearButton').click();

		cy.get('[class^=circle_circle]').should('have.length', 0);
	});
});

export {}