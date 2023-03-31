/// <reference types="cypress" />

describe('linked list page', () => {
	beforeEach(() => {
		cy.visit('/list');
		cy.clock();

		cy.get('[id="element-input"]').as('elemInput');
		cy.get('[id="add-head-btn"]').as('addHeadBtn');
		cy.get('[id="del-head-btn"]').as('delHeadBtn');
		cy.get('[id="add-tail-btn"]').as('addTailBtn');
		cy.get('[id="del-tail-btn"]').as('delTailBtn');

		cy.get('[id="index-input"]').as('indInput');
		cy.get('[id="add-index-btn"]').as('addIndBtn');
		cy.get('[id="del-index-btn"]').as('delIndBtn');

		// cy.get('[class^=circle_circle]').as('circles');
		// cy.get('[class*=circle_index]').as('circle_index');
		// cy.get('[class*=circle_head]').as('circle_head');
		// cy.get('[class*=circle_tail]').as('circle_tail');
	});

	// it('add element button should be switch disabled state correctly depends on element input value', () => {
	// 	cy.get('input').each((item) => {
	// 		cy.wrap(item).should('have.value', '');
	// 	})
	// 	cy.get('@addHeadBtn').should('be.disabled');
	// 	cy.get('@addTailBtn').should('be.disabled');
	// 	cy.get('@addIndBtn').should('be.disabled');
	// 	cy.get('@delIndBtn').should('be.disabled');
	//
	// 	cy.get('input').each((item) => {
	// 		cy.wrap(item).type('1').should('have.value', '1');
	// 	})
	// 	cy.get('@addHeadBtn').should('be.enabled');
	// 	cy.get('@addTailBtn').should('be.enabled');
	// 	cy.get('@addIndBtn').should('be.enabled');
	// 	cy.get('@delIndBtn').should('be.enabled');
	// });

	// it('default list should be rendered correctly', () => {
	// 	cy
	// 		.get('@circles').each((item, index) => {
	// 		if (index === 0)
	// 			cy
	// 				.wrap(item).should('have.css', 'border', '4px solid rgb(0, 50, 255)')
	// 				.contains('0')
	// 				.get('@circle_index').contains(`${index}`)
	// 				.get('@circle_head').contains('head')
	// 				.get('@circle_tail').should('be.empty')
	// 		if (index === 1)
	// 			cy
	// 				.wrap(item).should('have.css', 'border', '4px solid rgb(0, 50, 255)')
	// 				.contains('34')
	// 				.get('@circle_index').contains(`${index}`)
	// 				.get('@circle_head').should('be.empty')
	// 				.get('@circle_tail').should('be.empty')
	// 		if (index === 2)
	// 			cy
	// 				.wrap(item).should('have.css', 'border', '4px solid rgb(0, 50, 255)')
	// 				.contains('8')
	// 				.get('@circle_index').contains(`${index}`)
	// 				.get('@circle_head').should('be.empty')
	// 				.get('@circle_tail').should('be.empty')
	// 		if (index === 3)
	// 			cy
	// 				.wrap(item).should('have.css', 'border', '4px solid rgb(0, 50, 255)')
	// 				.contains('1')
	// 				.get('@circle_index').contains(`${index}`)
	// 				.get('@circle_head').should('be.empty')
	// 				.get('@circle_tail').contains('tail')
	// 	})
	// })
})

export {}