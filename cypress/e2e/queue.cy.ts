/// <reference types="cypress" />

describe('queue page', () => {
	beforeEach(() => {
		cy.visit('/queue');
		cy.clock();
		cy.get('[id="add-btn"]').as('addButton');
		cy.get('[id="delete-btn"]').as('delButton');
		cy.get('[id="clear-btn"]').as('clearButton');
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
			.get('[class^=circle_content]').each((item, index) => {
			if (index === 0)
				cy
					.wrap(item).within(() => {
					cy.get('[class*=circle_circle]').should('have.css', 'border', '4px solid rgb(210, 82, 225)')
					cy.should('have.value', '')
					cy.get('[class*=circle_index]').contains('0')
					cy.get('[class*=circle_head]').contains('head')
					cy.get('[class*=circle_tail]').contains('tail');
				});
		})

		cy.tick(500);

		// checking circles array after first element was added
		cy
			.get('[class^=circle_content]').each((item, index) => {
			if (index === 0)
				cy
					.wrap(item).within(() => {
					cy.get('[class*=circle_circle]').should('have.css', 'border', '4px solid rgb(0, 50, 255)')
					cy.get('[class*=circle_index]').contains('0')
					cy.get('[class*=circle_head]').contains('head')
					cy.get('[class*=circle_tail]').contains('tail');
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
			.get('[class^=circle_content]').each((item, index) => {
			if (index === 0)
				cy
					.wrap(item).within(() => {
					cy.get('[class*=circle_circle]').should('have.css', 'border', '4px solid rgb(0, 50, 255)')
					cy.get('[class*=circle_index]').contains('0')
					cy.get('[class*=circle_head]').contains('head')
					cy.get('[class*=circle_tail]').should('be.empty')
				});
			if (index === 1)
				cy
					.wrap(item).within(() => {
					cy.get('[class*=circle_circle]').should('have.css', 'border', '4px solid rgb(210, 82, 225)')
					cy.get('[class*=circle_index]').contains('1')
					cy.get('[class*=circle_head]').should('be.empty')
					cy.get('[class*=circle_tail]').contains('tail');
				});
		})

		cy.tick(500);

		// checking circles array after second element was added
		cy
			.get('[class^=circle_content]').each((item, index) => {
			if (index === 0)
				cy
					.wrap(item).within(() => {
					cy.get('[class*=circle_circle]').should('have.css', 'border', '4px solid rgb(0, 50, 255)')
					cy.get('[class*=circle_index]').contains('0')
					cy.get('[class*=circle_head]').contains('head')
					cy.get('[class*=circle_tail]').should('be.empty')
				});
			if (index === 1)
				cy
					.wrap(item).within(() => {
					cy.get('[class*=circle_circle]').should('have.css', 'border', '4px solid rgb(0, 50, 255)')
					cy.get('[class*=circle_index]').contains('1')
					cy.get('[class*=circle_head]').should('be.empty')
					cy.get('[class*=circle_tail]').contains('tail');
				});
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
			.get('[class^=circle_content]').each((item, index) => {
			if (index === 0)
				cy
					.wrap(item).within(() => {
					cy.get('[class*=circle_circle]').should('have.css', 'border', '4px solid rgb(0, 50, 255)')
					cy.get('[class*=circle_index]').contains('0')
					cy.get('[class*=circle_head]').contains('head')
					cy.get('[class*=circle_tail]').should('be.empty')
				});
			if (index === 1)
				cy
					.wrap(item).within(() => {
					cy.get('[class*=circle_circle]').should('have.css', 'border', '4px solid rgb(0, 50, 255)')
					cy.get('[class*=circle_index]').contains('1')
					cy.get('[class*=circle_head]').should('be.empty')
					cy.get('[class*=circle_tail]').should('be.empty')
				});
			if (index === 2)
				cy
					.wrap(item).within(() => {
					cy.get('[class*=circle_circle]').should('have.css', 'border', '4px solid rgb(210, 82, 225)')
					cy.get('[class*=circle_index]').contains('2')
					cy.get('[class*=circle_head]').should('be.empty')
					cy.get('[class*=circle_tail]').contains('tail');
				});
		})

		cy.tick(500);

		// checking circles array after second element was added
		cy
			.get('[class^=circle_content]').each((item, index) => {
			if (index === 0)
				cy
					.wrap(item).within(() => {
					cy.get('[class*=circle_circle]').should('have.css', 'border', '4px solid rgb(0, 50, 255)')
					cy.get('[class*=circle_index]').contains('0')
					cy.get('[class*=circle_head]').contains('head')
					cy.get('[class*=circle_tail]').should('be.empty')
				});
			if (index === 1)
				cy
					.wrap(item).within(() => {
					cy.get('[class*=circle_circle]').should('have.css', 'border', '4px solid rgb(0, 50, 255)')
					cy.get('[class*=circle_index]').contains('1')
					cy.get('[class*=circle_head]').should('be.empty')
					cy.get('[class*=circle_tail]').should('be.empty')
				});
			if (index === 2)
				cy
					.wrap(item).within(() => {
					cy.get('[class*=circle_circle]').should('have.css', 'border', '4px solid rgb(0, 50, 255)')
					cy.get('[class*=circle_index]').contains('2')
					cy.get('[class*=circle_head]').should('be.empty')
					cy.get('[class*=circle_tail]').contains('tail');
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
		cy.get('[class^=circle_content]')
			.each((item, index) => {
				if (index === 0)
					cy
						.wrap(item).within(() => {
						cy.get('[class*=circle_circle]').contains('1')
						cy.get('[class*=circle_index]').contains(`${index}`)
						cy.get('[class*=circle_head]').contains('head')
						cy.get('[class*=circle_tail]').should('be.empty')
					});
				if (index === 1)
					cy
						.wrap(item).within(() => {
						cy.get('[class*=circle_circle]').contains('2')
						cy.get('[class*=circle_index]').contains(`${index}`)
						cy.get('[class*=circle_head]').should('be.empty')
						cy.get('[class*=circle_tail]').should('be.empty')
					});
				if (index === 2)
					cy
						.wrap(item).within(() => {
						cy.get('[class*=circle_circle]').contains('3')
						cy.get('[class*=circle_index]').contains(`${index}`)
						cy.get('[class*=circle_head]').should('be.empty')
						cy.get('[class*=circle_tail]').contains('tail')
					});
			});

		// second step - deleting elements from queue
		// delete first element
		cy.get('@delButton').click()

		cy.get('[class^=button_loader]').should('be.exist');

		cy.get('@addButton').should('be.disabled');
		cy.get('@clearButton').should('be.disabled');

		cy.get('input').should('be.disabled');

		// check circles array through deleting first element from head
		cy.get('[class^=circle_content]')
			.each((item, index) => {
				if (index === 0)
					cy.wrap(item).within(() => {
						cy.get('[class^=circle_circle]').should('have.css', 'border', '4px solid rgb(210, 82, 225)')
					})
			})

		cy.tick(500);

		// check circles array after first element was deleted from the head
		cy.get('[class^=circle_content]')
			.each((item, index) => {
				if (index === 0)
					cy.wrap(item).within(() => {
						cy.get('[class^=circle_circle]')
							.should('have.css', 'border', '4px solid rgb(0, 50, 255)')
							.should('have.value', '')
						cy.get('[class*=circle_index]').contains(`${index}`)
						cy.get('[class*=circle_head]').should('be.empty')
						cy.get('[class*=circle_tail]').should('be.empty')
					})
				if (index === 1)
					cy.wrap(item).within(() => {
						cy.get('[class^=circle_circle]').contains('2')
						cy.get('[class*=circle_index]').contains(`${index}`)
						cy.get('[class*=circle_head]').contains('head')
						cy.get('[class*=circle_tail]').should('be.empty')
					})
				if (index === 2)
					cy.wrap(item).within(() => {
						cy.get('[class^=circle_circle]').contains('3')
						cy.get('[class*=circle_index]').contains(`${index}`)
						cy.get('[class*=circle_head]').should('be.empty')
						cy.get('[class*=circle_tail]').contains('tail');
					})
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
		cy.get('[class^=circle_content]')
			.each((item, index) => {
				if (index === 1)
					cy.wrap(item).within(() => {
						cy.get('[class^=circle_circle]')
							.should('have.css', 'border', '4px solid rgb(210, 82, 225)')
					})
			})

		cy.tick(500);

		// check circles array after deleting second element from the head
		cy.get('[class^=circle_content]')
			.each((item, index) => {
				if (index === 0)
					cy.wrap(item).within(() => {
						cy.get('[class^=circle_circle]').should('have.value', '')
						cy.get('[class*=circle_index]').contains(`${index}`)
						cy.get('[class*=circle_head]').should('be.empty')
						cy.get('[class*=circle_tail]').should('be.empty')
					})
				if (index === 1)
					cy.wrap(item).within(() => {
						cy.get('[class^=circle_circle]')
							.should('have.value', '')
							.should('have.css', 'border', '4px solid rgb(0, 50, 255)')
						cy.get('[class*=circle_index]').contains(`${index}`)
						cy.get('[class*=circle_head]').should('be.empty')
						cy.get('[class*=circle_tail]').should('be.empty')
					})
				if (index === 2)
					cy.wrap(item).within(() => {
						cy.get('[class^=circle_circle]').contains('3')
						cy.get('[class*=circle_index]').contains(`${index}`)
						cy.get('[class*=circle_head]').contains('head')
						cy.get('[class*=circle_tail]').contains('tail');
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
		cy.get('[class^=circle_content]')
			.each((item, index) => {
				if (index === 2)
					cy.wrap(item).within(() => {
						cy.get('[class^=circle_circle]').should('have.css', 'border', '4px solid rgb(210, 82, 225)')
					})
			})

		cy.tick(500);

		// check circles array after deleting the last element
		cy.get('[class^=circle_content]')
			.children().should('be.empty')

		cy.get('[class*=circle_tail]').should('be.empty');
		cy.get('[class*=circle_head]').should('be.empty');

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
		cy.get('[class^=circle_content]')
			.children().should('be.empty')

		cy.get('[class*=circle_tail]').should('be.empty');
		cy.get('[class*=circle_head]').should('be.empty');

		cy.get('[class^=button_loader]').should('not.exist');

		cy.get('input').should('be.enabled');
	});
})

export {}