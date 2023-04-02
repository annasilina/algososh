/// <reference types="cypress" />

import {CHANGING_COLOR, DEFAULT_COLOR, MODIFIED_COLOR} from "../../src/constants/colors";
import {
	BUTTON_LOADER,
	CIRCLE_CIRCLE,
	CIRCLE_CONTENT,
	CIRCLE_DEFAULT,
	CIRCLE_HEAD,
	CIRCLE_INDEX,
	CIRCLE_LETTER,
	CIRCLE_SMALL,
	CIRCLE_TAIL,
	INPUT
} from "../../src/constants/selectors";

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
	});

	it('add element button should be switch disabled state correctly depends on element input value', () => {
		cy.get(INPUT).each((item) => {
			cy.wrap(item).should('have.value', '');
		})
		cy.get('@addHeadBtn').should('be.disabled');
		cy.get('@addTailBtn').should('be.disabled');
		cy.get('@addIndBtn').should('be.disabled');
		cy.get('@delIndBtn').should('be.disabled');

		cy.get(INPUT).each((item) => {
			cy.wrap(item).type('1').should('have.value', '1');
		})
		cy.get('@addHeadBtn').should('be.enabled');
		cy.get('@addTailBtn').should('be.enabled');
		cy.get('@addIndBtn').should('be.enabled');
		cy.get('@delIndBtn').should('be.enabled');
	});

	it('default list should be rendered correctly', () => {
		cy
			.get(CIRCLE_CONTENT).each((item, index) => {
			if (index === 0)
				cy.wrap(item).within(() => {
					cy.get(CIRCLE_CIRCLE)
						.should('have.css', 'border', DEFAULT_COLOR)
						.contains('0');
					cy.get(CIRCLE_INDEX).contains(`${index}`)
					cy.get(CIRCLE_HEAD).contains('head')
					cy.get(CIRCLE_TAIL).should('be.empty')
				});

			if (index === 1)
				cy.wrap(item).within(() => {
					cy.get(CIRCLE_CIRCLE)
						.should('have.css', 'border', DEFAULT_COLOR)
						.contains('34');
					cy.get(CIRCLE_INDEX).contains(`${index}`)
					cy.get(CIRCLE_HEAD).should('be.empty')
					cy.get(CIRCLE_TAIL).should('be.empty')
				});

			if (index === 2)
				cy.wrap(item).within(() => {
					cy.get(CIRCLE_CIRCLE)
						.should('have.css', 'border', DEFAULT_COLOR)
						.contains('8');
					cy.get(CIRCLE_INDEX).contains(`${index}`)
					cy.get(CIRCLE_HEAD).should('be.empty')
					cy.get(CIRCLE_TAIL).should('be.empty')
				});

			if (index === 3)
				cy.wrap(item).within(() => {
					cy.get(CIRCLE_CIRCLE)
						.should('have.css', 'border', DEFAULT_COLOR)
						.contains('1');
					cy.get(CIRCLE_INDEX).contains(`${index}`)
					cy.get(CIRCLE_HEAD).should('be.empty')
					cy.get(CIRCLE_TAIL).contains('tail')
				});
		})
	})

	it('add element to head should work correctly', () => {
		cy.get('@elemInput').type('new').should('have.value', 'new');

		cy.get('@addHeadBtn').click();
		cy.get(BUTTON_LOADER).should('be.exist');

		cy.get(CIRCLE_CONTENT).each((item, index) => {
			cy.wrap(item).within(() => {
				if (index === 0) {
					cy.get(CIRCLE_SMALL)
						.should('have.css', 'border', CHANGING_COLOR)
						.contains('new')
				}
			});
		});

		cy.tick(500);

		cy.get(CIRCLE_CONTENT).each((item, index) => {
			cy.wrap(item).within(() => {
				if (index === 0) {
					cy.get(CIRCLE_CIRCLE)
						.should('have.css', 'border', MODIFIED_COLOR)
						.contains('new');
					cy.get(CIRCLE_INDEX).contains(`${index}`)
					cy.get(CIRCLE_HEAD).contains('head')
					cy.get(CIRCLE_TAIL).should('be.empty')
				}
			});
		});

		cy.tick(500);

		cy.get(CIRCLE_CONTENT)
			.should('have.length', 5)
			.each((item, index) => {
				cy.wrap(item).within(() => {
					if (index === 0) {
						cy.get(CIRCLE_CIRCLE)
							.should('have.css', 'border', DEFAULT_COLOR)
							.contains('new');
						cy.get(CIRCLE_INDEX).contains(`${index}`)
						cy.get(CIRCLE_HEAD).contains('head')
						cy.get(CIRCLE_TAIL).should('be.empty')
					}
				});
			});
	});

	it('add element to tail should work correctly', () => {
		cy.get('@elemInput').type('new').should('have.value', 'new');

		cy.get('@addTailBtn').click();
		cy.get(BUTTON_LOADER).should('be.exist');

		cy.get(CIRCLE_CONTENT)
			.last().within(() => {
			cy.get(CIRCLE_SMALL)
				.should('have.css', 'border', CHANGING_COLOR)
				.contains('new')
		});

		cy.tick(500);

		cy.get(CIRCLE_CONTENT)
			.last().within(() => {
			cy.get(CIRCLE_CIRCLE)
				.should('have.css', 'border', MODIFIED_COLOR)
				.contains('new');
			cy.get(CIRCLE_INDEX).contains('4');
			cy.get(CIRCLE_HEAD).should('be.empty');
			cy.get(CIRCLE_TAIL).contains('tail');
		});

		cy.tick(500);

		cy.get(CIRCLE_CONTENT)
			.should('have.length', 5)
			.last().within(() => {
			cy.get(CIRCLE_CIRCLE)
				.should('have.css', 'border', DEFAULT_COLOR)
				.contains('new');
			cy.get(CIRCLE_INDEX).contains('4');
			cy.get(CIRCLE_HEAD).should('be.empty');
			cy.get(CIRCLE_TAIL).contains('tail');
		});
	});

	it('add element by index should work correctly', () => {
		cy.get('@elemInput').type('new').should('have.value', 'new');
		cy.get('@indInput').type('1').should('have.value', '1');

		cy.get('@addIndBtn').click();
		cy.get(BUTTON_LOADER).should('be.exist');

		cy.get(CIRCLE_CONTENT).each((item, index) => {
			cy.wrap(item).within(() => {
				if (index === 0) {
					cy.get(CIRCLE_SMALL)
						.should('have.css', 'border', CHANGING_COLOR)
						.contains('new')
				}
			});
		})

		cy.tick(1000);

		cy.get(CIRCLE_CONTENT).each((item, index) => {
			cy.wrap(item).within(() => {
				if (index === 1) {
					cy.get(CIRCLE_SMALL)
						.should('have.css', 'border', CHANGING_COLOR)
						.contains('new')
				}
			});
		});

		cy.tick(1000);

		cy.get(CIRCLE_CONTENT).each((item, index) => {
			cy.wrap(item).within(() => {
				if (index === 1) {
					cy.get(CIRCLE_CIRCLE)
						.should('have.css', 'border', MODIFIED_COLOR)
						.contains('new');
					cy.get(CIRCLE_INDEX).contains(`${index}`);
					cy.get(CIRCLE_HEAD).should('be.empty');
					cy.get(CIRCLE_TAIL).should('be.empty');
				}
			});
		});

		cy.tick(1000);

		cy.get(CIRCLE_CONTENT)
			.should('have.length', 5)
			.each((item, index) => {
				cy.wrap(item).within(() => {
					if (index === 1) {
						cy.get(CIRCLE_CIRCLE)
							.should('have.css', 'border', DEFAULT_COLOR)
							.contains('new');
						cy.get(CIRCLE_INDEX).contains(`${index}`);
						cy.get(CIRCLE_HEAD).should('be.empty');
						cy.get(CIRCLE_TAIL).should('be.empty');
					}
				});
			});
	})

	it('delete element from head should work correctly', () => {
		cy.get('@delHeadBtn').click();
		cy.get(BUTTON_LOADER).should('be.exist');

		cy.get(CIRCLE_CONTENT).each((item, index) => {
			cy.wrap(item).within(() => {
				if (index === 0) {
					cy.get(CIRCLE_SMALL)
						.should('have.css', 'border', CHANGING_COLOR)
						.contains('0')
				}
			});
		});

		cy.tick(500);

		cy.get(CIRCLE_CONTENT)
			.should('have.length', 3)
			.each((item, index) => {
				cy.wrap(item).within(() => {
					if (index === 0) {
						cy.get(CIRCLE_CIRCLE)
							.should('have.css', 'border', DEFAULT_COLOR)
							.contains('34')
						cy.get(CIRCLE_INDEX).contains(`${index}`);
						cy.get(CIRCLE_HEAD).contains('head');
						cy.get(CIRCLE_TAIL).should('be.empty');
					}
				});
			});
	});

	it('delete element from tail should work correctly', () => {
		cy.get('@delTailBtn').click();
		cy.get(BUTTON_LOADER).should('be.exist');

		cy.get(CIRCLE_CONTENT)
			.each((item, index) => {
				cy.wrap(item).within(() => {
					if (index === 3) {
						cy.get(CIRCLE_DEFAULT).should('not.have.text')
						cy.get(CIRCLE_SMALL)
							.should('have.css', 'border', CHANGING_COLOR)
							.contains('1')
					}
				})
			})

		cy.tick(500);

		cy.get(CIRCLE_CONTENT)
			.should('have.length', 3)
			.each((item, index) => {
				cy.wrap(item).within(() => {
					if (index === 2) {
						cy.get(CIRCLE_CIRCLE)
							.should('have.css', 'border', DEFAULT_COLOR)
							.contains('8')
						cy.get(CIRCLE_INDEX).contains(`${index}`);
						cy.get(CIRCLE_HEAD).should('be.empty');
						cy.get(CIRCLE_TAIL).contains('tail');
					}
				});
			});
	});

	it('delete element by index should work correctly', () => {
		cy.get('@indInput').type('1').should('have.value', '1');

		cy.get('@delIndBtn').click();
		cy.get(BUTTON_LOADER).should('be.exist');

		cy.get(CIRCLE_CONTENT).each((item, index) => {
			cy.wrap(item).within(() => {
				if (index === 0) {
					cy.tick(500);
					cy.get(CIRCLE_CIRCLE)
						.should('have.css', 'border', CHANGING_COLOR)
				}
			});
		})

		cy.get(CIRCLE_CONTENT).each((item, index) => {
			cy.wrap(item).within(() => {
				if (index === 1) {
					cy.tick(500);
					cy.get(CIRCLE_CIRCLE)
						.should('have.css', 'border', CHANGING_COLOR)
				}
			});
		})

		cy.tick(500);

		cy.get(CIRCLE_CONTENT).each((item, index) => {
			cy.wrap(item).within(() => {
				if (index === 1) {
					cy.tick(500);
					cy.get(CIRCLE_LETTER)
						.should('be.empty')
					cy.get(CIRCLE_SMALL)
						.should('have.css', 'border', CHANGING_COLOR)
				}
			});
		})

		cy.tick(500);

		cy.get(CIRCLE_CONTENT)
			.should('have.length', 3)
			.each((item, index) => {
				cy.wrap(item).within(() => {
					if (index === 1) {
						cy.get(CIRCLE_LETTER)
							.contains('8');
					}
					if (index === 2) cy.get(CIRCLE_TAIL).contains('tail');
				});
			});
	})
})

export {}