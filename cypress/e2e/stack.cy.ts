/// <reference types="cypress" />

describe('stack page', () => {
	beforeEach(() => {
		cy.visit('/stack');
		cy.clock();
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

		cy.get('@addButton').click();
		cy.get('[class^=button_loader]').should('be.exist');

		cy.get('@delButton').should('be.disabled');
		cy.get('@clearButton').should('be.disabled');

		cy.get('input').should('be.disabled');

		// make alias for circles array
		cy.get('[class^=circle_circle]').as('circles');
		cy.get('[class*=circle_index]').as('circle_index');
		cy.get('[class*=circle_head]').as('circle_head');

		// checking circles array through adding first element
		cy
			.get('@circles')
			.should('have.length', 1)
			.last()
			.should('have.css', 'border', '4px solid rgb(210, 82, 225)')
			.contains('1')
			.get('@circle_index').contains('0')
			.get('@circle_head').contains('top');

		cy.tick(500);

		// checking circles array after first element was added
		cy
			.get('@circles')
			.should('have.length', 1)
			.last()
			.should('have.css', 'border', '4px solid rgb(0, 50, 255)')
			.contains('1')
			.get('@circle_index').contains('0')
			.get('@circle_head').contains('top');

		cy.get('[class^=button_loader]').should('not.exist');

		cy.get('@delButton').should('be.enabled');
		cy.get('@clearButton').should('be.enabled');

		cy.get('input').should('be.enabled');

		// adding second element
		cy.get('input').type('2').should('have.value', '2');

		cy.get('@addButton').click();
		cy.get('[class^=button_loader]').should('be.exist');
		cy.get('@delButton').should('be.disabled');
		cy.get('@clearButton').should('be.disabled');

		cy.get('input').should('be.disabled');

		// checking circles array through adding second element
		cy
			.get('@circles')
			.should('have.length', 2)
			.last()
			.should('have.css', 'border', '4px solid rgb(210, 82, 225)')
			.contains('2')
			.get('@circle_index').contains('1')
			.get('@circle_head').contains('top');

		cy.tick(500);

		// checking circles array after second element was added
		cy
			.get('@circles')
			.should('have.length', 2)
			.last()
			.should('have.css', 'border', '4px solid rgb(0, 50, 255)')
			.contains('2')
			.get('@circle_index').contains('1')
			.get('@circle_head').contains('top');

		cy.get('[class^=button_loader]').should('not.exist');

		cy.get('@delButton').should('be.enabled');
		cy.get('@clearButton').should('be.enabled');

		cy.get('input').should('be.enabled');

		// adding third element
		cy.get('input').type('3').should('have.value', '3');

		cy.get('@addButton').click();
		cy.get('[class^=button_loader]').should('be.exist');

		cy.get('@delButton').should('be.disabled');
		cy.get('@clearButton').should('be.disabled');

		cy.get('input').should('be.disabled');

		// checking circles array through adding third element
		cy
			.get('@circles')
			.should('have.length', 3)
			.last()
			.should('have.css', 'border', '4px solid rgb(210, 82, 225)')
			.contains('3')
			.get('@circle_index').contains('2')
			.get('@circle_head').contains('top');


		cy.tick(500);

		// checking circles array after third element was added
		cy
			.get('@circles')
			.should('have.length', 3)
			.last()
			.should('have.css', 'border', '4px solid rgb(0, 50, 255)')
			.contains('3')
			.get('@circle_index').contains('2')
			.get('@circle_head').contains('top');


		cy.get('[class^=button_loader]').should('not.exist');

		cy.get('@delButton').should('be.enabled');
		cy.get('@clearButton').should('be.enabled');

		cy.get('input').should('be.enabled');
	});

	it('del element button should deleting one by one element from the top', () => {
		// adding elements in stack
		cy.get('input').type('1').should('have.value', '1');
		cy.get('@addButton').click();

		cy.tick(500);

		cy.get('input').type('2').should('have.value', '2');
		cy.get('@addButton').click();

		cy.tick(500);

		cy.get('input').type('3').should('have.value', '3');
		cy.get('@addButton').click()

		cy.tick(500);

		// make alias for circles array
		cy.get('[class^=circle_circle]').as('circles');
		cy.get('[class*=circle_index]').as('circle_index');
		cy.get('[class*=circle_head]').as('circle_head');

		// check circles array before deleting
		cy.get('@circles')
			.should('have.length', 3)
			.each((item, index) => {
				if (index === 0) cy.wrap(item).contains('1').get('@circle_index').contains(`${index}`);
				if (index === 1) cy.wrap(item).contains('2').get('@circle_index').contains(`${index}`);
				if (index === 2)
					cy.wrap(item).contains('3')
						.get('@circle_index').contains(`${index}`)
						.get('@circle_head').contains('top');
			});

		// second step - deleting elements from stack
		// delete first element from the top
		cy.get('@delButton').click()

		cy.get('[class^=button_loader]').should('be.exist');

		cy.get('@addButton').should('be.disabled');
		cy.get('@clearButton').should('be.disabled');

		cy.get('input').should('be.disabled');

		// checking circles array through deleting first element from the top
		cy.get('@circles')
			.last().should('have.css', 'border', '4px solid rgb(210, 82, 225)');

		cy.tick(500);

		// check circles array after first element was deleted
		cy.get('@circles')
			.should('have.length', 2)
			.each((item, index) => {
				if (index === 0) cy.wrap(item).contains('1').wrap({ index: index });
				if (index === 1)
					cy.wrap(item).contains('2')
						.get('@circle_index').contains(`${index}`)
						.get('@circle_head').contains('top');
			});

		cy.get('[class^=button_loader]').should('not.exist');

		cy.get('@clearButton').should('be.enabled');

		cy.get('input').should('be.enabled');

		// delete second element
		cy.get('@delButton').click();

		cy.get('[class^=button_loader]').should('be.exist');

		cy.get('@addButton').should('be.disabled');
		cy.get('@clearButton').should('be.disabled');

		cy.get('input').should('be.disabled');

		// checking circles array through deleting second element from the top
		cy.get('@circles')
			.last().should('have.css', 'border', '4px solid rgb(210, 82, 225)');

		cy.tick(500);

		// check circles array after second element was deleted
		cy.get('@circles')
			.should('have.length', 1)
			.each((item, index) => {
				if (index === 0)
					cy.wrap(item).contains('1')
						.get('@circle_index').contains(`${index}`)
						.get('@circle_head').contains('top');
			});

		cy.get('[class^=button_loader]').should('not.exist');

		cy.get('@clearButton').should('be.enabled');

		cy.get('input').should('be.enabled');

		// delete third element
		cy.get('@delButton').click();

		cy.get('[class^=button_loader]').should('be.exist');

		cy.get('@addButton').should('be.disabled');
		cy.get('@clearButton').should('be.disabled');

		cy.get('input').should('be.disabled');

		// checking circles array through deleting second element from the top
		cy.get('@circles')
			.last().should('have.css', 'border', '4px solid rgb(210, 82, 225)');

		cy.tick(500);

		// checking circles array after third element was deleted
		cy.get('@circles')
			.should('have.length', 0);

		cy.get('[class^=button_loader]').should('not.exist');

		cy.get('input').should('be.enabled');
	});

	it('clear stack button should clear all stack elements at one time', () => {
		cy.get('input').type('1').should('have.value', '1');
		cy.get('@addButton').click();

		cy.tick(500);

		cy.get('input').type('2').should('have.value', '2');
		cy.get('@addButton').click();

		cy.tick(500);

		cy.get('input').type('3').should('have.value', '3');
		cy.get('@addButton').click();

		cy.tick(500);

		cy.get('@clearButton').click();

		cy.get('[class^=button_loader]').should('be.exist');

		cy.get('@addButton').should('be.disabled');
		cy.get('@delButton').should('be.disabled');

		cy.get('input').should('be.disabled');

		cy.tick(500);

		cy.get('[class^=circle_circle]').should('have.length', 0);

		cy.get('[class^=button_loader]').should('not.exist');

		cy.get('@addButton').should('be.disabled');
		cy.get('@delButton').should('be.disabled');
		cy.get('@clearButton').should('be.disabled');

		cy.get('input').should('be.enabled');
	});
});

export {}