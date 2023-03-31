/// <reference types="cypress" />

describe('queue page', () => {
	beforeEach(() => {
		cy.visit('/queue');
		cy.clock();
		cy.get('[id="add-btn"]').as('addButton');
		cy.get('[id="delete-btn"]').as('delButton');
		cy.get('[id="clear-btn"]').as('clearButton');
		cy.get('[class^=circle_circle]').as('circles');
		cy.get('[class*=circle_index]').as('circle_index');
		cy.get('[class*=circle_head]').as('circle_head');
		cy.get('[class*=circle_tail]').as('circle_tail');
	});

	it('add element button should be switch disabled state correctly depends on input value', () => {
		cy.get('input').should('have.value', '');
		cy.get('@addButton').should('be.disabled')

		cy.get('input').type('1')
		cy.get('@addButton').should('be.enabled')
	});


	it('add element button should adding elements one by one to the tail', () => {
		// adding first element
		cy.get('input').type('1').should('have.value', '1');
		cy.get('@addButton').click()

		cy.get('[class^=button_loader]').should('be.exist');

		cy.get('@delButton').should('be.disabled');
		cy.get('@clearButton').should('be.disabled');

		cy.get('input').should('be.disabled');

		// checking circles array through adding first element
		cy
			.get('@circles').each((item, index) => {
			if (index === 0)
				cy
					.wrap(item).should('have.css', 'border', '4px solid rgb(210, 82, 225)')
					.children().should('be.empty')
					.within(() => {
						cy.get('@circle_index').contains('0')
						cy.get('@circle_head').contains('head')
						cy.get('@circle_tail').contains('tail');
					});
		})

		cy.tick(500);

		// checking circles array after first element was added
		cy
			.get('@circles').each((item, index) => {
			if (index === 0)
				cy
					.wrap(item).should('have.css', 'border', '4px solid rgb(0, 50, 255)')
					.contains('1')
					.within(() => {
						cy.get('@circle_index').contains('0')
						cy.get('@circle_head').contains('head')
						cy.get('@circle_tail').contains('tail');
					});
		})

		cy.get('[class^=button_loader]').should('not.exist');

		cy.get('@delButton').should('be.enabled');
		cy.get('@clearButton').should('be.enabled');

		cy.get('input').should('be.enabled');

		// adding second element
		cy.get('input').type('2').should('have.value', '2');
		cy.get('@addButton').click()

		cy.get('[class^=button_loader]').should('be.exist');

		cy.get('@delButton').should('be.disabled');
		cy.get('@clearButton').should('be.disabled');

		cy.get('input').should('be.disabled');

		// checking circles array through adding second element
		cy
			.get('@circles').each((item, index) => {
			if (index === 0)
				cy
					.wrap(item).should('have.css', 'border', '4px solid rgb(0, 50, 255)')
					.contains('1')
					.within(() => {
						cy.get('@circle_index').contains('0')
						cy.get('@circle_head').contains('head')
						cy.get('@circle_tail').should('be.empty')
					})
			if (index === 1)
				cy
					.wrap(item).should('have.css', 'border', '4px solid rgb(210, 82, 225)')
					.children().should('be.empty')
					.within(() => {
						cy.get('@circle_index').contains('1')
						cy.get('@circle_head').should('be.empty')
						cy.get('@circle_tail').contains('tail');
					})
		})
		cy.tick(500);

		// checking circles array after second element was added
		cy
			.get('@circles').each((item, index) => {
			if (index === 0)
				cy
					.wrap(item).should('have.css', 'border', '4px solid rgb(0, 50, 255)')
					.contains('1')
					.within(() => {
						cy.get('@circle_index').contains('0')
						cy.get('@circle_head').contains('head')
						cy.get('@circle_tail').should('be.empty')
					})
			if (index === 1)
				cy
					.wrap(item).should('have.css', 'border', '4px solid rgb(0, 50, 255)')
					.contains('2')
					.within(() => {
						cy.get('@circle_index').contains('1')
						cy.get('@circle_head').should('be.empty')
						cy.get('@circle_tail').contains('tail');
					})
		})

		cy.get('[class^=button_loader]').should('not.exist');

		cy.get('@delButton').should('be.enabled');
		cy.get('@clearButton').should('be.enabled');

		cy.get('input').should('be.enabled');

		//add third element
		cy.get('input').type('3').should('have.value', '3');
		cy.get('@addButton').click()

		cy.get('[class^=button_loader]').should('be.exist');

		cy.get('@delButton').should('be.disabled');
		cy.get('@clearButton').should('be.disabled');

		cy.get('input').should('be.disabled');

		// checking circles array through adding second element
		cy
			.get('@circles').each((item, index) => {
			if (index === 0)
				cy
					.wrap(item).should('have.css', 'border', '4px solid rgb(0, 50, 255)')
					.contains('1')
					.within(() => {
						cy.get('@circle_index').contains('0')
						cy.get('@circle_head').contains('head')
						cy.get('@circle_tail').should('be.empty')
					});
			if (index === 1)
				cy
					.wrap(item).should('have.css', 'border', '4px solid rgb(0, 50, 255)')
					.contains('2')
					.within(() => {
						cy.get('@circle_index').contains('1')
						cy.get('@circle_head').should('be.empty')
						cy.get('@circle_tail').should('be.empty')
					});
			if (index === 2)
				cy
					.wrap(item).should('have.css', 'border', '4px solid rgb(210, 82, 225)')
					.children().should('be.empty')
					.within(() => {
						cy.get('@circle_index').contains('2')
						cy.get('@circle_head').should('be.empty')
						cy.get('@circle_tail').contains('tail');
					});
		})

		cy.tick(500);

		// checking circles array after second element was added
		cy
			.get('@circles').each((item, index) => {
			if (index === 0)
				cy
					.wrap(item).should('have.css', 'border', '4px solid rgb(0, 50, 255)')
					.contains('1')
					.within(() => {
						cy.get('@circle_index').contains('0')
						cy.get('@circle_head').contains('head')
						cy.get('@circle_tail').should('be.empty')
					});
			if (index === 1)
				cy
					.wrap(item).should('have.css', 'border', '4px solid rgb(0, 50, 255)')
					.contains('2')
					.within(() => {
						cy.get('@circle_index').contains('1')
						cy.get('@circle_head').should('be.empty')
						cy.get('@circle_tail').should('be.empty')
					});
			if (index === 2)
				cy
					.wrap(item).should('have.css', 'border', '4px solid rgb(0, 50, 255)')
					.contains('3')
					.within(() => {
						cy.get('@circle_index').contains('2')
						cy.get('@circle_head').should('be.empty')
						cy.get('@circle_tail').contains('tail');
					});
		})

		cy.get('[class^=button_loader]').should('not.exist');

		cy.get('@delButton').should('be.enabled');
		cy.get('@clearButton').should('be.enabled');

		cy.get('input').should('be.enabled');
	});

	it('del element button should deleting one by one element from the head', () => {
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

		// check circles array before deleting
		cy.get('@circles')
			.each((item, index) => {
				if (index === 0)
					cy
						.wrap(item).contains('1')
						.within(() => {
							cy.get('@circle_index').contains(`${index}`)
							cy.get('@circle_head').contains('head')
							cy.get('@circle_tail').should('be.empty')
						})
				if (index === 1)
					cy
						.wrap(item)
						.contains('2')
						.within(() => {
							cy.get('@circle_index').contains(`${index}`)
							cy.get('@circle_head').should('be.empty')
							cy.get('@circle_tail').should('be.empty')
						})
				if (index === 2)
					cy
						.wrap(item).contains('3')
						.within(() => {
							cy.get('@circle_index').contains(`${index}`)
							cy.get('@circle_head').should('be.empty')
							cy.get('@circle_tail').contains('tail')
						})
			});

		// second step - deleting elements from queue
		// delete first element
		cy.get('@delButton').click()

		cy.get('[class^=button_loader]').should('be.exist');

		cy.get('@addButton').should('be.disabled');
		cy.get('@clearButton').should('be.disabled');

		cy.get('input').should('be.disabled');

		// check circles array through deleting first element from head
		cy.get('@circles')
			.each((item, index) => {
				if (index === 0)
					cy.wrap(item).should('have.css', 'border', '4px solid rgb(210, 82, 225)')
			})

		cy.tick(500);

		// check circles array after first element was deleted from the head
		cy.get('@circles')
			.each((item, index) => {
				if (index === 0)
					cy
						.wrap(item).should('have.css', 'border', '4px solid rgb(0, 50, 255)')
						.children().should('be.empty')
						.within(() => {
							cy.get('@circle_index').contains(`${index}`)
							cy.get('@circle_head').should('be.empty')
							cy.get('@circle_tail').should('be.empty')
						})
				if (index === 1)
					cy
						.wrap(item)
						.contains('2')
						.within(() => {
							cy.get('@circle_index').contains(`${index}`)
							cy.get('@circle_head').contains('head')
							cy.get('@circle_tail').should('be.empty')
						})
				if (index === 2)
					cy
						.wrap(item).contains('3')
						.within(() => {
							cy.get('@circle_index').contains(`${index}`)
							cy.get('@circle_head').should('be.empty')
							cy.get('@circle_tail').contains('tail');
						});
			});

		cy.get('[class^=button_loader]').should('not.exist');

		cy.get('@clearButton').should('be.enabled');

		cy.get('input').should('be.enabled');

		// delete second element from the head
		cy.get('@delButton').click();

		cy.get('[class^=button_loader]').should('be.exist');

		cy.get('@addButton').should('be.disabled');
		cy.get('@clearButton').should('be.disabled');

		cy.get('input').should('be.disabled');

		// check circles array through deleting second element from the head
		cy.get('@circles')
			.each((item, index) => {
				if (index === 1)
					cy.wrap(item).should('have.css', 'border', '4px solid rgb(210, 82, 225)')
			})

		cy.tick(500);

		// check circles array after deleting second element from the head
		cy.get('@circles')
			.each((item, index) => {
				if (index === 0)
					cy
						.wrap(item)
						.children().should('be.empty')
						.within(() => {
							cy.get('@circle_index').contains(`${index}`)
							cy.get('@circle_head').should('be.empty')
							cy.get('@circle_tail').should('be.empty')
						})
				if (index === 1)
					cy
						.wrap(item).should('have.css', 'border', '4px solid rgb(0, 50, 255)')
						.children().should('be.empty')
						.within(() => {
							cy.get('@circle_index').contains(`${index}`)
							cy.get('@circle_head').should('be.empty')
							cy.get('@circle_tail').should('be.empty')
						})
				if (index === 2)
					cy
						.wrap(item).contains('3')
						.within(() => {
							cy.get('@circle_index').contains(`${index}`)
							cy.get('@circle_head').contains('head')
							cy.get('@circle_tail').contains('tail');
						})
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

		// check circles array through deleting second element from the head
		cy.get('@circles')
			.each((item, index) => {
				if (index === 2)
					cy.wrap(item).should('have.css', 'border', '4px solid rgb(210, 82, 225)')
			})

		cy.tick(500);

		// check circles array after deleting the last element
		cy.get('@circles')
			.children().should('be.empty')

		cy.get('@circle_tail').should('be.empty');
		cy.get('@circle_head').should('be.empty');

		cy.get('[class^=button_loader]').should('not.exist');

		cy.get('input').should('be.enabled');
	});

	it('clear element button should deleting all queue elements at one time', () => {
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

		cy.get('@clearButton').click();

		cy.get('[class^=button_loader]').should('be.exist');

		cy.get('@addButton').should('be.disabled');
		cy.get('@delButton').should('be.disabled');

		cy.get('input').should('be.disabled');

		cy.tick(500);

		// check circles array after deleting the last element
		cy.get('@circles')
			.children().should('be.empty')

		cy.get('@circle_tail').should('be.empty');
		cy.get('@circle_head').should('be.empty');

		cy.get('[class^=button_loader]').should('not.exist');

		cy.get('input').should('be.enabled');
	});
})

export {}